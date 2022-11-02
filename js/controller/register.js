// Global var
let arrUser = new Array();

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

function validateForm() {
    var radios = document.getElementsByName("gender");
    var formValid = false;

    var i = 0;
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

document.querySelector('.btn-submit').onclick = () => {
    let genderMale = document.querySelector('#dot-1').checked;
    let genderFemale = document.querySelector('#dot-2').checked;
    let user = new UserInformation();
    user.email = document.querySelector('#inputEmail').value;
    user.password = document.querySelector('#inputPassword').value;
    user.name = document.querySelector('#inputName').value;
    user.setGender(checkGender(genderMale, genderFemale));
    user.phone = document.querySelector('#inputPhoneNumber').value;
    let confirm = document.querySelector('#inputPasswordConfirm').value;

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

    if ((isEmptyError || isEmailError || isPassWordError || isMatchError || isUserNameError || isPhoneError || isGenderError) === false) {
        return
    }
    else {
        arrUser.push(user);
        luuLocalStorage();
        console.log(user)
        var promise = axios({
            url: 'https://shop.cyberlearn.vn/api/Users/signup',
            method: 'POST',
            data: user
        });

        // Successful
        promise.then(function (res) {
            console.log(res.data.message);
            window.location.reload();
        });

        //Failed
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
function luuLocalStorage() {
    var strArrUser = JSON.stringify(arrUser);
    // Lưu
    localStorage.setItem('arrUser', strArrUser);

    // Lưu vào cookies
    setCookie('arrUser', strArrUser, 5);
}
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
