document.addEventListener('DOMContentLoaded', () => {
    // select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    
    // Function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again
    }


    // Function to add a new task
    function addTask(taskText, save = true) {
        //if called from UI, get the input value
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }
        
        // check if input field is empty
        if (taskText === "") {
            alert("Please enter a text.");
            return;
        }

        //create a new list for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // append the remove button to the list item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field if added from UI
        if (typeof taskText !== 'undefined' && save) {
            taskInput.value = "";
        }

        //Save to local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks' || '[]'));
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const index = storedTasks.indexOf(taskText);
        if (index > -1) {
            storedTasks.splice(index, 1);
        }
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    addButton.addEventListener('click', () => addTask());

    // add event listener to the input field for "ENter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks(); // Load tasks when the page is loaded
});
