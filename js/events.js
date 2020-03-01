let myProfile;


// ------------ Get profile data on load ------------
window.onload = () => {
    if (!localStorage.key('token') && !localStorage.key('id')) {
        window.location = 'index.html'
    }

    let id = localStorage.getItem("id");
    let token = localStorage.getItem("token");

    $.ajax({
        url: `http://kolbasa.qbex.io/api/profile/${id}`,  
        method: 'GET',         
        dataType : "json", 
        headers: {
            Authorization: `Bearer ${token}`
        },                   
        success: (data, textStatus) => { // вешаем свой обработчик на функцию success
            myProfile = JSON.parse(JSON.stringify(data));
            let mainBody = document.querySelector('.main-body');
            let profileFields = mainBody.querySelectorAll('span');

            let avatar = document.querySelector('.avatar');
            myProfile.photo ? avatar.style.backgroundImage = `url(${myProfile.photo})` : null;

            // console.log(profileFields[0].id.substring());

            profileFields.forEach(item => {
                let field = item.id;
                let slesh = field.indexOf('_');
                let nameField = field.substring(++slesh);
                item.innerText = myProfile[nameField];
            });
        },
        error: function (err, textStatus) { // вешаем свой обработчик на функцию success
            if (err.status === 403 && err.status === 401) {
                window.location = 'index.html'
            } 
        }
    });
}
// ------------ Get profile data on load ------------



// ------------ Edit Profile ------------
let saveBtn = document.querySelector('#save-profile');

saveBtn.addEventListener('click', () => {
    event.preventDefault;

    if (!localStorage.key('token') && !localStorage.key('id')) {
        window.location = 'index.html'
    }
    let modalWin = document.querySelector('.modal-window');
    let inputs = modalWin.querySelectorAll('input');
    let id = localStorage.getItem("id");
    let token = localStorage.getItem("token");
    let editedData = updateData(myProfile, inputs);

    $.ajax({
        url: `http://kolbasa.qbex.io/api/update_profile/${id}`, 
        data: {
            data: editedData
        },                   // тип загружаемых данных 
        method: 'POST',           // указываем URL и
        dataType : "json",
        headers: {
            Authorization: `Bearer ${token}`
        }, 
        success: (data, textStatus) => { // вешаем свой обработчик на функцию success
            window.location = 'profile.html'
            // console.log(data);
        },
        error: function (err, textStatus) { // вешаем свой обработчик на функцию success
            console.log("Sorry, some mistake");
        }
    });
            



    function updateData(myProfile, inputs) {
        inputs.forEach(element => {
            myProfile[element.id] = element.value;
        });
        return myProfile;
    }


});
// ------------ Edit Profile ------------



// -------------- Log Out ---------
let logOut = document.querySelector('.log-out');

logOut.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location = 'index.html'
})
// -------------- Log Out ---------


//  --------------- Close and Open Modal----------
let editBtn = document.querySelector('.call-edit-window');
let modalWrep = document.querySelector('.wrapper-modal');
let modalWin = document.querySelector('.modal-window');

editBtn.addEventListener('click', function () {
    modalWrep.style.display = 'flex';
    modalWin.style.display = 'block';
})

let closeModal = document.querySelector('.close');

closeModal.addEventListener('click', function () {
    modalWrep.style.display = 'none';
    modalWin.style.display = 'none';
})
//  --------------- Close and Open Modal----------



// --------------- Change Picture ----------
let avaForm = document.querySelector('#avaForm');
avaForm.addEventListener('submit', () => {
    event.preventDefault();
    let file = document.querySelector('form input[name=photo]').files[0]
    const formData = new FormData();
    formData.append('image', file);
        fetch('http://kolbasa.qbex.io/api/fileUpload',
            {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                },
                body: formData
        }).then(res => {
            console.log(res);
            return res.json()
        } )
        .then(res => {
            let photoLink = res.link;
            let linkFixed = photoLink.slice(photoLink.indexOf('/images'));
            photoLink = `http://kolbasa.qbex.io${linkFixed}`;
            console.log(photoLink);
            let avatar = document.querySelector('.avatar');
            avatar.style.backgroundImage = `url(${photoLink})`;
            myProfile.photo = photoLink;
            let token = localStorage.getItem("token");

            $.ajax({
                url: `http://kolbasa.qbex.io/api/update_profile/${myProfile.id}`, 
                data: {
                    data: myProfile
                },                   // тип загружаемых данных 
                method: 'POST',           // указываем URL и
                dataType : "json",
                headers: {
                    Authorization: `Bearer ${token}`
                }, 
                success: (data, textStatus) => { // вешаем свой обработчик на функцию success
                    window.location = 'profile.html'
                    // console.log(data);
                },
                error: function (err, textStatus) { // вешаем свой обработчик на функцию success
                    console.log("Sorry, some mistake");
                }
            });
        });


});

// --------------- Change Picture ----------
