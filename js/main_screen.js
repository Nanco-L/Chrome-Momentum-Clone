const loginForm = document.querySelector(".login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector(".greeting");
const btns = document.querySelector(".btns");
const clearBtn = document.querySelector(".clear-btn");
const todoClearBtn = document.querySelector(".todo-clear-btn");

const visibleWithStorages = [".greeting", ".todo-form", ".todo-list", ".btns"];

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const toDoForm = document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".todo-list");

const TODOS_KEY = "todos";
let toDos = [];

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function clearToDo() {
    document.querySelectorAll(".todo-list li").forEach((item) => item.remove());
    toDos = [];
    saveToDo();
}

function onClearSubmit(event) {
    event.preventDefault();
    localStorage.clear();
    paintLogIn();
    clearToDo();
}

function onTodoClearSubmit(event) {
    event.preventDefault();
    clearToDo();
    // localStorage.removeItem("todos");
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    visibleWithStorages.forEach((item) =>
        document.querySelector(item).classList.remove(HIDDEN_CLASSNAME)
    );
    clearBtn.addEventListener("submit", onClearSubmit);
    todoClearBtn.addEventListener("submit", onTodoClearSubmit);
}

function paintLogIn() {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    visibleWithStorages.forEach((item) =>
        document.querySelector(item).classList.add(HIDDEN_CLASSNAME)
    );
    loginForm.addEventListener("submit", onLoginSubmit);
}

function saveToDo() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// NOTE: Add multiple Args in callback function ... (1)
// function filterToDoById(item) {
//     return item.id !== parseInt(this);
// }

function deleteToDo(event) {
    let li;
    if (event.target.tagName === "BUTTON") {
        li = event.target.parentElement;
    } else {
        li = event.target.parentElement.parentElement;
    }
    li.remove();
    // toDos = toDos.filter(filterToDoById, li.id); ... (1)
    toDos = toDos.filter((item) => item.id !== parseInt(li.id));
    saveToDo();
}

function paintToDo(newToDoObj) {
    toDos.push(newToDoObj);
    const li = document.createElement("li");
    li.id = newToDoObj.id;
    const span = document.createElement("span");
    const btn = document.createElement("button");
    // const icon = document.createElement("i");
    // icon.classList.add("fa-regular", "fa-trash-can");
    span.innerText = newToDoObj.text;
    btn.innerHTML = `<i class="fa-regular fa-trash-can fa-lg"></i>`;

    // btn.appendChild(icon);
    btn.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(btn);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    };
    paintToDo(newToDoObj);
    saveToDo();
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    paintLogIn();
} else {
    paintGreetings(savedUsername);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const saveToDos = localStorage.getItem(TODOS_KEY);

if (saveToDos !== null) {
    const parsedToDos = JSON.parse(saveToDos);
    parsedToDos.forEach(paintToDo);
}
