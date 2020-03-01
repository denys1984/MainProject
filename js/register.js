
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
    inpLogVal = inpLog.value;
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

// ---------------- Form Validation ---------------







// ------------------ Send form ------------------
regBtn.addEventListener('click', () => {
    event.preventDefault();
    if (checkRegisterForm.login === 1 && checkRegisterForm.pas === 1 && checkRegisterForm.pasConf === 1) {

        $.ajax({
            url: 'http://kolbasa.qbex.io/api/register',  
            method: 'POST',           // указываем URL и
            dataType : "json",  
            data: {
             email: inpLogVal,
             password: pasTwoVal
            },                   // тип загружаемых данных
            success: (data, textStatus) => { // вешаем свой обработчик на функцию success
                window.location = 'index.html'
            },
            error: function (err, textStatus) { // вешаем свой обработчик на функцию success
                if (err.status === 422) {
                    errField.innerText = "This login already exists";
                } else {
                    errField.innerText = "Sorry, some server mistake";
                }
            }
        });


    } else {
        errField.innerText = "Fill all fields";
    }
})
// ------------------ Send form ------------------



