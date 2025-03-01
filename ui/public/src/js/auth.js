"use strict"

const doLogin = (event) => {
    event.preventDefault();
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;
    login({username, password})
    .then((response) => {
        //close modal
        const modal = document.querySelector('.modal');
        modal.classList.remove('is-active'); 
        // a toast message
        showSuccessToast('Successfully signed in!');
        window.location.href = "/";
    }).catch((error) => {
        showErrorToast(error.message)
    });

};

const doRegister = (event) => {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const reenterPassword = document.getElementById("signup-password-reenter").value;

    // check if passwords match
    if (password !== reenterPassword) {
        showErrorToast('Passwords do not match');
        console.log(username, email, password, reenterPassword)
        return;
    }

    register({username, email, password}).then((response) => {
        showSuccessToast('Successfully registered account!');
        // close register modal
        const modal = document.getElementById('modal-js-signup');
        modal.classList.remove('is-active'); 
        // open signin modal
        const signinmodal = document.getElementById('modal-js-signin');
        signinmodal.classList.add('is-active');
    }).catch((error) => {
        showErrorToast(error.message)
    });
};

const doLogout = (event) => {
    event.preventDefault(); 
    logout();
    showSuccessToast('Successfully logged out!');
    window.location.href = "/";
};