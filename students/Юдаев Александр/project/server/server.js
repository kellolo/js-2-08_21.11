const express = require ('express');
const fs = require ('fs');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));

app.get('/catalog', (req, res) => {
    fs.readFile('server/db/catalog.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            res.send(data);
        }
    });
});

app.get('/basket', (req, res) => {
    fs.readFile('server/db/basket.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            res.send(data);
        }
    });
});

app.listen(5000, () => {
    console.log('Server listening a port 5000');
});