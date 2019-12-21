const fs      = require('fs')
const moment  = require('moment')
const api     = require('../public/js/api.js')
const db      = require('./db')

const express = require('express')
const app     = express()

const TRACE = true

app.use(express.json())
app.use('/', express.static('./public'))

app.get(api.query.catalog, (req, res) => {
    fs.readFile(`${db.path}/${db.fname.catalog}`, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0}))
        } else {
            res.send(data)
        }
    })
})

const fnameBasket = `${db.path}/${db.fname.basket}`

app.get(api.query.basket.get, (req, res) => {
    fs.readFile(fnameBasket, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0}))
        } else {
            res.send(data)
        }
    })
})


app.post(api.query.basket.add, (req, res) => {
    fs.readFile(fnameBasket, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0}))
        } else {
          const recent = JSON.parse(data)
          recent.contents.push(req.body)
          recent.countGoods++
          recent.amount += req.body.price
          
          fs.writeFile(fnameBasket, JSON.stringify(recent, null, 2), err => {
            if (err) {
                res.sendStatus (404, JSON.stringify({result: 0}))
            } else {
              const entry = db.logEntry(db.logAction.add, req.body.product_name)
              if(TRACE)
                console.log(`<--- ${entry.time} POST ${entry.action} ${entry.product_name}`)
              db.logSave(entry)
              res.send({result: 1})
            }
          })
          
        }
    })
})

app.delete(api.query.basket.remove, (req, res) => {
    fs.readFile(fnameBasket, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        } else {
          const recent = JSON.parse(data)
          recent.contents.splice(recent.contents.findIndex(g => g.id_product === req.body.id_product), 1)
          recent.countGoods--
          recent.amount -= req.body.price

          fs.writeFile(fnameBasket, JSON.stringify(recent, null, 2), err => {
            if (err) {
              res.sendStatus (404, JSON.stringify({result: 0}))
            } else {
              const entry = db.logEntry(db.logAction.remove, req.body.product_name)
              if(TRACE)
                console.log(`<--- ${entry.time} DELETE ${entry.action} ${entry.product_name}`)
              db.logSave(entry)
              res.send({result: 1})
            }
          })
          
        }
    })
})

app.put(api.query.basket.add, (req, res) => {
    fs.readFile(fnameBasket, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0}))
        } else {
          const recent = JSON.parse(data)
          let founded = recent.contents.find(g => g.id_product === req.body.id)
          founded.quantity += req.body.quantity
          recent.countGoods += req.body.quantity
          recent.amount += req.body.quantity * founded.price

          fs.writeFile(fnameBasket, JSON.stringify(recent, null, 2), err => {
            if (err) {
                res.sendStatus (404, JSON.stringify({result: 0}))
            } else {
              const entry = db.logEntry(db.logAction.add, founded.product_name)
              if(TRACE)
                console.log(`<--- ${entry.time} PUT ${entry.action} ${entry.product_name}`)
              db.logSave(entry)
              res.send({result: 1})
            }
          })
          
        }
    })
})

app.put(api.query.basket.remove, (req, res) => {
    fs.readFile(fnameBasket, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0}))
        } else {
          const recent = JSON.parse(data)
          let founded = recent.contents.find(g => g.id_product === req.body.id)
          founded.quantity -= req.body.quantity
          recent.countGoods -= req.body.quantity
          recent.amount -= req.body.quantity * founded.price
          fs.writeFile(fnameBasket, JSON.stringify(recent, null, 2), err => {
            if (err) {
                res.sendStatus (404, JSON.stringify({result: 0}))
            } else {
              const entry = db.logEntry(db.logAction.remove, founded.product_name)
              if(TRACE)
                console.log(`<--- ${entry.time} PUT ${entry.action} ${entry.product_name}`)
              db.logSave(entry)
              res.send({result: 1})
            }
          })
          
        } 
    })
})

app.listen(api.server.port, () => console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] SERVE listening on ${api.server.port} port...`))
