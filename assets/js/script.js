const defaultTodos = [
    { text: "do this", completed: false },
    { text: "do that", completed: false },
    { text: "do another", completed: true }
];

const todos = [...(JSON.parse(localStorage.getItem("todos")) || defaultTodos)];

const elements = {
    todoList: document.getElementById("todo-list"),
    todoInput: document.getElementById("todo-input"),
    addButton: document.getElementById("add-todo"),
    resetButton: document.getElementById("reset-todo")
};

///////////////////////////////////////////////////////////////////////////////

function renderTodoList() {
    elements.todoList.innerHTML = null;
    todos.forEach(function (todo, index) {
        const newTodo = document.createElement("li");
        newTodo.className = 'list-group-item'
        newTodo.innerText = todo.text;

        if (todo.completed) {
            newTodo.classList.add("done");
        } else {
            const completeButton = document.createElement("button");
            completeButton.innerText = "mark as complete";
            completeButton.addEventListener("click", function () {
                completeTodo(index);
            });

            newTodo.append(" | ", completeButton);
        }

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "delete";
        deleteButton.addEventListener("click", function () {
            deleteTodo(index);
        });

        newTodo.append(" | ", deleteButton);
        elements.todoList.appendChild(newTodo);
    });
}

function isInputFilled() {
    return elements.todoInput.value.length > 0;
}

function addTodo() {
    if (isInputFilled()) {
        const todoText = elements.todoInput.value;
        todos.push({ text: todoText, completed: false });
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodoList();
        elements.todoInput.value = "";
        elements.todoInput.focus();
    }
}

function completeTodo(index) {
    todos[index].completed = true;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodoList();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodoList();
}

///////////////////////////////////////////////////////////////////////////////

elements.todoInput.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        addTodo();
    }
});

elements.addButton.addEventListener("click", function () {
    addTodo();
});

elements.resetButton.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
});

///////////////////////////////////////////////////////////////////////////////

renderTodoList();
elements.todoInput.focus();