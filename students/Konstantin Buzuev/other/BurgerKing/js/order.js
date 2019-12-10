document.addEventListener("DOMContentLoaded", function(){
    SetTitles();
    btnOrder.addEventListener ('click', function(){
        orderBurger ();
    });
});
let btnOrder = document.querySelector ('#btnOrder');
let processingForm = document.querySelector ('#processingForm');
let fieldsetFilling = document.querySelector('#filling').getElementsByTagName("fieldset")[0];    

function orderBurger () {
    processingForm.innerHTML = "Обрабатываю Ваш заказ!";
    $('*').css('cursor','wait')
    let newBurger = new Burger ('size', 'filling', 'topping');
    // Delay imitation
    setTimeout(function(){
        $('*').css('cursor','auto');} , 500);
    if (newBurger.hasFilling){
        processingForm.innerHTML = `Цена вашего бургера: ${newBurger.Cost} руб. <br>\
                                    Калорийность: ${newBurger.Energy} ккал.`;
        if (fieldsetFilling.classList.contains("b-fieldset_themeWarning"))
            fieldsetFilling.classList.remove("b-fieldset_themeWarning");
        if (!fieldsetFilling.classList.contains("b-fieldset_themeLightBlue"))
            fieldsetFilling.classList.add("b-fieldset_themeLightBlue");
    }
    else{
        processingForm.innerHTML = "Не выбрана начинка для бургера!";
        if (fieldsetFilling.classList.contains("b-fieldset_themeLightBlue"))
            fieldsetFilling.classList.remove("b-fieldset_themeLightBlue");
        if (!fieldsetFilling.classList.contains("b-fieldset_themeWarning"))
            fieldsetFilling.classList.add("b-fieldset_themeWarning");
    }
}

class Burger{
    constructor(size, filling, topping){
        const Required = 1;
        this.Cost = 0;
        this.Energy = 0;
        this.hasFilling = false; // To complete Burger we need a filling
        //Следующие три поля не обязательны для ДЗ Введены для полноты класса и возможности дальнейшего масштабирования
       this.Size = this._single(size)
       this.Filling = this._combo(filling, Required)
       this.Topping = this._combo(topping, !Required)
    }
    _single(attrName){
        let obj = document.querySelector(`input[name=${attrName}]:checked`)
        this.Cost += +obj.dataset["cost"]
        this.Energy += +obj.dataset["energy"]
    }
    _combo(attrName, Required){
        let objArr = [...document.querySelectorAll(`input[name=${attrName}]:checked`)]
        objArr.forEach(obj => {
            this.Cost += +obj.dataset["cost"]
            this.Energy += +obj.dataset["energy"]
            })
        if (Required) this.hasFilling = (objArr.length !=0) ? true : false;
        
    }
}

function SetTitles(){
    let labelArr = [...document.getElementsByTagName("label")]
    labelArr.forEach(el => {
        let obj = el.getElementsByTagName("input")[0]
        let cost = +obj.dataset["cost"]
        let energy = +obj.dataset["energy"]
        let newTitle = `Цена: ${cost} руб Калорийность: ${energy} ккал`
        el.setAttribute("title", newTitle)
    })
}

