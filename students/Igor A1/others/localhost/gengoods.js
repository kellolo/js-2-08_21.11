//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

//создание товара
function createProduct (i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image,
    }
};

function createProduct4JSON (i) {
    return {
        id_product: ids[i],
        product_name: items[i],
        price: prices[i],
        img: image
    }
};

//создание массива объектов - имитация загрузки данных с сервера
function fetchData () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        //arr.push (createProduct (i));
        arr.push (createProduct4JSON (i));
    }
    return arr
};

const log = console.log,
  fs = require('fs'),
  jsonFilename = 'catalogData.json',
  goods = fetchData(),
  jsonGoods = JSON.stringify(goods, null, 2);

log(jsonGoods);

const fsSave = (filename, content) => {
  let fhandle = fs.openSync(`${__dirname}/${filename}`, 'w')
  fs.writeSync(fhandle, content);
  fs.closeSync(fhandle);
};

fsSave('catalogData.json', jsonGoods);

let basket = {
  amount: 0,
  countGoods: 0,
  contents: []
};

const add2basket = (good, quantity) => {
  basket.amount += quantity * good.price;
  basket.countGoods++;
  basket.contents.push({
    id_product:   good.id_product,
    product_name: good.product_name,
    price:        good.price,
    quantity:     quantity
  });
};

add2basket(goods[0], 1);
add2basket(goods[3], 2);
add2basket(goods[5], 1);

jsonBasket = JSON.stringify(basket, null, 2);
log(jsonBasket);

fsSave('getBasket.json', jsonBasket);

let responseOK = {result: 1};
jsonOK = JSON.stringify(responseOK, null, 2);
log(jsonOK);

fsSave('addToBasket.json', jsonOK);
fsSave('deleteFromBasket.json', jsonOK);


log('<--- done.');