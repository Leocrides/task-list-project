const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = '';
        taskInput.focus();
        saveTasks();
    }
};

const createTaskElement = taskText => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'task-text';
    taskTextSpan.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.innerHTML = 'Remover';
    removeButton.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(removeButton);

    return taskItem;
};

const saveTasks = () => {
    const tasks = Array.from(document.querySelectorAll('.task-text')).map(task => task.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    const currentPage = window.location.pathname.split('/').pop();

    if (userLanguage.startsWith('en') && currentPage !== 'index-en.html') {
        window.location.href = 'index-en.html';
        return;
    }
});

addTaskButton.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);