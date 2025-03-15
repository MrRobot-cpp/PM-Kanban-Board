document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search-input").addEventListener("input", searchTasks);
    updateTaskCounts();
});

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
}

function drop(event, columnId) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const taskElement = document.getElementById(taskId);
    const taskList = document.getElementById(columnId).querySelector(".task-list");

    if (taskElement && taskList) {
        taskList.appendChild(taskElement);
        taskElement.classList.remove("dragging");
        updateTaskCounts();
    }
}

// Open Task Modal
function openTaskModal(column) {
    document.getElementById("taskModal").style.display = "block";
    document.getElementById("taskModal").dataset.column = column;
}

// Close Task Modal
function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

// Add Task
function addTask() {
    const columnId = document.getElementById("taskModal").dataset.column;
    const taskList = document.getElementById(columnId).querySelector(".task-list");

    const taskTitle = document.getElementById("task-title").value || "New Task";
    const priority = document.getElementById("task-priority").value;
    const dueDate = document.getElementById("task-date").value || "No Due Date";
    const assignee = document.getElementById("task-assignee").value;

    const taskId = "task-" + new Date().getTime();

    const taskCard = document.createElement("div");
    taskCard.className = `task-card priority-${priority}`;
    taskCard.id = taskId;
    taskCard.draggable = true;
    taskCard.ondragstart = drag;

    taskCard.innerHTML = `
        <p class="task-title">${taskTitle}</p>
        <p class="task-date">${dueDate}</p>
        <p class="task-assignee">${assignee}</p>
        <p class="task-desc">No Description</p>
        <button class="edit-btn" onclick="openEditTaskModal('${taskId}')">✏️ Edit</button>
        <button class="delete-btn" onclick="removeTask('${taskId}')">❌</button>
    `;

    taskList.appendChild(taskCard);
    updateTaskCounts();
    closeTaskModal();
}

// Remove Task
function removeTask(taskId) {
    document.getElementById(taskId).remove();
    updateTaskCounts();
}

// Update Task Counts
function updateTaskCounts() {
    document.querySelectorAll(".column").forEach(column => {
        const taskCount = column.querySelector(".task-list").children.length;
        column.querySelector(".task-count").textContent = taskCount;
    });
}

// Open Edit Task Modal
function openEditTaskModal(taskId) {
    const taskElement = document.getElementById(taskId);

    document.getElementById("edit-task-title").value = taskElement.querySelector(".task-title").textContent;
    document.getElementById("edit-task-date").value = taskElement.querySelector(".task-date").textContent;
    document.getElementById("edit-task-desc").value = taskElement.querySelector(".task-desc").textContent;
    document.getElementById("edit-task-priority").value = getPriorityValue(taskElement);
    document.getElementById("editTaskModal").dataset.taskId = taskId;
    document.getElementById("editTaskModal").style.display = "block";
}

// Get Priority Value from Class Name
function getPriorityValue(taskElement) {
    if (taskElement.classList.contains("priority-high")) return "high";
    if (taskElement.classList.contains("priority-medium")) return "medium";
    return "low";
}

// Save Task Edit
function saveTaskEdit() {
    const taskId = document.getElementById("editTaskModal").dataset.taskId;
    const taskElement = document.getElementById(taskId);

    taskElement.querySelector(".task-title").textContent = document.getElementById("edit-task-title").value;
    taskElement.querySelector(".task-date").textContent = document.getElementById("edit-task-date").value;
    taskElement.querySelector(".task-desc").textContent = document.getElementById("edit-task-desc").value;

    // Update priority class
    const newPriority = document.getElementById("edit-task-priority").value;
    taskElement.classList.remove("priority-low", "priority-medium", "priority-high");
    taskElement.classList.add(`priority-${newPriority}`);

    closeEditTaskModal();
}

// Close Edit Task Modal
function closeEditTaskModal() {
    document.getElementById("editTaskModal").style.display = "none";
}

// ✅ Fixed Search (Only Searches Titles)

function searchTasks() {
    const searchText = document.getElementById("search-input").value.toLowerCase();
    document.querySelectorAll(".task-card").forEach(task => {
        const title = task.querySelector(".task-title").textContent.toLowerCase();
        task.style.display = title.startsWith(searchText) ? "block" : "none";
    });
}
// Check System Preference and Apply Mode
document.addEventListener("DOMContentLoaded", () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("dark-mode");
    }
});

document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Save theme preference
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Load the user's theme preference on page load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}
