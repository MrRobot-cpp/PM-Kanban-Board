document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtns = document.querySelectorAll(".add-task-btn");
    const searchInput = document.getElementById("search-input");

    addTaskBtns.forEach(button => {
        button.addEventListener("click", () => addTask(button.closest(".column").id));
    });

    searchInput.addEventListener("input", searchTasks);

    document.querySelectorAll(".task-list").forEach(list => {
        list.addEventListener("dragover", allowDrop);
        list.addEventListener("drop", function (event) {
            drop(event, list.closest(".column").id);
        });
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

    function addTask(columnId) {
        const taskList = document.getElementById(columnId).querySelector(".task-list");
        const taskId = "task-" + new Date().getTime();

        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.id = taskId;
        taskCard.draggable = true;
        taskCard.ondragstart = drag;
        taskCard.ondragend = function () {
            this.classList.remove("dragging");
        };

        // Task Title (Editable)
        const taskPara = document.createElement("p");
        taskPara.className = "task-title";
        taskPara.textContent = "New Task";
        taskPara.contentEditable = true;
        taskPara.addEventListener("blur", () => {
            if (taskPara.textContent.trim() === "") {
                taskPara.textContent = "New Task";
            }
        });

        // Priority Selector
        const priority = document.createElement("select");
        priority.className = "task-priority";
        priority.innerHTML = `
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
        `;
        priority.onchange = () => updateTaskVisual(taskCard, priority.value);

        // Due Date Picker
        const dueDate = document.createElement("input");
        dueDate.type = "date";
        dueDate.className = "task-date";

        // Assignee Selector (User Avatars)
        const assignee = document.createElement("select");
        assignee.className = "task-assignee";
        assignee.innerHTML = `
            <option value="user1">👤 User 1</option>
            <option value="user2">👤 User 2</option>
            <option value="user3">👤 User 3</option>
        `;

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "❌";
        deleteBtn.onclick = () => {
            taskCard.remove();
            updateTaskCounts();
        };

        taskCard.appendChild(taskPara);
        taskCard.appendChild(priority);
        taskCard.appendChild(dueDate);
        taskCard.appendChild(assignee);
        taskCard.appendChild(deleteBtn);
        taskList.appendChild(taskCard);

        updateTaskVisual(taskCard, priority.value);
        updateTaskCounts();
    }

    function updateTaskVisual(taskCard, priority) {
        taskCard.classList.remove("priority-low", "priority-medium", "priority-high");
        taskCard.classList.add(`priority-${priority}`);
    }

    function updateTaskCounts() {
        document.querySelectorAll(".column").forEach(column => {
            const taskCount = column.querySelector(".task-list").children.length;
            column.querySelector(".task-count").textContent = taskCount;
        });
    }

    function searchTasks() {
        const searchText = searchInput.value.toLowerCase();
        document.querySelectorAll(".task-card").forEach(task => {
            const taskText = task.querySelector(".task-title").textContent.toLowerCase();
            task.style.display = taskText.includes(searchText) ? "block" : "none";
        });
    }
});
