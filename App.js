const inputValue = document.querySelector('#inputvalue');
const addBtn = document.querySelector('.add');
const taskList = document.querySelector('.task-lists');

// ---EVENT LISTENERS--- //
addBtn.addEventListener('click' , addItem);
taskList.addEventListener('click', deleteCheck);
document.addEventListener('DOMContentLoaded',getTodos);


// ---FUNCTION DECLARATION--- //
    
function addItem(event){
  event.preventDefault();
  
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('Todos');
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');
  newTodo.innerHTML = `<h2>${inputValue.value}</h2>`;
  todoDiv.appendChild(newTodo);
  // Add todos to localStorage
  saveLocalTodos(inputValue.value);

   // Creating BUTTONS--- //
   
   const completedBtn = document.createElement('button');
   completedBtn.innerHTML = '<i class="fas fa-check"></i>';
   completedBtn.classList.add('done');
   const removeBtn = document.createElement('button');
   removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
   removeBtn.classList.add('remove');
  todoDiv.appendChild(completedBtn);
  todoDiv.appendChild(removeBtn);
  taskList.appendChild(todoDiv);
  inputValue.value = "";
}


function deleteCheck(e){
  const item = e.target;
  if(item.classList[0] === "remove"){
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
      todo.remove();
    })
  }
  if(item.classList[0] === "done"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [ ];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  let todos;

  if(localStorage.getItem("todos") === null){
    todos = [ ];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
  todoDiv.classList.add('Todos');
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');
  newTodo.innerText = todo;
  todoDiv.appendChild(newTodo); 
   const completedBtn = document.createElement('button');
   completedBtn.innerHTML = '<i class="fas fa-check"></i>';
   completedBtn.classList.add('done');
   const removeBtn = document.createElement('button');
   removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
   removeBtn.classList.add('remove');
  todoDiv.appendChild(completedBtn);
  todoDiv.appendChild(removeBtn);
  taskList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [ ];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex) , 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}



  
 


