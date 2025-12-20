import './main.css';

const form = document.querySelector('#form');

const email = document.querySelector('#email');
const postalCode = document.querySelector('#postal_code');
const countrySelect = document.querySelector('#country');
const confirmPassword = document.querySelector('#confirm_password');



function showError(input, message){
    const error = document.getElementById(input.dataset.error);
    error.textContent = message;
    if(message !== ""){
        error.classList.add('active');
    }
    else{
        error.classList.remove('active');
    }
}

function validateEmail(input){
    showError(input, input.validationMessage);
}

function validatePostalCode(input){
    const constraints = {
        ch: [
            "^(CH-)?\\d{4}$",
            "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
        ],
        us: [
            "^(US-)?\\d{5}",
            "United States postal codes must have exactly 5 digits: e.g. US-1911 or 1911",
        ],
    };

    const country = countrySelect.value;

    if(!constraints[country]){
        input.setCustomValidity("Please select a country.");
        return;
    }

    const constraint = new RegExp(constraints[country][0], "");

    if (constraint.test(input.value)){
        input.setCustomValidity("");
    }
    else{
        input.setCustomValidity(constraints[country][1]);
    }
    showError(input, input.validationMessage);
}

function validateConfirmPassword(input){
    const password = document.querySelector('#password');
    if(password.value !== input.value){
        input.setCustomValidity("The passwords do not match.");
    }
    else{
        input.setCustomValidity("");
    }
    showError(input, input.validationMessage);
}

const validators = {
    email: validateEmail,
    postal_code: validatePostalCode,
    confirm_password: validateConfirmPassword,
}

function validateField(input){
    validators[input.id]?.(input);
}



email.addEventListener('input', (e) => validateField(e.target));
postalCode.addEventListener('input', (e) => validateField(e.target));
confirmPassword.addEventListener('input', (e) => validateField(e.target));
//Country affects postal_code validity
countrySelect.addEventListener('change', () => validateField(postalCode));



form.addEventListener('submit', (e)=>{
    if(!form.checkValidity()){
        e.preventDefault();
        form.reportValidity();
    }
});