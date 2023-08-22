/**
 * Loads users from the storage.
 * @returns {Promise<void>} Resolves when users are loaded or an error is logged.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * Registers a new user, checks if a user with the same email exists before registration.
 * @returns {Promise<void>} Resolves when the user is registered, an error message is shown, or the form is reset.
 */
async function register() {
    disableBtn('registerBtn');
    let name = document.getElementById('signUpName').value;
    let email = document.getElementById('emailSignUp').value;
    let parentDiv = document.getElementById('passwordSignUp');
    let password = parentDiv.querySelector("input").value;
    let userExists = users.some((user) => user.email === email);
    if (userExists) {
        showFailureBanner('User already exists!');
        enableBtn('registerBtn');
    } else {
        await createNewUser(name, email, password);
    }
}


/**
 * pushes new user to the users array and shows feedback
 */
async function createNewUser(name, email, password) {
    users.push({
        name: name,
        email: email,
        password: password,
    });
    await setItem('users', JSON.stringify(users));
    showSuccessBanner('New user created');
    renderLogin();
}


/**
 * Deletes a user from the storage by email.
 * @param {string} email - The email of the user to be deleted.
 * @returns {Promise<void>} Resolves when the user is deleted, not found, or an error is logged.
 */
async function deleteUser(email) {
    try {
        let users = JSON.parse(await getItem('users'));
        let index = users.findIndex(user => user.email === email);

        if (index !== -1) {
            users.splice(index, 1);
            await setItem('users', JSON.stringify(users));
            showSuccessBanner('User has been deleted');
        } else {
            showFailureBanner('User not found!');
        }
    } catch (e) {
        console.error('Deleting error:', e);
    }
}