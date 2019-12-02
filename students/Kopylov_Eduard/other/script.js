
document.addEventListener("DOMContentLoaded",function()
{
    HumburgerCollection = [];

    
    //let oneForm = document.querySelector('#oneForm');
    let btn = document.querySelector('#clickbutton');
    btn.addEventListener("click",AddHumburger);
    btn.addEventListener("click",InResult);
    //btn.addEventListener("click",InResult2);

    function InResult()
    {
        let obj = document.querySelector('.result');
        for(let i=0; i <HumburgerCollection.length; i++)
        {
            obj.innerHTML = `Всего гамбургеров: ${HumburgerCollection.length} <br> Размер: ${HumburgerCollection[i].size}  <br>  Цена: ${HumburgerCollection[i].price} рублей <br>  Калории: ${HumburgerCollection[i].callories}`;
        }
        InResult2();
       
    }

    function InResult2()
    {
        let obj = document.querySelector('.result-2');
        let countPrice=0;
        let countCal=0;
        for(let i=0; i <HumburgerCollection.length; i++)
        {
            obj.innerHTML = `Итоговая Цена: ${countPrice += HumburgerCollection[i].price} рублей <br>  Калорий в сумме: ${ countCal += HumburgerCollection[i].callories}`;
        }
        
       
    }


    function AddHumburger()
    {
        let newHb = new Humburger('Bg-type','Bg-filling','Bg-extra');
        HumburgerCollection.push(newHb);
    };
    
    class Humburger {
        constructor(size,filling, extra) { 
    
            this.size = this._getSize(size);
            this.price = this._calculatePrice(size,filling, extra);
            this.callories = this._calculateCalories(size,filling, extra);
         }
    
       
        _getSize(size) 
            { 
                 let obj = document.querySelector(`input[name=${size}]:checked`);
                 return obj.dataset['size'];
                 
            }       
       
        _calculatePrice(size,filling,extra) {
                let obj = document.querySelector(`input[name=${size}]:checked`);
                let obj1 = document.querySelector(`input[name=${filling}]:checked`);
                let obj2 = document.querySelector(`input[name=${extra}]:checked`);
                 return +obj.dataset['price'] + +obj1.dataset['price'] + +obj2.dataset['price'];
         }     

        _calculateCalories(size,filling, extra) {
            let obj = document.querySelector(`input[name=${size}]:checked`);
            let obj1 = document.querySelector(`input[name=${filling}]:checked`);
            let obj2 = document.querySelector(`input[name=${extra}]:checked`);
             return +obj.dataset['callories'] + +obj1.dataset['callories'] + +obj2.dataset['callories'];
         }  
      }
    
      
     
    

});


