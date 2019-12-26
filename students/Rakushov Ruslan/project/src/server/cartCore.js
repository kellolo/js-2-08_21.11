// import fs from "fs";
// import catalogCore from "./catalogCore";
// import logger from "./logger.js";
const catalogCore = require("./catalogCore");
const logger = require("./logger");

const cartCore = {
  add(data, id) {
    console.log("in cartCore.js add");
    debugger;
    const cart = JSON.parse(data);
    let find = cart.contents.find(item => item.id === id);
    if (find) {
      find.quantity++;
    } else {
      let newItem = catalogCore.getItemById(id);
      cart.contents.push({
        id: newItem.id,
        title: newItem.title,
        price: newItem.price,
        quantity: 1,
      });
    }
    recountCart(cart);
    logger("add", id);
    return JSON.stringify(cart, null, 2);
  },
  del(data, id) {
    const cart = JSON.parse(data);
    const delItemId = id;
    let find = cart.contents.find(item => item.id === delItemId);
    if (--find.quantity < 1) {
      cart.contents.splice(cart.contents.indexOf(find), 1);
    }
    recountCart(cart);
    logger("del", id);
    return JSON.stringify(cart, null, 2);;
  },
};

// export default cartCore;
module.exports = cartCore;

function recountCart(cart) {
  cart.amount = 0;
  cart.countGoods = 0;
  cart.contents.forEach(item => {
    cart.countGoods += item.quantity;
    cart.amount += item.quantity * item.price;
  });
}
