
/* 

Добрый день)
Как я и обещала, добавила валидацию формы. 

Что бы вы ни решили по итогу проверки, буду благодарна за feedback.

*/


const email = document.querySelector('#email');
const password = document.querySelector('#password');


form.addEventListener('submit', (e) => {
	e.preventDefault();

	checkIputs();
});

function checkIputs(){
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();

	if(emailValue === ''){ 
			setErrorFor(email, 'Email cannot be blank');

	} else if(!isEmail(emailValue)){

			setErrorFor(email, 'Email is not valid');

	}else{
		setSuccessFor(email);
	}
}

function setErrorFor(input, message){
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');

	small.innerText = message;
	formControl.className = 'form-control error';
}

function setSuccessFor(input){
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

		















































