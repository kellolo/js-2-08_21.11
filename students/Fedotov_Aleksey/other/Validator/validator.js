// let inputArr = [];
let scanBtn;
let nameReg = /^([a-zа-яё])+$/i;
let telReg = /^\+7\(\d{3}\)\d{3}\-\d{4}$/;
let emailReg = /^([a-zA-Z]+(.?|-?)[a-zA-Z]+)@mail\.ru$/;
let textReg = /(^'|\'[^(a-z)^ ]|\B'|'\B)/gm;
document.addEventListener('DOMContentLoaded', () => {
    scanBtn = document.getElementById('scan');
    scanBtn.addEventListener("click", (event,inputArr) => {
        inputArr = [];
        inputArr.push(document.getElementById('name'));
        inputArr.push(document.getElementById('tel'));
        inputArr.push(document.getElementById('email'));
        inputArr.push(document.getElementById('text'));
        toValid(inputArr);
    })
})
let valid;

function toValid (inputArr) {
    valid = new Validator(inputArr);
    console.log('click');
}

class Validator {
    constructor (arr) {
        this.err = 0;
        arr.forEach(element => {
            console.log(element);
            if (element.id === "text") {
                element.addEventListener("blur", (event) => {
                    this.valid(event.srcElement, eval(event.srcElement.id+'Reg'));
                })
            } else {
                element.addEventListener("input", (event) => {
                    console.log(event.srcElement);
                    console.log(this._valid);
                    this.valid(event.srcElement, eval(event.srcElement.id+'Reg'));
                })
            }
            if (element.value != "") {
                this.valid(element, eval(element.id+'Reg'));
            }
        });
    }
    valid(el, reg) {
        console.log(el.id);
        if(el.id === "text") {
            el.value = el.value.replace(reg,'"');
        }
        else {
            if (reg.test(el.value) && (el.id !== "text")){
                el.style.outline = "1px solid green";
            } else {
                this.err++;
                el.style.outline = "1px solid red";
            }
        }
    }
}