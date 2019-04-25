
const form = document.querySelector('#task-from');
const taskList = document.querySelector('.collection');
const clarBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listers
loadEventListeners();

function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clarBtn.addEventListener('click', clearTasks);
    //Filter task event
    filter.addEventListener('keyup', filterTasks);
}

//get task from local storage

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}


//Add task

function addTask(e) {

    if (taskInput.value === '') {
        alert('add a task');
    }
    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';

    //create text node and append to li

    li.appendChild(document.createTextNode(taskInput.value));

    //crate new link element

    const link = document.createElement('a');

    //add class to link

    link.className = ('delete-item secondary-content');

    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li

    li.appendChild(link);

    //append li to ul

    taskList.appendChild(li);


    //store in local storage
    storeTaskInLocalStorage(taskInput.value);


    //clear input

    taskInput.value = '';

    e.preventDefault();
}

//store task

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove task

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove();

            //remove from ls

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//remove from local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks

function clearTasks() {
    //taskList.innerHTML = '';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

//clear task from localStorage

function clearTasksFromLocalStorage() {
    localStorage.clear();
}
//filter task

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}