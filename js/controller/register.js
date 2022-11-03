// Global arr
let arrUser = new Array();

/**
 * checkGender() will return true if button choose male is checked as opposed to female is false
 * @param {*} dot1: male click
 * @param {*} dot2: female click
*/
let checkGender = (dot1, dot2) => {
    if (dot1 === true) {
        return 'Male';
    }
    else if (dot2 === true) {
        return 'Female';
    }
    else {
        return 'None';
    }
}

// Check gender's selection if it is already or not
function validateForm() {
    let radios = document.getElementsByName("gender");
    let formValid = false;

    let i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;
    }

    if (!formValid) {
        document.querySelector('#err-required-gender').style.display = 'block'
        document.querySelector('#err-required-gender').style.color = 'red'
        document.querySelector('#err-required-gender').style.margin = '0'
        document.querySelector('#err-required-gender').innerHTML = 'Gender must be chosen !!!'
    };
    return formValid;
}

//Button submit click to hand in form
document.querySelector('.btn-submit').onclick = () => {

    // Initialize object UserInformation container user input value
    let user = new UserInformation();

    // DOM to HTML to get input value from users
    let genderMale = document.querySelector('#dot-1').checked;
    let genderFemale = document.querySelector('#dot-2').checked;
    user.email = document.querySelector('#inputEmail').value;
    user.password = document.querySelector('#inputPassword').value;
    user.name = document.querySelector('#inputName').value;
    user.setGender(checkGender(genderMale, genderFemale));
    user.phone = document.querySelector('#inputPhoneNumber').value;
    let confirm = document.querySelector('#inputPasswordConfirm').value;

    /*Form Validation*/

    //Check empty
    let isEmptyError = validation.checkEmpty(user.email, 'err-required-email', 'icon-check-1', 'Email') & validation.checkEmpty(user.password, 'err-required-password', 'icon-check-2', 'Password') & validation.checkEmpty(confirm, 'err-required-confirm', 'icon-check-3', 'Confirming password') & validation.checkEmpty(user.name, 'err-required-name', 'icon-check-4', 'Your name') & validation.checkEmpty(user.phone, 'err-required-phone', 'icon-check-5', 'Your phone number');

    //Check email
    let isEmailError = validation.checkEmail(user.email, 'err-required-email', 'icon-check-1', 'Email');

    //Check password
    let isPassWordError = validation.checkPassword(user.password, 'err-required-password', 'icon-check-2', '');

    // Check confirm
    let isMatchError = validation.checkConfirm(confirm, 'err-required-confirm', 'icon-check-3', user.password);

    // Check username
    let isUserNameError = validation.checkCharacter(user.name, 'err-required-name', 'icon-check-4', '');

    //Check phone number
    let isPhoneError = validation.checkNumber(user.phone, 'err-required-phone', 'icon-check-5', 'Your phone number');

    //Check click gender
    let isGenderError = validateForm();

    // Check if use bitwise OR for all validation above are false, then return (end program)
    if ((isEmptyError || isEmailError || isPassWordError || isMatchError || isUserNameError || isPhoneError || isGenderError) === false) {
        return
    }
    else {

        // Push User value into an array which is saved to localStorage if needed
        arrUser.push(user);

        // Save the user information to local storage which is specifically in the client's devices
        saveToLocalStorage();

        // Use axios with method POST to send dato to server via its API
        let promise = axios({
            url: 'https://shop.cyberlearn.vn/api/Users/signup',
            method: 'POST',
            data: user
        });

        // Successful state or getting status 200
        promise.then(function (res) {
            console.log(res.data.message);
            window.location.reload();
        });

        //Failed: Get something such as bad request or axios will throw an exception back
        promise.catch(function (err) {
            console.log(err);
        })
    }
    // Push users into arr if not exist in local storage
    // if (arrUser.some((v) => { return v.email === user.email })) {
    //     alert('This email is already exist !!!')
    // }
    // else {
    // }
}



//LocalStorage
function saveToLocalStorage() {

    // Parse an array of object from JSON form to all string
    let strArrUser = JSON.stringify(arrUser);

    // Save to local storage
    localStorage.setItem('arrUser', strArrUser);

    // Save to cookies
    setCookie('arrUser', strArrUser, 5);
}

/**
 * Function to set cookie
 * @param {*} name: The data's name that want to store in cookie or session
 * @param {*} value: The data that needs to be stored into container which has Initialized its name above
 * @param {*} days: The day that it will be expired or outdated
 */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
