let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
const taskBox = document.querySelector('.task-box');
const form = document.querySelector(".todo-form");
const inputText = document.querySelector('#input-text');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function renderTasks() {
    taskBox.innerHTML = '';
    taskArray.forEach((text, index) => {
        const newTask = document.createElement('div');
        newTask.classList.add('tasks');

        const newTaskText = document.createElement('input');
        newTaskText.classList.add('task-text');
        newTaskText.value = text;
        newTaskText.setAttribute('readonly', 'readonly');

        const newEditBtn = document.createElement('button');
        newEditBtn.classList.add('edit');
        newEditBtn.textContent = 'Edit';

        const newDeleteBtn = document.createElement('button');
        newDeleteBtn.classList.add('delete');
        newDeleteBtn.textContent = 'Delete';

        newTask.appendChild(newTaskText);
        newTask.appendChild(newEditBtn);
        newTask.appendChild(newDeleteBtn);

        taskBox.appendChild(newTask);

        newEditBtn.addEventListener('click', () => {
            if (newEditBtn.textContent === 'Edit') {
                newEditBtn.textContent = 'Save';
                newTaskText.removeAttribute('readonly');
                newTaskText.focus();
            } else {
                newEditBtn.textContent = 'Edit';
                newTaskText.setAttribute('readonly', 'readonly');
                taskArray[index] = newTaskText.value;
                saveTasks();
            }
        });

        newDeleteBtn.addEventListener('click', () => {
            taskArray.splice(index, 1);
            saveTasks();
            renderTasks();
        });
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = inputText.value.trim();

    if (text === '') {
        alert('Please write something for the task! 😀');
        return;
    }

    taskArray.push(text);
    saveTasks();
    inputText.value = '';
    renderTasks();
});

renderTasks();
