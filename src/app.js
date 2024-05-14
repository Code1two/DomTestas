//elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const priorityInput = document.getElementById('priority');
const dueDateInput = document.getElementById('due-date');
const tasksList = document.getElementById('tasks');

// Checking for saved
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render existing tasks
renderTasks();

// Event listener for form submission
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const taskName = taskInput.value.trim();
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    // Check if form inputs are not empty
    if (taskName === '' || dueDate === '') {
        alert('Prašome užpildyti visus laukus.');
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        name: taskName,
        priority: priority,
        dueDate: dueDate,
        completed: false
    };

    // Add task to tasks array
    tasks.push(task);

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Render tasks
    renderTasks();

    // Reset form
    taskForm.reset();

    // Close modal
    $('#addTaskModal').modal('hide');
});

//render tasks
function renderTasks() {
    tasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskRow = document.createElement('tr');
        
        const taskNameCell = document.createElement('td');
        const taskNameDiv = document.createElement('div');
        taskNameDiv.textContent = task.name;
        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.checked = task.completed;
        completeCheckbox.addEventListener('change', () => toggleTaskCompletion(task.id));
        completeCheckbox.style.marginRight = '10px';
        taskNameDiv.prepend(completeCheckbox);
        if (task.completed) {
            taskNameDiv.classList.add('completed');
        }

        const priorityCell = document.createElement('td');
        priorityCell.textContent = task.priority;
        priorityCell.classList.add(`${task.priority}-priority`);

        const dueDateCell = document.createElement('td');
        dueDateCell.textContent = task.dueDate;

        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Ištrinti';
        deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        actionsCell.appendChild(deleteButton);

        taskNameCell.appendChild(taskNameDiv);

        taskRow.appendChild(taskNameCell);
        taskRow.appendChild(priorityCell);
        taskRow.appendChild(dueDateCell);
        taskRow.appendChild(actionsCell);

        tasksList.appendChild(taskRow);
    });
}

//to toggle task completion
function toggleTaskCompletion(id) {
    const index = tasks.findIndex(task => task.id === id);
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

//delete task
function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}