
let str = "Придумать шаблон, который заменяет 'одинарные кавычки' на двойные, aren't"
let regexp = /[']/g
document.querySelector(".task1").textContent = str
document.querySelector(".task1_2").textContent = str.replace(regexp,'"')

str = "Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.";
document.querySelector(".task2").textContent = str
regexp = /\B'|'\B/g;
document.querySelector(".task2_2").textContent = str.replace(regexp,'\"');

let phone;
function validateName(name) {
    var re =/^[a-zа-яё]+$/i
    return re.test(name)
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

function validatePhone(phone) {
    var re = /\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}/
    return re.test(phone);
}

function validateMe(el) {
    const name = document.getElementById("name")
    if(validateName(name.value)) {
        name.style = "border-color: green"
    }
    else {
        name.style = "border-color: red"
    }
    const email = document.getElementById("email")
    if(validateEmail(email.value)) {
        email.style = "border-color: green"
    }
    else {
        email.style = "border-color: red"
    }
    const phone = document.getElementById("phone")
    if(validatePhone(phone.value)) {
        phone.style = "border-color: green"
    }
    else {
        phone.style = "border-color: red"
    }

}
window.onload = () => validateMe()