let customerForm = document.querySelector('#customerForm');
let order;
function updateForm (size, filling, topping) {
    order = new Order ('size','filling', 'topping');
}
class Order {
    constructor (size,filling,topping) {
        this.size = this._comp(size);
        this.filling= this._getArray(filling);
        this.topping = this._getArray(topping);
        this.total_init();
    }
    _comp (attrName) {
        let obj = document.querySelector(`input[name=${attrName}]:checked`);
        let comp = new Comp(obj.value, +obj.dataset['price'], +obj.dataset['cal']);
        return comp;
    }
    _getArray (attrName) {
        let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)]
        let arr = []
        let comp;
        objArr.forEach (el => {
            comp = new Comp(el.value, +el.dataset['price'], +el.dataset['cal']);
            arr.push (comp);
        })
        return arr
    }

    total_init () {
        let price = 0;
        let cal = 0;
        let totalPrice = document.querySelector('.totalPrice');
        let totalCal = document.querySelector('.totalCal');
        price += this.size.getPrice();
        cal += this.size.getCal();
        this.filling.forEach (el => {
            price += el.getPrice();
            cal += el.getCal();
        });
        this.topping.forEach (el => {
            price += el.getPrice();
            cal += el.getCal();
        });
        totalPrice.innerHTML = `Стоимость заказа  ${price} рублей`;
        totalCal.innerHTML = `В заказанном блюде ${cal} калорий`;
    }
}
class Comp {
    constructor (name, price, cal) {
        this.name = name;
        this.price = price;
        this.cal = cal;
    }
    getName() {
        return this.name;
    }
    getPrice () {
        return this.price;
    }
    getCal () {
        return this.cal;
    }
}
updateForm('size','filling', 'topping');
































