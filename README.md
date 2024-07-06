# TO-DO-List-Application-using-Javascript

## html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WORK TO DO</title>
    <link rel="stylesheet" href="2.css">
</head>
<body>
    <div class="container">
        <h1>WORK TO DO'S</h1>
        <div class="input-group">
            <input type="text" id="titleInput" placeholder="Task Title">
            <input type="text" id="descInput" placeholder="Task Description">
            <input type="date" id="dateInput">
            <button onclick="addTask()">Add Task</button>
        </div>
        <div class="filter-group">
            <button onclick="filterTasks('all')">All</button>
            <button onclick="filterTasks('completed')">Completed</button>
            <button onclick="filterTasks('incomplete')">Incomplete</button>
        </div>
        <ul id="taskList"></ul>
    </div>
    <script src="day4.js"></script>
</body>
</html>
```

## css
```
body {
    font-family: Verdana,Georgia, 'Times New Roman', Times, serif;
    background: #bd1414;
    color: rgb(254, 252, 252);
    padding-top: 150px;
    padding-bottom: 50px;
}

.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 50px;
    background: #000000;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(255, 254, 254, 0.896);
}

h1 {
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
}

form input, form textarea, form button {
    margin: 10px 0;
    padding: 10px;
    border: none;
    border-radius: 4px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: #74cc15;
    margin: 50px 0;
    padding: 50px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
button {
    background: #78bc12;
    color: rgba(255, 255, 255, 0.89);
    cursor: pointer;
}

button:hover {
    background: #62fbc3;
}
```

## js
```
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const titleInput = document.getElementById('titleInput');
    const descInput = document.getElementById('descInput');
    const dateInput = document.getElementById('dateInput');
    const taskTitle = titleInput.value.trim();
    const taskDesc = descInput.value.trim();
    const taskDate = dateInput.value;

    if (taskTitle === '' || taskDesc === '' || taskDate === '') {
        alert('Please enter all task details');
        return;
    }

    const task = {
        id: Date.now(),
        title: taskTitle,
        description: taskDesc,
        dueDate: taskDate,
        completed: false
    };

    saveTask(task);
    displayTask(task);

    titleInput.value = '';
    descInput.value = '';
    dateInput.value = '';
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(task => displayTask(task));
}

function displayTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.dataset.id = task.id;

    const title = document.createElement('span');
    title.textContent = `Title: ${task.title}`;

    const desc = document.createElement('span');
    desc.textContent = `Description: ${task.description}`;

    const date = document.createElement('span');
    date.textContent = `Due Date: ${task.dueDate}`;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = toggleTask;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = editTask;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = removeTask;

    actions.appendChild(checkbox);
    actions.appendChild(editButton);
    actions.appendChild(removeButton);

    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(date);
    li.appendChild(actions);

    if (task.completed) {
        li.classList.add('completed');
    }

    taskList.appendChild(li);
}

function removeTask(event) {
    const li = event.target.parentNode.parentNode;
    const taskId = li.dataset.id;
    li.remove();

    let tasks = getTasks();
    tasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(event) {
    const li = event.target.parentNode.parentNode;
    const taskId = li.dataset.id;
    const tasks = getTasks();
    const task = tasks.find(task => task.id == taskId);

    const titleInput = document.getElementById('titleInput');
    const descInput = document.getElementById('descInput');
    const dateInput = document.getElementById('dateInput');

    titleInput.value = task.title;
    descInput.value = task.description;
    dateInput.value = task.dueDate;

    removeTask(event);

    titleInput.focus();
}

function toggleTask(event) {
    const li = event.target.parentNode.parentNode;
    const taskId = li.dataset.id;
    const tasks = getTasks();
    const task = tasks.find(task => task.id == taskId);

    task.completed = event.target.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    li.classList.toggle('completed');
}

function filterTasks(filter) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    let tasks = getTasks();

    if (filter === 'completed') {
        tasks = tasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
        tasks = tasks.filter(task => !task.completed);
    }

    tasks.forEach(task => displayTask(task));
}
```

## output
![4](https://github.com/vijay21500269/TO-DO-List-Application-using-Javascript/assets/94381788/e6d3b402-98b8-452c-86db-8c69d9601ed8)

