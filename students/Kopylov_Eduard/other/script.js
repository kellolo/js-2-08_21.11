
document.addEventListener("DOMContentLoaded",function()
{
    HumburgerCollection = [];

    
    
    let btn = document.querySelector('#clickbutton');
    btn.addEventListener("click",AddHumburger);
    
    
    function AddHumburger()
    {
        let newHb = new Humburger('Большой',10,20);
        HumburgerCollection.push(newHb);
    };
    
    class Humburger {
        constructor(size,price, callories) { 
    
            this.size = this._getSize(size);
          //  this.stuffing = stuffing;
            this.price = this._calculatePrice(price);
            this.callories = this._calculateCalories(callories);
         }
    
        _addTopping(topping) {  }  // Добавить добавку }
        _removeTopping(topping) {} // Убрать добавку }
        _getToppings(topping) { }  // Получить список добавок }
        _getSize(size) 
            { 
                 let obj = document.querySelector(`input[name= ${size}]:checked`);
                 return obj.dataset['size'];
                 
            }        // Узнать размер гамбургера }
        _getStuffing() {   }       // Узнать начинку гамбургера }
        _calculatePrice(price) {
            let obj = document.querySelector(`input[name= ${price}]:checked`);
                 return +obj.dataset['price'];
         }      // Узнать цену }
        _calculateCalories(callories) {
            let obj = document.querySelector(`input[name= ${callories}]:checked`);
                 return +obj.dataset['callories'];
         }   // Узнать калорийность }
      }
    
      
     
    

});


