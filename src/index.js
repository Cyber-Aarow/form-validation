import './main.css';

const countrySelect = document.querySelector('#country');
const postalCodeField = document.querySelector('#postal_code');


function checkPostalCode(){
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
        postalCodeField.setCustomValidity("Please select a country.");
        return;
    }

    const constraint = new RegExp(constraints[country][0], "");

    if (constraint.test(postalCodeField.value)){
        postalCodeField.setCustomValidity("");
    }
    else{
        postalCodeField.setCustomValidity(constraints[country][1]);
    }
}

countrySelect.addEventListener('change', checkPostalCode);
postalCodeField.addEventListener('input', checkPostalCode);