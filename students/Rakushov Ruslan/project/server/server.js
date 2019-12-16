//TODO Add amount & countGoods in app.post("/addToBasket.json", ...)

console.log("Hello, I'm server.js");

const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/", express.static("public"));

app.get("/catalogData.json", (req, res) => {
  fs.readFile("server/responses/catalogData.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  });
});
app.get("/getBasket.json", (req, res) => {
  fs.readFile("server/responses/getBasket.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  });
});
app.post("/addToBasket.json", (req, res) => {
  fs.readFile("server/responses/getBasket.json", "utf-8", (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const newItem = req.body;
      let find = cart.contents.find(item => item.id === newItem.id);
      if (find) {
        find.quantity++;
        //TODO basketRecount(); запустить из basket.js (создать его)
        //или cart.amount = basket.recountAmount
        //    cart.countGoods = basket.recountCountGoods
      } else {
        //TODO см. todo наверху
        cart.contents.push({
          id: newItem.id,
          //!!!
        })
      }
      debugger;

      res.send('{"result": 1}');
    }
  });
});

//   "/getBasket.json", (req, res) => {
//   fs.readFile("server/responses/getBasket.json", "utf-8", (err, data) => {
//     if (err) {
//       res.sendStatus(404, JSON.stringify({ result: 0 }));
//     } else {
//       res.send(data);
//     }
//   });
// });

app.listen(3000, () => {
  console.log("Server listening at port 3000...");
});
