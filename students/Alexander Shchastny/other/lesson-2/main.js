let btn = document.querySelector('#buyBtn');
let div = document.createElement('div');

btn.addEventListener('click', () => {
    let burger = new BurgerCount(
        'size',
        'composition',
        'extra',
        ['price', 'cal']
    );
    console.log(burger);
    div.innerText = `Цена бургера: ${burger.price} рублей, 
                     Калорийность бургера: ${burger.cal} рублей`;
    document.body.appendChild(div);
});
class BurgerCount {
    constructor(size, composition, extra, arr) {
        this.price = this._getArrSum(
            this._getArray(extra, arr[0]).concat(
                this._check(size, arr[0]),
                this._check(composition, arr[0])
            )
        );
        this.cal = this._getArrSum(
            this._getArray(extra, arr[1]).concat(
                this._check(size, arr[1]),
                this._check(composition, arr[1])
            )
        );
    }
    _check(attrName, dataName) {
        let obj = document.querySelector(`input[name=${attrName}]:checked`);
        return obj.dataset[dataName];
    }
    _getArray(attrName, dataName) {
        let objArr = [...document.querySelectorAll(`input[name=${attrName}]:checked`)];
        let arr = [];
        objArr.forEach(el => {
            arr.push(el.dataset[dataName])
        });
        return arr;
    }
    _getArrSum(arr) {
        let sum = 0;
        arr.forEach(el => {
            sum += +el;
        });
        return sum;
    }
}