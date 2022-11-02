function UserInformation() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.gender = true;
    this.phone = '';
    this.setGender = function (gender) {
        if (gender === 'Male') {
            this.gender = true;
        }
        else {
            this.gender = false;
        }
    }
}