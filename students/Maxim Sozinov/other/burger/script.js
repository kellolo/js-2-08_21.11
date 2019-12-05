let btn = document.querySelector('#makeBurger');
let burgers = [];

btn.addEventListener('click', addBurger);

function addBurger() {
    let newBurger = new Burger("burgerSize", "burgerFilling", "burgerRelish");
    burgers.push(newBurger);
    newBurger.show('calories');
    newBurger.show('cost');
    // console.log(newBurger);
}

class Burger {
    constructor(size, fill, adds) {
        this.size = this._getProp(size);
        this.filling = this._getProp(fill);
        this.adds = this._getArr(adds);
        this.calories = this._count("calories");
        this.cost = this._count("price");
    }
    _getProp(attrName) {
        return document.querySelector(`input[name=${attrName}]:checked`).value;
    }
    _getArr(attrName) {
        let objArr = [...document.querySelectorAll(`input[name=${attrName}]:checked`)];
        return objArr.map(el => el.value);
    }
    _count(dataName) {
        let objArr = [...document.querySelectorAll(`input:checked`)];
        return objArr.reduce((acc, obj) => acc += +obj.dataset[dataName], 0);
    }
    show(prop) {
        let obj = document.querySelector(`#${prop}`);
        obj.innerHTML = `${this[prop]}`;
    }
}