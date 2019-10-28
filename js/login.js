let logBtn = document.querySelector('#login-btn');

logBtn.addEventListener('click', () => {
    event.preventDefault();

        let promise = fetch('http://kolbasa.qbex.io', {
            method: 'GET'
        }).then( res => res.json() )
        .then( res => {
            console.log(res)
        })
        .catch((err) => console.log(err));





})


