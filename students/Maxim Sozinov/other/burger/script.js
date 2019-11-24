let btn = document.querySelector ('#makeBurger');
let users = [];

btn.addEventListener ('click', addBurger);

function addBurger () {
    let newBurger = new Burger ("burgerSize", "burgerFilling", "burgerRelish");
    console.log(newBurger);
}

// function addUser () {
//     let newUser = new User ('Name', 'Age', 'Gender', 'Hobbies')
//     users.push (newUser)
// }

class Burger {
    constructor (size, fill, adds) {
        this.size = this._getProp(size);
        this.filling = this._getProp(fill);
        this.adds = this._getArr(adds);
        this.calories = null;
        this.cost = null;
    }
    _getProp (attrName) {
        return document.querySelector (`input[name=${attrName}]:checked`).value;
    }
    _getArr (attrName) {
        let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)];
        return objArr.map (el => el.value);       
    }
}


// class User {
//     constructor (name, age, gender, hobbies) {
//         this.Name = this._text (name)
//         this.Age = this._text (age)
//         this.Gender = this._check (gender)
//         this.Hobbies = this._getArray (hobbies)
//         this.canBeMother = this._checkMom (gender)
//     }
//     _text (attrName) {
//         let obj = document.querySelector (`input[name=${attrName}]`)
//         return obj.value
//     }
//     _check (attrName) {
//         let obj = document.querySelector (`input[name=${attrName}]:checked`)
//         return obj.value
//     }
//     _getArray (attrName) {
//         let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)]
//         let arr = []
//         objArr.forEach (el => {
//             arr.push (el.value)
//         })
//         return arr
//     }
//     _checkMom (attrName) {
//         let obj = document.querySelector (`input[name=${attrName}]:checked`)
//         console.dir (obj)
//         return +obj.dataset['mother'] ? true : false
//     }
// }