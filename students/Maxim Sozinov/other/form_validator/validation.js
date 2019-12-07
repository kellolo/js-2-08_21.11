const inputs = document.querySelectorAll('input');

const patterns = {
	username: /^[a-zа-я]+$/i,
	telephone: /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
	email: /^[a-z\d]+[\.\-]?[a-z\d]+@[a-z\d]+\.[a-z\d]{2,8}$/i
};

function validate(field, regex) {
	if (regex.test(field.value)) {
		field.className = 'valid';
	} else {
		field.className = 'invalid';
	}
}

let submitBtn = document.querySelector('button');

submitBtn.addEventListener('click', () => {
			inputs.forEach((input) => {
				validate(input, patterns[input.attributes.name.value]);
			});
		});