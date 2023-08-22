/**
 * Generates the HTML template for the reset password form
 * @returns {string} - The reset password form HTML template
 */
function resetPasswordTemplate() {
    return `
    <form class="reset-pw-form f-center f-column" onsubmit="updatePassword(); return false;">
        <div class="login-headline-container f-center">  
            <img onclick="newPassword()" class="pointer" src="../assets/icons/back_arrow_lightblue.png">
            <h1>Reset your password</h1>
        </div> 
        <div class="login-design-line"></div>
        <div class="login-input-container f-column a-i-center">
            <span class="login-headline-span d-flex j-center">Change your account password</span>
            <div class="login-input f-center" id="passwordReset">
                <input class="loginE-Mail" type="password" minlength="8" placeholder="New password" required onkeydown="changePWSymbol('passwordReset')">
                <img src="../assets/icons/password.svg" class="inputImg password-img" onclick="showPassword('passwordReset')">
            </div>
            <div class="login-input f-center" id="passwordResetConfirm">
                <input class="loginE-Mail" type="password" minlength="8" required placeholder="Confirm password" onkeydown="changePWSymbol('passwordResetConfirm')">
                <img id="passwordConfirmImg" class="inputImg password-img" src="../assets/icons/password.svg" onclick="showPassword('passwordResetConfirm')">
            </div>
        </div>
        <div class="sign-up-btn-container d-flex j-center">
            <button class="reset-pw-btn pointer" type="submit">Continue</button>
        </div>
    </form>
    `;
}


/**
 * Returns the HTML template for the login form.
 * @returns {string} The HTML template for the login form.
 */
function loginTemplate() {
    return `
    <form class="login-form f-center f-column" onsubmit="login(); return false;">
      <div class="f-column a-i-center">
          <h1>Log in</h1>
      </div>
      <div class="login-design-line"></div>
      <div class="login-input-container f-column a-i-center">
          <div class="login-input f-center">
              <input class="loginE-Mail" type="email" required placeholder="E-mail" id="emailInput">
              <img class="inputImg" src="../assets/icons/mail.png">
          </div>
          <div class="login-input f-center" id="passwordLogin">
              <input id="passwordInput" class="loginE-Mail" minlength="8" type="password" required placeholder="Password" onkeydown="changePWSymbol('passwordLogin')">
              <img class="inputImg password-img" src="../assets/icons/password.svg" onclick="showPassword('passwordLogin')">
          </div>
          <div class="loginFooter d-flex j-center gap-25">
              <div class="d-flex gap-8">
                  <input class="loginCheckbox pointer" type="checkbox"> 
                  <p class="rememberMe m-0">Remember me</p>
              </div>  
              <p class="forgotPass m-0 pointer" onclick="newPassword()">Forgot Password ?</p> 
          </div>
      </div>
      <div class="sign-up-btn-container d-flex j-center gap-35">
          <button id="loginBtn" class="login-btn pointer" type="submit">Log in</button>
          <button class="guest-login-btn pointer" onclick="forwardToMainPage()">Guest Log in</button>
      </div>
    </form>
    `;
}


/**
 * Generates the HTML template for the sign up form
 * @returns {string} - The sign up form HTML template
 */
function signUpTemplate() {
    return `
    <form class="sign-up-form f-center f-column" onsubmit="register(); return false;">
        <div class="login-headline-container f-center">  
            <img onclick="renderLogin()" class="pointer" src="../assets/icons/back_arrow_lightblue.png">
            <h1>Sign up</h1>
        </div>
        <div class="login-design-line"></div>
        <div class="login-input-container f-column a-i-center">
            <div class="login-input f-center">
                <input class="loginE-Mail" type="text" required id="signUpName" placeholder="Name">
                <img class="inputImg" src="../assets/icons/person.png">
            </div>
            <div class="login-input f-center">
                <input class="loginE-Mail" type="email" required id="emailSignUp" placeholder="Email">
                <img class="inputImg" src="../assets/icons/mail.png">
            </div>
            <div class="login-input f-center m-0" id="passwordSignUp">
                <input class="loginE-Mail" type="password" minlength="8" required placeholder="Password" onkeydown="changePWSymbol('passwordSignUp')">
                <img class="inputImg password-img" src="../assets/icons/password.svg" onclick="showPassword('passwordSignUp')">
            </div>     
        </div>
        <div class="sign-up-btn-container d-flex j-center">
            <button id="registerBtn" class="sign-up-btn pointer" type="submit">Sign up</button>
        </div>
    </form>
    `;
}


/**
 * Generates the HTML template for the new password form
 * @returns {string} - The new password form HTML template
 */
function newPasswordTemplate() {
    return `
    <form class="new-pw-form f-center f-column" onsubmit="resetPassword(); return false;">
        <div class="login-headline-container f-center">  
            <img onclick="renderLogin()" class="pointer" src="../assets/icons/back_arrow_lightblue.png">
            <h1>Forgot password</h1>
        </div> 
        <div class="login-design-line"></div>
        <div class="login-input-container f-column a-i-center">
            <span class="login-headline-span d-flex j-center">Don't worry! We will send you an email with the instructions to reset your password.</span>
            <div class="login-input f-center">
                <input id="resetEmail" class="loginE-Mail" type="email" placeholder="Email" required>
                <img src="../assets/icons/mail.png" class="inputImg">
            </div>
        </div>
        <div class="sign-up-btn-container d-flex j-center">
            <button class="new-pw-btn pointer" type="submit">Send Email</button>
        </div>
    </form>
    `;
}