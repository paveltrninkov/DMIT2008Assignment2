const loginService = require('./loginService');
const fileService = require('./fileService');

exports.authenticate = (info) => {
    let {
        user,
        email,
        password
    } = {
        ...info
    };
    // get a list of user data
    let users = fileService.getFileContents('../data/users.json');
    // copy + pasted your code since it was easier than figuring out a new way to validate new user + better than writing it by hand :)
    //
    let returnUser = users.reduce((authObj, user) => {

        if (user.email === email) {
            authObj.validEmail = true;
        } else {
            // errorObj
        }

        if (user.password === password) {
            authObj.validPassword = true;
        } else {
            // passwordError authObj.passwordError = "something"
        }

        if (authObj.validEmail === true && authObj.validPassword === true) {
            authObj.user = user;
        }

        return authObj

    }, {
        validEmail: false,
        validPassword: false,
        user: null
    })

    return returnUser;
}

// same copy+paste here without the comments.
exports.validate = (info) => {
    const {
        username,
        email,
        password
    } = {
        ...info
    };

    let valid = true;
    let auth;

    if ((email.trim().length == 0)) {
        valid = false;
    }
    if ((password.trim()).length == 0) {
        valid = false;
    }
    if ((username.trim()).length == 0) {
        valid = false
    }

    if (valid) {
        auth = {
            username:null,
            email: null,
            password: null
        }
    } else {
        auth = {
            email: "Please input an email.",
            password: "Please input a password."
        }
    }
    return auth;
}

// register user
exports.register = (data) => {
    fileService.writeFileContents('../data/users.json', data);
}