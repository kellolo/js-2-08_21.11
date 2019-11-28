class Gamburger {
  constructor() {
    this.price = 0;
    this.calories = 0;
    this._getFormValues();
    this.recount();
  }
  _getFormValues() {
    this.size = document.querySelector('input[name="Size"]:checked').value;
    this.cheese = document.querySelector('input[name="Cheese"]').checked;
    this.salad = document.querySelector('input[name="Salad"]').checked;
    this.potato = document.querySelector('input[name="Potato"]').checked;
    this.flavouring = document.querySelector('input[name="Flavouring"]').checked;
    this.mayo = document.querySelector('input[name="Mayo"]').checked;
  }
  recount = () => {
    this._getFormValues();
    let price = 0;
    let calories = 0;
    if (this.size == "Small") {
      price += 50;
      calories += 20;
    } else if (this.size == "Big") {
      price += 100;
      calories += 40;
    }
    if (this.cheese) {
      price += 10;
      calories += 20;
    }
    if (this.salad) {
      price += 20;
      calories += 5;
    }
    if (this.potato) {
      price += 15;
      calories += 10;
    }
    if (this.flavouring) {
      price += 15;
      calories += 0;
    }
    if (this.mayo) {
      price += 20;
      calories += 5;
    }
    this.price = price;
    this.calories = calories;
    this.render();
  }
  render() {
    let str = `${this.price} руб.`;
    let str2 = `${this.calories} калорий`;
    document.querySelector("#price").innerHTML = str;
    document.querySelector("#calorie").innerHTML = str2;
  }
}

let burger = new Gamburger();
document.querySelector('#uForm').addEventListener('change', burger.recount);
