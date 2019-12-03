// *Некая сеть фастфуда предлагает несколько видов гамбургеров:
// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий).
// ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий).
// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий).
// ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
// Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

let btn = document.querySelector('#okBtn');
let div = document.createElement('div');

btn.addEventListener ('click', () => {
    let burger = new BurgerCount(
        'size',
        'composition',
        'extra',
        ['price', 'cal']
    );
    console.log(burger);
    div.innerText = `Цена бургера: ${burger.price} уе, 
                     Калорийность бургера: ${burger.cal} уе`;
    document.body.appendChild(div);
});

class BurgerCount {
    constructor(size, composition, extra, arr){
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
        let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)];
        let arr = [];
        objArr.forEach (el => {
            arr.push (el.dataset[dataName])
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