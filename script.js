document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        let remainingTasks = 0;

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            if (task.completed) {
                li.classList.add('completed');
            } else {
                remainingTasks++;
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTask(index));

            const textSpan = document.createElement('span');
            textSpan.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.addEventListener('click', () => deleteTask(index));

            const leftDiv = document.createElement('div');
            leftDiv.appendChild(checkbox);
            leftDiv.appendChild(textSpan);

            li.appendChild(leftDiv);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });

        taskCount.textContent = remainingTasks;
        saveTasks();
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function clearCompleted() {
        tasks = tasks.filter(task => !task.completed);
        renderTasks();
    }

    addBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);

    // Initial render
    renderTasks();
});