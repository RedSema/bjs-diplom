"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (result) => {
        if (result.success) {
            location.reload();
        } else {
            alert(result.error);
        }
    })
}

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (result) => {
        if (result.success) {
            location.reload();
        } else {
            alert(result.error);
        }
    })
}

