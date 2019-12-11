/*******************************************************************************
Некая сеть фастфуда предлагает несколько видов гамбургеров:
  a. Маленький (50 рублей, 20 калорий).
  b. Большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
  a. С сыром (+10 рублей, +20 калорий).
  b. С салатом (+20 рублей, +5 калорий).
  c. С картофелем (+15 рублей, +10 калорий).
Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий)
и полить майонезом (+20 рублей, +5 калорий).

Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
Можно использовать примерную архитектуру класса со следующей страницы, 
но можно использовать и свою.
*******************************************************************************/
const log = console.log;

class Menu {
  constructor() {
    this.size = [
      {title: 'маленький',    cost:  50, calories: 20},
      {title: 'большой',      cost: 100, calories: 40}
    ];

    this.stuffing = [
      {title: 'с сыром',      cost:  10, calories: 20},
      {title: 'с салатом',    cost:  20, calories:  5},
      {title: 'с картофелем', cost:  15, calories: 10}
    ];

    this.topping = [
      {title: 'с приправой',  cost:  15, calories:  0},
      {title: 'с майонезом',  cost:  20, calories:  5}
    ];
    
    this.sizeNode = document.getElementById('size');
    this.stuffingNode = document.getElementById('stuffing');
    this.toppingNode = document.getElementById('topping');
    
    this.choice = {size: 0, stuffing: 0, topping: []};
    
    // topping items will be selected by id=this.topping[index].title
    // after rendering !!!
  };
  
  _extendTitle(component) {
    // can't using a <span> in the <select> <opion> :( 
    component.forEach(c => 
      c.title += ` <span class="extend-title">:: ${c.cost} руб. / ${c.calories} ккал</span>`);
  };
      
  render() {
    this._extendTitle(this.size);
    this._extendTitle(this.stuffing);
    // extendTitle(this.topping); !!! topping.title using as id
    
    let s = '';
    this.size.forEach((el, i) => {
      s += `<option value="${i}" data-cost="${el.cost}" data-calories="${el.calories}">${el.title}</option>`;
    });
    this.sizeNode.innerHTML = s;
    this.sizeNode.childNodes[this.choice.size].selected = true;

    s = '';
    this.stuffing.forEach((el, i) => {
      s += `<option value="${i}" data-cost="${el.cost}" data-calories="${el.calories}">${el.title}</option>`;
    });
    this.stuffingNode.innerHTML = s;
    this.stuffingNode.childNodes[this.choice.stuffing].selected = true;
    
    s = '<div class="form-check">';
    this.topping.forEach((el, i) => {
      s += `<div><input class="form-check-input" type="checkbox" id="${el.title}" data-cost="${el.cost}" data-calories="${el.calories}">`;
      s += `<label class="form-check-label" for="${el.title}">`;
      s += `${el.title} <span class="extend-title">:: ${el.cost} руб. / ${el.calories} ккал</span></label></div>`;
    });
    s += '</div>';
    this.toppingNode.innerHTML = s;
    
    // fill topping nodes array here
    this.topping.forEach(t => {
      let node = document.getElementById(t.title);
      this.choice.topping.push(node);
    });
  };
};

class Hamburger {
  constructor () {
    this.menu = new Menu();
    this.menu.render();
    
    this.costNode = document.getElementById('total-cost');
    this.calNode = document.getElementById('total-cal');
    
    this._recalc();
  };

  _recalc() {
    //this.cost = this.menu.size[this.menu.choice.size].cost + 
    //  this.menu.stuffing[this.menu.choice.stuffing].cost;
    //  
    //this.calories = this.menu.size[this.menu.choice.size].calories + 
    //  this.menu.stuffing[this.menu.choice.stuffing].calories;
    //
    //this.menu.choice.topping.forEach((node, index) => {
    //  if(node.checked) {
    //    this.cost += this.menu.topping[index].cost;
    //    this.calories += this.menu.topping[index].calories;
    //  };
    //});
    
    this.cost = 0;
    this.calories = 0;
    
    [...document.querySelectorAll(':checked')].forEach(item => {
      this.cost += +item.dataset.cost;
      this.calories += +item.dataset.calories;
    });
      
  };

  render() {
    this.costNode.innerHTML = this.cost;
    this.calNode.innerHTML = this.calories;
  };

  refresh() {
    //let child = this.menu.sizeNode.childNodes;
    //// childNodes is a collection, not array!
    //for(let n = 0; n < child.length; n++)
    //  if(child[n].selected) {
    //    this.menu.choice.size = n;
    //    break;
    //  };
    //
    //child = this.menu.stuffingNode.childNodes;
    //for(let n = 0; n < child.length; n++)
    //  if(child[n].selected) {
    //    this.menu.choice.stuffing = n;
    //    break;
    //  };
    
    this._recalc();
    this.render();
  };
};

////////////////////////////////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', () => {
  const hamburger = new Hamburger();
  hamburger.render();
  hamburger.refresh();
  document.addEventListener('input', () => hamburger.refresh());
});
////////////////////////////////////////////////////////////////////////////////