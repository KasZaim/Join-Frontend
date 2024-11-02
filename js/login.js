/**
 * The key used to store the current user in localStorage.
 */
const CURRENT_USER_KEY = 'currentUser';

/**
 * The current user, obtained from localStorage, or an empty array if no user is found.
 */
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || [];

/**
 * An array containing the current user when they request to change their password.
 */
let currentUserForNewPassword = [];


/**
 * Initializes the app by rendering the login form after a 300ms delay.
 */
function init() {
    setTimeout(function () {
        renderLogin()
    }, 300);
}


/**
 * Renders the login form, loading user data beforehand.
 */
async function renderLogin() {
    document.title = 'Join | Log in';
    let card = document.getElementById('loginForm');
    card.innerHTML = loginTemplate();
    let header = document.getElementById('loginHeaderRight');
    header.classList.remove("d-none");
    await loadUsers();
}


/**
 * Changes the password input field icon when the user types or clears their password.
 */
function changePWSymbol(id) {
    let parentDiv = document.getElementById(`${id}`);
    let input = parentDiv.querySelector("input");
    let symbol = parentDiv.querySelector("img");
    if (input.value == "") {
        symbol.src = "../assets/icons/password.svg";
        symbol.classList.remove("pointer", "opa-05");
        input.type = "password";
    } else if ((input.type = "password")) {
        symbol.src = "../assets/icons/privacy.png";
        symbol.classList.add("pointer", "opa-05");
    } else {
        symbol.src = "../assets/icons/visibility.png";
        symbol.classList.add("pointer", "opa-05");
    }
}


/**
 * Toggles the visibility of the password input field.
 */
function showPassword(id) {
    let parentDiv = document.getElementById(`${id}`);
    let input = parentDiv.querySelector("input");
    let symbol = parentDiv.querySelector("img");
    if (input.value.length > 0) {
        if (input.type === "password") {
            input.type = "text";
            symbol.src = "../assets/icons/visibility.png";
        } else {
            input.type = "password";
            symbol.src = "../assets/icons/privacy.png";
        }
    }
}


/**
 * Changes the view to the sign up form
 */
function signUp() {
    adjustHeader('Join | Sign Up');
    let card = document.getElementById('loginForm');
    card.innerHTML = signUpTemplate();
}


/**
 * Changes the view to the new password form
 */
function newPassword() {
    adjustHeader('Join | Reset Password');
    let card = document.getElementById('loginForm');
    card.innerHTML = newPasswordTemplate();
}


/**
 * Changes the view to the reset password form
 */
function resetPassword() {
    adjustHeader('Join | Reset Password');
    let card = document.getElementById('loginForm');
    let email = document.getElementById('resetEmail').value;
    let user = users.find(user => user.email === email);
    if (!user) {
        showFailureBanner('User not found!');
        return;
    } else {
        currentUserForNewPassword.push(user);
        card.innerHTML = resetPasswordTemplate();
        showSuccessBanner('New password send');
    }
}


/**
 * checks if the new given password input is correct
 */
async function updatePassword() {
    let parentDiv = document.getElementById('passwordReset');
    let newPassword = parentDiv.querySelector("Input").value;
    let parentDivConfirm = document.getElementById('passwordResetConfirm');
    let newPasswordConfirm = parentDivConfirm.querySelector("Input").value;
    const userIndex = users.findIndex(user => user.email === currentUserForNewPassword[0].email);
    if (newPassword !== newPasswordConfirm) {
        showFailureBanner(`Passwords dont match!<br>Try again`);
    } else if (userIndex > -1) {
        await setNewPassword(userIndex, newPassword);
    }
}


/**
 * saves the new password on the server and shows feedback
 */
async function setNewPassword(userIndex, newPassword) {
    users[userIndex].password = newPassword;
    await setItem('users', JSON.stringify(users));
    currentUserForNewPassword = [];
    showSuccessBanner('Password resetted');
    renderLogin();
}


/**
 * Logs the user into the application.
 */
async function login() {
    disableBtn('loginBtn');
    let email = document.getElementById('emailInput').value;
    let password = document.getElementById('passwordInput').value;
    let user = users.find((user) => user.email === email);
    if (!user) {
        showFailureBanner('User not found!');
        enableBtn('loginBtn');
    } 
    try {
        
        const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: user.username, password: password }) 
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            createCurrentUser(user)
            showSuccessBanner('Login successful!');
            forwardToMainPage();
            return;
        } else {
            const error = await response.json();
            showFailureBanner(error.error || 'Login failed!');
            enableBtn('loginBtn');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        showFailureBanner('An error occurred. Please try again.');
        enableBtn('loginBtn');
    }     
}


/**
 * Creates a new user session.
 * @param {Object} user - The user object.
 */
function createCurrentUser(user) {
    currentUser.push(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
}


/**
 * Redirects the user to the main page of the application.
 */
function forwardToMainPage() {
    window.location.href = "html/mainpage.html";
}


/**
 * Logs the user out of the application.
 */
function logOut() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = "../index.html";
}


/**
 * hides the header and adjusts the document title
 */
function adjustHeader(text) {
    document.title = `${text}`;
    let header = document.getElementById('loginHeaderRight');
    header.classList.add("d-none");
}


/**
 * disables a specific button
 * @param {*string} btnID - Id of button
 */
function disableBtn(btnID) {
    let button = document.getElementById(`${btnID}`);
    button.disabled = true;
}


/**
 * enables a specific button
 * @param {*string} btnID - Id of button
 */
function enableBtn(btnID) {
    let button = document.getElementById(`${btnID}`);
    button.disabled = false;
}