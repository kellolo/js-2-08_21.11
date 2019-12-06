if (document.readyState === "complete") {

    let btn = document.querySelector('.order__btn');
    let orders = [];

    btn.addEventListener('click', addOrder);

    function addOrder() {
        let newOrder = new Order('small', 'big', 'cheese', 'salad', 'potatoes', 'seasoning', 'mayonnaise');
        orders.push(newOrder);
    }

    class Order {
        constructor(small, big, cheese, salad, potatoes, seasoning, mayonnaise) {
            this.small = this._getText(small);
            this.big = this._getText(big);
            this.cheese = this._getText(cheese);
            this.salad = this._getText(salad);
            this.potatoes = this._getText(potatoes);
            this.seasoning = this._getText(seasoning);
            this.mayonnaise = this._getText(mayonnaise);
        }

        _getText(attrName) {
            let obj = document.querySelector(`input[name=${attrName}]:checked`);
            return obj.value;
        }

    }
}