let form = document.querySelector ('#mainForm')
let btn = document.querySelector ('#push')
let hums = []

    btn.addEventListener ('click', makeHam)

        function makeHam () {
            let newHum = new Hum ('size', 'ingredient', 'add')
            hums.push (newHum)
        }

        class Hum {
            constructor (size, ingredient, add) {
                this.size = this._getArray (size)
                this.ingredient = this._check (ingredient)
                this.add = this._getArray (add)
                this.final_price();
            }
            _getArray (attrName) {
                let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)]
                let arr = []
                objArr.forEach (el => {
                    arr.push (el.value)
                })
                return arr
            }
            _check (attrName) {
                let obj = document.querySelector (`input[name=${attrName}]:checked`)
                return obj.value
            }
            _getArray (attrName) {
                let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)]
                let arr = []
                objArr.forEach (el => {
                    arr.push (el.value)
                })
                return arr
            }
        }
console.log()
//а дальше что-то тяжко
