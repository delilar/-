// app.js

// Получаем элементы из DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Загрузка задач из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTasks);

// Добавление новой задачи
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            text: taskText,
            completed: false
        };

        addTaskToDOM(task);
        saveTask(task);

        taskInput.value = '';
    }
}

// Добавление задачи в DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.classList.toggle('completed', task.completed);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', deleteTask);

    li.appendChild(deleteBtn);
    li.addEventListener('click', toggleTaskCompletion);
    taskList.appendChild(li);
}

// Переключение состояния выполнения задачи
function toggleTaskCompletion(e) {
    const li = e.target;
    li.classList.toggle('completed');
    updateTask(li.textContent, li.classList.contains('completed'));
}

// Удаление задачи
function deleteTask(e) {
    // Получаем родительский элемент (li), который содержит задачу
    const li = e.target.parentElement;

    // Удаляем задачу из localStorage
    removeTask(li.firstChild.textContent);

    // Удаляем задачу из DOM
    li.remove();
}


// Сохранение задачи в localStorage
function saveTask(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Получение задач из localStorage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Загрузка задач из localStorage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(addTaskToDOM);
}

// Обновление задачи в localStorage
function updateTask(taskText, completed) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.map(task => 
        task.text === taskText ? { ...task, completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Удаление задачи из localStorage
function removeTask(taskText) {
    const tasks = getTasksFromLocalStorage();
    const filteredTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}
