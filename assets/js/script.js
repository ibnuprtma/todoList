// elements initiation
const elements = {
    todoList: document.getElementById("todo-list"),
    todoInput: document.getElementById("todo-input"),
    addButton: document.getElementById("add-todo")
};

// input validation
function isInputFilled() {
    return elements.todoInput.value.length > 0;
}

// add data function
function addTodo() {
    if (isInputFilled()) {
        const todoText = elements.todoInput.value;
        const newTodoElement = document.createElement("li");
        newTodoElement.className = 'list-group-item'
        newTodoElement.innerText = todoText;

        elements.todoList.appendChild(newTodoElement);
        elements.todoInput.value = "";
        elements.todoInput.focus();
    }
}

// add data with press enterBtn
elements.todoInput.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        addTodo();
    }
});

// add data with click addButton
elements.addButton.addEventListener("click", function () {
    addTodo();
});

// cursor focused
elements.todoInput.focus();