let username = document.getElementById('username');
let password = document.getElementById('password');
let submit = document.getElementById('submit');

let admin = [
    {
        "username": "username",
        "password": "password"
    },
    {
        "username": "ahmed",
        "password": "ahmed"
    }
];

function checkAdmin() {
    for (let i = 0; i < admin.length; i++) {
        if (username.value === admin[i].username && password.value === admin[i].password) {
            console.log("Authentication successful.");
            sessionStorage.setItem('is', 'true');
            return;
        }
    }
    console.log("Authentication failed.");
    sessionStorage.setItem('is', 'false');
}

submit.addEventListener('click', (e) => {
    checkAdmin();
    if (sessionStorage.getItem('is') === 'true') {
        e.preventDefault()
        window.location.href = "/admin";
    } else {
        e.preventDefault();
       
    }
});
