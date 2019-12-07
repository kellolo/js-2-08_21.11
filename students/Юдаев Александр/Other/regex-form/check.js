class FormHandler {
    constructor(inputId, regEx, error) {
        this.inputId = inputId;
        this.regEx = regEx;
        this.error = error;
        this._inputHandler();
        this._buttonDisable(true);
    }

    _inputHandler(){
        let el = document.getElementById(this.inputId);
        el.addEventListener('input', (e) => {
            let errorCheck = false;
            if(e.target.tagName === 'INPUT'){
                if (this.regEx.test(e.target.value)) {
                    e.target.style.background = '#d4edda';
                    e.target.style.border = '1px solid #c3e6cb';
                } else if(e.target.value === ''){
                    e.target.style.background = null;
                    e.target.style.border = null;
                } else {
                    e.target.style.background = '#f8d7da';
                    e.target.style.border = '1px solid #f5c6cb';
                    document.querySelector(`label[for="${this.inputId}"]`);
                    errorCheck = true;
                }
                this._errorHandler(errorCheck, el.parentElement);
            } else {
                if (this._notNullFields(el.parentElement.parentElement)){
                    this._buttonDisable(false);
                }else{
                    this._buttonDisable(true);
                }
            }
        });
    }

    _errorHandler(status, parent) {
        if (status){
            if (parent && parent.lastElementChild.className !== 'error'){
                let errorBlock = document.createElement('div');
                errorBlock.setAttribute('class','error');
                errorBlock.innerText = this.error;
                parent.appendChild(errorBlock);
                this._buttonDisable(true);
            }
        } else {
            if (parent.lastElementChild.className === 'error') {
                parent.lastElementChild.remove();
            }
            if (this._notNullFields(parent.parentElement)) this._buttonDisable(false);
            else this._buttonDisable(true);
        }
    }

    _buttonDisable(status) {
        let sendButton = document.querySelector('input[type="button"]');
        if (status) {
            sendButton.setAttribute('disabled', true);
            sendButton.style.background = '#ccc';
            sendButton.style.cursor = 'default';
        } else {
            sendButton.removeAttribute('disabled');
            sendButton.style.background = null;
            sendButton.style.cursor = null;
        }
    }

    _notNullFields(form){
        let nullFieds = [];
        for (let i = 0; i < form.length; i++){
            if (form[i].value !== '') nullFieds.push(true);
            else nullFieds.push(false);
        }
        return nullFieds.every(elem => elem === true);
    }
}

inputsRules = [
    {
        id:'name',
        regEx: /^[A-zА-я]+$/,
        err: 'Имя должно содержать только буквы без пробелов'
    },
    {
        id:'tel',
        regEx: /^\+7(\(\d{3}\))(\d{3})-(\d{4})$/,
        err: 'Телефон должен иметь вид +7(000)000-0000'
    },
    {
        id:'mail',
        regEx: /[A-z0-9]+@[A-z0-9]+\.[A-z0-9]+/,
        err: 'E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
    },
    {
        id:'message',
        regEx: null,
        err: null
    }
    ];

inputsRules.forEach(val => new FormHandler(val.id, val.regEx, val.err));

const str = `Hi, I am Greek 'geek' from Geekbrains`;
const regexp = /( \'[a-z]+\' )/gi;

console.log(str.replace(regexp, '+$1+'));