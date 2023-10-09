// IIFE to control scope
(() => {
    let taskArray = [];
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    const addInput = document.querySelector("#add-input");
    const addBtn = document.querySelector("#add-btn");
    const tasks = document.querySelector("#tasks");

    addBtn.addEventListener("click", addTask);

    // If tasks exist in localStorage, load them
    if (taskList && taskList.length > 0) {
        for (task of taskList) {
            updateTasks(task);
        }
    }

    // Function to add new tasks
    function addTask() {
        // Validate a value was passed
        if (addInput.value.length === 0) {
            alert("Please enter a task.");
        } else {
            updateTasks(document.querySelector("#add-task input").value);

            // Clear input field
            addInput.value = "";
        }
    }

    // Function to update tasks
    function updateTasks(task) {
        tasks.innerHTML += `
            <div class="task">
                <span>
                    ${task}
                </span>
                <button class="remove">
                    Remove
                </button>
            </div>
        `;

        const taskBtns = document.querySelectorAll(".remove");
        for (btn of taskBtns) {
            btn.onclick = function() {
                updateLocalStorage(this.parentNode.querySelector("span").innerText, "remove");
                this.parentNode.remove();
            };
        }

        updateLocalStorage(task, "add");
    }

    // Function to manage localStorage items
    function updateLocalStorage(task, action) {
        switch (action) {
            case "add":
                taskArray.push(task);
                break;
            case "remove":
                taskArray = taskArray.filter(tmpTask => tmpTask !== task);
                break;
        }

        if (taskArray.length === 0) {
            localStorage.removeItem("tasks");
        } else {
            localStorage.setItem("tasks", JSON.stringify(taskArray));
        }
    }
})();