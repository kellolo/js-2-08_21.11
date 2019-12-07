'use strict'

class Validator {
    constructor(element, rules) {
        this.element = element
        this.regexp = {
            "brackets": /\s+(\')|(\')\s+/gm,
            "name": /[A-ZА-Я]{1,1}[a-zа-я]{2,12}/gm,
            "email": /([\w - ] + \.) + \w +/gm
        }
        this.text = ''
        this.rules = rules
        this._init()
    }
    _init() {
        this._validate()
    }

    _validate() {
        document.querySelector(this.element).addEventListener('input', () => {
            this.text = document.querySelector(this.element).value
            switch (this.rules) {
                case "brackets":
                    this._replace_brackets()
                    break
                case "email":
                    this._validate_email()
                    break
                case "name":
                    this._validate_name()
                    break
            }
        });

    }

    _replace_brackets() {
        document.querySelector(this.element).value = this.text.replace(this.regexp.brackets, ' " ')
    }

    _validate_name() {
        console.log(this.regexp.name.test(this.text))
        if (!this.regexp.name.test(this.text)) {
            document.querySelector(this.element).classList.toggle('redBorder')
        } else {
            document.querySelector(this.element).classList.remove('redBorder')
        }

    }

    _validate_email() {
        console.log(this.regexp.name.test(this.text))
        if (!this.regexp.name.test(this.text)) {
            document.querySelector(this.element).classList.toggle('redBorder')
        } else {
            document.querySelector(this.element).classList.remove('redBorder')
        }

    }

}

let text = new Validator("#simpleText", "brackets")
let email = new Validator("#email", "email")
let name = new Validator("#name", "name")