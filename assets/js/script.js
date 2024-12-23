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
        
    async function translatePage(language){
        try{
            const response = await fetch(`assets/lang/${language}.json`);
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const translations = await response.json();
            
            document.querySelectorAll('[data-i18n-key]').forEach(element =>{
                const key = element.getAttribute('data-i18n-key');
                if(translations[key]){
                    if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA'){
                        element.placeholder = translations[key]
                    } else {
                        element.innerHTML = translations[key]
                    }
                }
            });
        } catch (e) {
            console.error('Error loading translations', e)
        }
    }
    const userLanguage = navigator.language || navigator.userLanguage;
    const language = userLanguage.startsWith('en') ? 'en' : 'pt';
    translatePage(language);
});

addTaskButton.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);