
const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskDoneList = document.getElementById('taskDoneList');

loadTasks();

//Verify the input
function addTask() {

    const task = taskInput.value.trim()

    if (task) {
        createTaskElement(task);
        taskInput.value = '';

        saveTasks()
    } else {
        alert("Please enter a task!")
    }

}

//Input Button
addButton.addEventListener('click', addTask)


//Create TO-DO List Tasks 
function createTaskElement(task) {

    //Create element
    const listItem = document.createElement('li');

    //Creating text
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'taskText';

    //Creating Option Div (done / delete)
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'optionsContainer';

    //Creating an Done Button
    const doneButton = document.createElement('button');
    doneButton.textContent = '✔';
    doneButton.className = 'doneButton';

    //Creating an Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';

    // Add elements to the DOM
    listItem.appendChild(taskText);
    listItem.appendChild(optionsContainer);
    optionsContainer.appendChild(doneButton);
    optionsContainer.appendChild(deleteButton);
    taskList.appendChild(listItem);


    //Delete Button clicked on
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(listItem);
        saveTasks();
    })

    //Done Button clicked on
    doneButton.addEventListener('click', function () {
        createDoneTaskElement(listItem.querySelector('.taskText').textContent);

        //Remove from To-Do list
        taskList.removeChild(listItem);
        saveTasks();
    })

}

//Send TO-DO task to DONE list
function createDoneTaskElement(taskText) {

    const doneTask = document.createElement('li');
    doneTask.className = 'doneTask';

    const doneTaskText = document.createElement('span');
    doneTaskText.textContent = taskText;
    doneTask.className = 'doneTaskText';

    doneTask.appendChild(doneTaskText);
    taskDoneList.appendChild(doneTask);

}


//Save to-do and done tasks to Local Storage
function saveTasks() {
    let tasks = [];
    let tasksDone = [];

    taskList.querySelectorAll('.taskText').forEach(function (item) {
        tasks.push(item.textContent.trim());
    });

    taskDoneList.querySelectorAll('.doneTaskText').forEach(function (item) {
        tasksDone.push(item.textContent.trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
}

//Load tasks when refreshing page
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksDone = JSON.parse(localStorage.getItem('tasksDone')) || [];

    tasks.forEach(createTaskElement);
    tasksDone.forEach(createDoneTaskElement);
}