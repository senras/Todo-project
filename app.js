//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
  event.preventDefault();
  // //Create todo DIV
  createDiv(todoInput.value);
  //Add todo to local storage
  saveLocalTodos(todoInput.value);
  //Clear Todo Input value
  todoInput.value = '';
}

function deleteCheck(event) {
  const item = event.target;
  //DELETE TODO
  if (item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    //Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }
  //CHECK MARK TODO
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Check if i already have todos
  let todos = checkLocalTodos();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todo) {
  let todos = checkLocalTodos();
  todos.forEach(function (todo) {
    //Crea un div de todo para mostrar los todo guardados en local storage
    createDiv(todo);
  });
}

function removeLocalTodos(todo) {
  let todos = checkLocalTodos();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function createDiv(value) {
  //Create todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //Check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  //Delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add('delete-btn');
  todoDiv.appendChild(deleteButton);
  //Append to list
  todoList.appendChild(todoDiv);
}

function checkLocalTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}
