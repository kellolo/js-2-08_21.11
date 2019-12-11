const btnCheck = document.getElementsByClassName("replaceForm__btnCheck")[0];
btnCheck.addEventListener("click", function(){
    CheckSpell("'");
    });
const btnAdvCheck = document.getElementsByClassName("replaceForm__btnAdvCheck")[0];
btnAdvCheck.addEventListener("click", function(){
    CheckSpell("\\B'|'\\B");
    });


function CheckSpell(_mask){
    let initText  = document.getElementsByClassName("replaceForm__initText")[0];
    let finalText = document.getElementsByClassName("replaceForm__finalText")[0];
    let mask = new RegExp(_mask,"g");
    let initStr = initText.value;
    let finalStr = initStr.replace(mask,"\"");
    finalText.innerHTML = finalStr;
}

class Validator{
    constructor(form){
        this.objMap = [];
        let blocks = form.getElementsByClassName("validatorForm__block");
        for (let i  = 0; i < blocks.length; i++){
            let input = blocks[i].querySelectorAll("*")[1];
            let type = input.type;
            let unit = new Object(null);
            unit.block = blocks[i];
            unit.input = input;
            unit.type = type;
            this.objMap.push(unit);
        }
        for (let j = 0; j < this.objMap.length; j++){
            let obj = this.objMap[j];
            obj.input.addEventListener("keypress",function(obj){
                this.validate(obj);
            });
        }
    }
    validate(el){
        let mask;
        switch (el.type){
            case "text": mask = "[a-zA-Zа-яА-Я]";
                        break;
            case "tel": mask = "\\+\\d\\(\\d{3}\\)\\d{3}\\-\\d{4}";
                        break;
            case "email": mask = "[\\w.-]+@[\\w]+\.[\\w]+";
                        break;
            case "textarea": mask = "."; break;
        }
        let exp = new RegExp(mask, "g");
        let isValid = (el.value.match(exp)) ? true : false;
        let classList = el.block.classList;
        if (isValid){
            if (classList.contains("validatorForm_invalid")) classList.remove("validatorForm_invalid");
            if (!classList.contains("validatorForm_valid")) classList.add("validatorForm_valid");
        } else{
            if (classList.contains("validatorForm_valid")) classList.remove("validatorForm_valid");
            if (!classList.contains("validatorForm_invalid")) classList.add("validatorForm_invalid");
        }
    }
}
        
let validator = new Validator(document.getElementsByClassName("validatorForm")[0]);
