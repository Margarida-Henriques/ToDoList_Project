
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

    //Create element
    const listItem = document.createElement('li');

    //Creating text
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'taskText'

    //Creating Option Div
    const optionsContainer = document.createElement('div')
    optionsContainer.className = 'optionsContainer'

    //Creating an Done Button
    const doneButton = document.createElement('button')
    doneButton.textContent = '✔'
    doneButton.className = 'doneButton'

    //Creating an Delete Button
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'X'
    deleteButton.className = 'deleteButton'

    // Add elements to the DOM
    listItem.appendChild(taskText);
    listItem.appendChild(optionsContainer);
    optionsContainer.appendChild(doneButton);
    optionsContainer.appendChild(deleteButton);
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

    taskList.querySelectorAll('.taskText').forEach(function (item) {
        tasks.push(item.textContent.trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Load tasks when refreshing page
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(creatTaskElement);
}