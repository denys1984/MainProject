window.onload = () => {
    if (localStorage.key('token') && localStorage.key('id')) {
        window.location = 'profile.html'
    }
}



let getLogin = document.querySelector('#login');
let getLoginVal;
let getPassword = document.querySelector('#password');
let getPasswordVal;
let logBtn = document.querySelector('#login-btn');



logBtn.addEventListener('click', () => {
    event.preventDefault();

    getLoginVal = getLogin.value;
    getPasswordVal = getPassword.value;

    $.ajax({
        url: 'http://kolbasa.qbex.io/api/login',  
        method: 'POST',           // указываем URL и
        dataType : "json",  
        data: {
         email: getLoginVal,
         password: getPasswordVal
        },                   // тип загружаемых данных
        success: function (data, textStatus) { // вешаем свой обработчик на функцию success
            console.log(data);
            Token.saveToken(data.token);
            Token.saveId(data.user_id);
            // let logForm = document.querySelector('#login-form');

            document.body.innerHTML = '<img src="images/rotate.gif" alt="">';
            setTimeout(function () {
                window.location = 'profile.html'
                }, 2000);
            
        },
        error: function (err, textStatus) {
            if (err.status === 403 && err.status === 401) {
                console.log('Ошибка 403 или 401')
            } 
        }         
    });
});


class Token {
    static saveToken(token) {
        localStorage.setItem('token', token);
    }
    static saveId(id) {
        localStorage.setItem('id', id);
    }
}




