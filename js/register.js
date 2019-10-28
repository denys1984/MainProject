let errField = document.querySelector('.error-field');
let inpLog = document.querySelector('#create-login');
let inpLogVal;
let pasOne = document.querySelector('#password-one');
let pasOneVal;
let pasTwo = document.querySelector('#password-two');
let pasTwoVal;
let regBtn = document.querySelector('#register-btn');
let checkRegisterForm = {};


// ---------------- Form Validation ---------------
inpLog.addEventListener('blur', () => {
    errField.innerText = '';
    inpLogVal = inpLog.value
    if (!validateEmail(inpLogVal)) {
        errField.innerText = 'Not valid email address';
    } else {
        checkRegisterForm.login = 1;
    }
});

pasOne.addEventListener('blur', () => {
    errField.innerText = '';
    pasOneVal = pasOne.value;
    if (!checkPassword(pasOneVal)) {
        errField.innerText = 'Please, enter correct password';
    } else {
        checkRegisterForm.pas = 1;
    }
});

pasTwo.addEventListener('blur', () => {
    errField.innerText = '';
    pasTwoVal = pasTwo.value;

    if (!(pasOneVal == pasTwoVal)) {
        errField.innerText = "Passwords don't match";
    } else {
        checkRegisterForm.pasConf = 1;
    }
});
// ---------------- Form Validation ---------------



// ------------------ Send form ------------------
regBtn.addEventListener('click', () => {
    event.preventDefault();
    if (checkRegisterForm.login === 1 && checkRegisterForm.pas === 1 && checkRegisterForm.pasConf === 1) {
        
        fetch('http://kolbasa.qbex.io/api/login', {
            method: 'POST',
            headers: {
                Accept:application/json
            },
            Data: {
                email: inpLogVal,
                password: pasTwoVal
            },
        }).then( token => console.log(token) );

    } else {
        errField.innerText = "Fill all fields";
    }
})



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkPassword(str) {
  // at least one number, one lowercase and one uppercase letter
  // at least six characters
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return re.test(str);
}