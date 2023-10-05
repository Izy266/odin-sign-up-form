let number = document.querySelector("#number");
let numberError = document.querySelector("#number-error");
let names = document.querySelectorAll(".name");
let email = document.querySelector("#email");
let emailError = document.querySelector("#email-error");
let password = document.querySelector("#password");
let passwordUpperError = document.querySelector("#upper-password-error");
let passwordLowerError = document.querySelector("#lower-password-error");
let passwordNumberError = document.querySelector("#number-password-error");
let passwordLengthError = document.querySelector("#length-password-error");
let confirmPassword = document.querySelector("#confirm-password");
let confirmPasswordError = document.querySelector("#confirm-password-error");
let createAccountButton = document.querySelector("#create-account");

const isNumber = (event) => {
    let key = event.key;
    let ascii = key.charCodeAt(0);
    return ascii >= 48 && ascii <= 57 ? true : false;
}

const isLetter = (event) => {
    let key = event.key.toLowerCase();
    let ascii = key.charCodeAt(0);
    return ascii >= 97 && ascii <= 122 ? true : false;
}

const isNavigation = (event) => {
    let key = event.key.toLowerCase();
    return ['backspace', 'delete', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'tab', 'shift', 'enter'].includes(key) ? true : false;
}

// clear errors if number and name inputs not in focus
document.addEventListener("click", () => {
    let inputs = [number, names[0], names[1]]
    inputs.forEach(input => {
        if ((document.activeElement != input)) {
            input.nextElementSibling.textContent = "";
        }
    });
});

// error handling for phone number
number.addEventListener("keydown", (e) => {
    let isNum = isNumber(e);
    let isNav = isNavigation(e);
    if ((!isNum || number.value.length >= 10) && !isNav) {
        e.preventDefault();
        numberError.textContent = "Please enter a valid 10 digit number";
    } else {
        numberError.textContent = "";
    }
    setTimeout(() => { numberError.textContent = "" }, 5000);
});

// error handling for name
names.forEach(name => {
    name.addEventListener("keydown", (e) => {
        let isLet = isLetter(e);
        let isNav = isNavigation(e);
        let nameError = name.nextElementSibling;
        if ((!isLet || name.value.length >= 35) && !isNav) {
            e.preventDefault();
            if (!isLet) {
                nameError.textContent = "Please enter a valid letter";
            } else if (name.value.length >= 35) {
                nameError.textContent = "Name can not exceed 35 characters";
            }
        } else {
            nameError.textContent = ""
        }
        setTimeout(() => { nameError.textContent = "" }, 5000);
    });
});

email.addEventListener("input", (e) => {
    let validRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if ((!email.value.match(validRegex) || email.value.length > 320) && email.value.length > 0) {
        if (email.value.length > 320) {
            e.preventDefault();
            emailError.textContent = "There is no way in hell your email is that long";
        } else if (!email.value.match(validRegex)) {
            emailError.textContent = "Please enter a valid email. e.g. example@email.com";
        }
    } else {
        emailError.textContent = "";
    }
});

password.addEventListener("input", () => {
    let hasUpper = /[A-Z]/.test(password.value);
    let hasLower = /[a-z]/.test(password.value);
    let hasNumber = /\d/.test(password.value);

    if (password.value.length > 0) {
        passwordUpperError.textContent = !hasUpper ? "Password must contain at least one uppercase letter" : "";
        passwordLowerError.textContent = !hasLower ? "Password must contain at least one lowercase letter" : "";
        passwordNumberError.textContent = !hasNumber ? "Password must contain at least one number 0-9" : "";
        passwordLengthError.textContent = password.value.length < 8 ? "Password must be at least 8 characters long" : "";
    } else {
        passwordUpperError.textContent = "";
        passwordLowerError.textContent = "";
        passwordNumberError.textContent = "";
        passwordLengthError.textContent = "";
    }

    if (confirmPassword.value === password.value) {
        confirmPasswordError.textContent = "";
    }
});

confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value.length > 0) {
        confirmPasswordError.textContent = confirmPassword.value !== password.value ? "Passwords do not match" : "";
    }
});

createAccountButton.addEventListener("click", () => {
    inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.textContent = "";
    });
});

