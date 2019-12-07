const patterns = {
	username: /^[a-zа-я]+$/i,
	telephone: /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
	email: /^[a-z\d]+[\.\-]?[a-z\d]+@[a-z\d]+\.[a-z\d]{2,8}$/i
};

// закомментирован вариант без классов
// --------------------------------------------------------------------------

// const inputs = document.querySelectorAll(`form[name="form1"] input`);

// function validate(field, regex) {
// 	if (regex.test(field.value)) {
// 		field.className = 'valid';
// 	} else {
// 		field.className = 'invalid';
// 	}
// }

// let submitBtn = document.querySelector('.form1-submitBtn');

// submitBtn.addEventListener('click', () => {
// 	inputs.forEach((input) => {
// 		validate(input, patterns[input.attributes.name.value]);
// 	});
// });
// -------------------------------------------------------------------------------

class InputField {
	constructor(name) {
		this.field = document.querySelector(`input[name=${name}]`);
		this.pattern = patterns[name];
	}
	validate() {
		if (this.pattern.test(this.field.value)) {
			this.field.className = 'valid';
		} else {
			this.field.className = 'invalid';
		}
	}
}

class Form {
	constructor(name) {
		this.InputFields = [];
		this._init(name);
	}
	_init(name) {
		let inputs = document.querySelectorAll(`form[name=${name}] input`);
		inputs.forEach((input) => {
			this.InputFields.push(new InputField(input.attributes.name.value));
		});
		let submitBtn = document.querySelector('.form1-submitBtn');
		submitBtn.addEventListener('click', () => {
			this.InputFields.forEach((input) => {
				input.validate();
			});
		});
	}
}

let ourForm = new Form("form1");