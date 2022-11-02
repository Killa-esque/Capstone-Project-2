var validation = {
    checkEmpty: function (value, errMessageId, errIconId, name) {
        if (value.trim() === '') {
            document.getElementById(errMessageId).style.display = 'inline-block';
            document.getElementById(errMessageId).innerHTML = `${name} is required !!!`;
            document.getElementById(errIconId).style.display = 'inline-block';
            document.getElementById(errIconId).style.fontSize = '30px';
            document.getElementById(errIconId).className = 'ion-invalid ion-md-information-circle text-warning';
            return false;
        }
        document.getElementById(errIconId).className = 'ion-success ion-md-checkmark-circle text-success';
        document.getElementById(errIconId).style.fontSize = '30px';
        document.getElementById(errMessageId).style.display = 'none'
        return true;
    },
    checkConfirm: function (value, errMessageId, errIconId, pwd) {
        var regexPassword = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/;
        if (pwd === value) {
            document.getElementById(errIconId).className = 'ion-success ion-md-checkmark-circle text-success';
            document.getElementById(errIconId).style.fontSize = '30px';
            document.getElementById(errMessageId).style.display = 'none'
            return true;
        }
        document.getElementById(errMessageId).style.display = 'inline-block';
        document.getElementById(errMessageId).innerHTML = `Passwords must be same`;
        document.getElementById(errIconId).style.display = 'inline-block';
        document.getElementById(errIconId).style.fontSize = '30px';
        document.getElementById(errIconId).className = 'ion-invalid ion-md-information-circle text-warning';
        return false;
    },
    checkPassword: function (value, errMessageId, errIconId, name) {
        var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (regexPassword.test(value)) {
            document.getElementById(errIconId).className = 'ion-success ion-md-checkmark-circle text-success';
            document.getElementById(errIconId).style.fontSize = '30px';
            document.getElementById(errMessageId).style.display = 'none'
            return true;
        }
        document.getElementById(errMessageId).style.display = 'inline-block';
        document.getElementById(errMessageId).innerHTML = `Minimum eight characters, at least one letter and one number`;
        document.getElementById(errIconId).style.display = 'inline-block';
        document.getElementById(errIconId).style.fontSize = '30px';
        document.getElementById(errIconId).className = 'ion-invalid ion-md-information-circle text-warning';
        return false;
    },
    checkName: function (value, errMessageId, errIconId, name) {
        var regexName = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
        console.log(regexName.test(value))

        if (regexName.test(value)) {
            console.log(value)
            document.getElementById(errIconId).className = 'ion-success ion-md-checkmark-circle text-success';
            document.getElementById(errIconId).style.fontSize = '30px';
            document.getElementById(errMessageId).style.display = 'none'
            return true;
        }
        document.getElementById(errMessageId).style.display = 'inline-block';
        document.getElementById(errMessageId).innerHTML = `Invalid name !!!`;
        document.getElementById(errIconId).style.display = 'inline-block';
        document.getElementById(errIconId).style.fontSize = '30px';
        document.getElementById(errIconId).className = 'ion-invalid ion-md-information-circle text-warning';
        return false;
    },
    checkCharacter: function (value, errMessageId, errIconId, name) {
        var regexLetter = /^[A-Za-z]+$/;
        if (regexLetter.test(value)) {
            document.getElementById(errIconId).className = 'ion-success ion-md-checkmark-circle text-success';
            document.getElementById(errIconId).style.fontSize = '30px';
            document.getElementById(errMessageId).style.display = 'none'
            return true;
        }
        document.getElementById(errMessageId).style.display = 'inline-block';
        document.getElementById(errMessageId).innerHTML = `Must be character`;
        document.getElementById(errIconId).style.display = 'inline-block';
        document.getElementById(errIconId).style.fontSize = '30px';
        document.getElementById(errIconId).className = 'ion-invalid ion-md-information-circle text-warning';
        return false;
    },
    checkNumber: function (value, errMessageId, errIconId, name) {
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            document.getElementById(errMessageId).style.display = 'none';
            document.getElementById(errIconId).className = 'ion-success ion-md-checkmark-circle text-success';
            document.getElementById(errIconId).style.fontSize = '30px';
            return true;
        }
        document.getElementById(errMessageId).style.display = 'inline-block';
        document.getElementById(errMessageId).innerHTML = `${name} must be all number`;
        document.getElementById(errIconId).style.display = 'inline-block';
        document.getElementById(errIconId).style.fontSize = '30px';
        document.getElementById(errIconId).className = 'ion-invalid ion-md-information-circle text-warning';
        return false;

    },
    checkEmail: function (value, errMessageId, errIconId, name) {
        var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (mailformat.test(value)) {
            document.getElementById(errMessageId).style.display = 'none';
            document.getElementById(errIconId).className = 'ion-success ion-md-checkmark-circle text-success';
            document.getElementById(errIconId).style.fontSize = '30px';
            return true;
        }
        document.getElementById(errMessageId).style.display = 'inline-block';
        document.getElementById(errMessageId).innerHTML = `Email is invalid`;
        document.getElementById(errIconId).style.display = 'inline-block';
        document.getElementById(errIconId).style.fontSize = '30px';
        document.getElementById(errIconId).className = 'ion-invalid ion-md-information-circle text-warning';
        return false;
    }
}