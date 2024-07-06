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