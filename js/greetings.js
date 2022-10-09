const loginForm = document.querySelector(".login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector(".greeting");
const clearBtn = document.querySelector(".clear-btn");

const visibleWithStorages = [
    ".greeting",
    ".todo-form",
    ".todo-list",
    ".clear-btn",
];

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function onClearSubmit(event) {
    event.preventDefault();
    localStorage.clear();
    paintLogIn();
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    visibleWithStorages.forEach((item) =>
        document.querySelector(item).classList.remove(HIDDEN_CLASSNAME)
    );
    clearBtn.addEventListener("submit", onClearSubmit);
}

function paintLogIn() {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    visibleWithStorages.forEach((item) =>
        document.querySelector(item).classList.add(HIDDEN_CLASSNAME)
    );
    loginForm.addEventListener("submit", onLoginSubmit);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    paintLogIn();
} else {
    paintGreetings(savedUsername);
}
