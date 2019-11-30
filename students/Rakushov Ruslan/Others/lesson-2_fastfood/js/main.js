const pricesValues = {
  "Cheese": 10,
  "Salad": 20,
  "Potato": 15,
  "Flavouring": 15,
  "Mayo": 20,
}
const caloriesValues = {
  "Cheese": 20,
  "Salad": 5,
  "Potato": 10,
  "Flavouring": 0,
  "Mayo": 5,
}
function _getOptPrice(key) {
  for (let opt of Object.keys(pricesValues)) {
    if (key == opt) {
      return pricesValues[opt];
    }
  }
}
function _getOptCalories(key) {
  for (let opt of Object.keys(caloriesValues)) {
    if (key == opt) {
      return caloriesValues[opt];
    }
  }
}
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

    this.options = {};
    let options = [...document.querySelectorAll('input[type="checkbox"]')];
    for (let opt of options) {
      this.options[`${opt.name}`] = opt.checked;
    }
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
    for (let key of Object.keys(this.options)) {
      if (this.options[key]) {
        price += _getOptPrice(key);
        calories += _getOptCalories(key);
      }
    }

    this.price = price;
    this.calories = calories;
    this.render();
  };
  render() {
    let str = `${this.price} руб.`;
    let str2 = `${this.calories} калорий`;
    document.querySelector("#price").innerHTML = str;
    document.querySelector("#calorie").innerHTML = str2;
  }
}

let burger = new Gamburger();
document.querySelector("#uForm").addEventListener("change", burger.recount);
