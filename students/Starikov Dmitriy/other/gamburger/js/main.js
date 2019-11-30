
        let btn = document.querySelector ('#okBtn')
        let gamburgers = [] 
        let sum = 0
        let sum1 = 0
        let cal1 = 0
        btn.addEventListener ('click', addGamburger)

        function addGamburger () {
            let newGamburger = new Gamburger ('Razmer', 'Nachinka', 'Dop')
            gamburgers.push (newGamburger)

            var pic = document.getElementById("pic")
            const newEl = document.createElement("div")
            newEl.classList.add("rezult")
            newEl.innerHTML = `<strong>Стоимость: </strong> ` + gamburgers[0].Sum + `<br/><strong>Калорийность: </strong>` + gamburgers[0].Callories
            pic.appendChild(newEl)
            gamburgers = [] 
        }

        class Gamburger {
            constructor (razmer, nachinka, dop) {
                this.Sum = this._raschet_sum (razmer, nachinka, dop)
                this.Callories = this._raschet_cal (razmer, nachinka, dop)
            }
            _raschet_sum (attrName1, attrName2, attrName3) {
                sum1 = 0
                let obj1 = document.querySelector (`input[name=${attrName1}]:checked`)
                let obj2 = document.querySelector (`input[name=${attrName2}]:checked`)
                let objArr = [...document.querySelectorAll (`input[name=${attrName3}]:checked`)]
                objArr.forEach (el => {
                    sum1 += (+el.dataset['sum'])
                })
                sum = (+obj1.dataset['sum']) + (+obj2.dataset['sum']) + sum1
                return sum
            }
            _raschet_cal (attrName1, attrName2, attrName3) {
                cal1 = 0
                let obj1 = document.querySelector (`input[name=${attrName1}]:checked`)
                let obj2 = document.querySelector (`input[name=${attrName2}]:checked`)
                let objArr = [...document.querySelectorAll (`input[name=${attrName3}]:checked`)]
                objArr.forEach (el => {
                    cal1 += (+el.dataset['cal'])
                })
                sum = (+obj1.dataset['cal']) + (+obj2.dataset['cal']) + cal1
                return sum
            }
        }    
