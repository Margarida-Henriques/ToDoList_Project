
const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

//Verify the input
function addTask() {

    const task = taskInput.value.trim()

    if (task) {
        creatTaskElement(task);
        taskInput.value = '';

        saveTasks()
    } else {
        alert("Please enter a task!")
    }

}

addButton.addEventListener('click', addTask)



function creatTaskElement(task) {

    //Create element with the input information
    const listItem = document.createElement('li');
    listItem.textContent = task;

    //Creating an Delete Button
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.className = 'deleteButton'

    //Adding to the HTML
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    //Delete element clicked on
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(listItem);
        saveTasks()
    })

}

//Create a list and Add to Local Storage
function saveTasks() {
    let tasks = [];

    taskList.querySelectorAll('li').forEach(function (item) {
        tasks.push(item.textContent.replace('Delete', '').trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Load tasks when refreshing page
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(creatTaskElement);
}