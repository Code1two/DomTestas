// src/modules/taskFunctions.js

// Check for saved tasks
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to toggle task completion
function toggleTaskCompletion(tasks, id) {
    const index = tasks.findIndex(task => task.id === id);
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
}

// Function to delete task
function deleteTask(tasks, id) {
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1);
    saveTasks(tasks);
}

export default { getTasks, saveTasks, toggleTaskCompletion, deleteTask };
