document.addEventListener('DOMContentLoaded', () => {
    // select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        //to get the input value
        const taskText = taskInput.value.trim();
        
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
        };

        // append the remove button to the list item
        li.appendChild(removeBtn);

        //add new task to the task list
        taskList.appendChild(li);

        //clear the input field
        taskInput.value = "";
    }

    addButton.addEventListener('click', addTask);

    // add event listener to the input field for "ENter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
