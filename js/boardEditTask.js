/**
 * runs all function to edit the task
 */
function editDetailedTask(id) {
    
    currentAssignedClients = [];
    currentSubtasks = [];
    currentCat = tasks[id]['topic'];
    currentAssignment = tasks[id]['category'];

    getEditTaskHTML(id);
    addPrioColor(currentPrio);
    
    pushAssignedClientsToArray(tasks[id]['clients']);
    generateContacts();
    pushAttachedSubtasksToArray(tasks[id]['subtasks']);
    renderSubtasks();
}


/**
 * gets all assigned clients for the clicked task and pushes them in an array to edit them easier
 */
function pushAssignedClientsToArray(clients) {
    for (let i = 0; i < clients.length; i++) {
        let contact = clients[i];
        currentAssignedClients.push(contact);
    }
}


/**
 * gets all subtasks for the clicked task and pushes them in an array to edit them easier
 */
function pushAttachedSubtasksToArray(subtasks) {
    for (let i = 0; i < subtasks.length; i++) {
        
        let subtask = subtasks[i];
        currentSubtasks.push(subtask);
    }
}


/**
 * checks the number of subtasks if there is none its hide the subtasks container
 */
function checkForExistingSubtasks(id) {
    let task = tasks[id];
    if (task['subtasks'].length == 0) {
        let subtaskHL = document.getElementById(`popupSubtaskHeadline${id}`);
        subtaskHL.classList.add('d-none');
    }
    else {
        showDetailedSubtasks(task, id);
    }
}


/**
 * deletes the clicked task from the server then closes the window, loads the tasks again and clears variables
 */
async function deleteShownTask(id) {
    
    let task = tasks[id]
    try {
        await setItemInBackend('tasks', null, task.id, 'DELETE');
        
        tasks.splice(id, 1);
        closePopupWindow();
        showSuccessBanner('Task deleted');
        await updateTasksID();
        await loadTasks();
        clearVariables();
    } catch (e) {
        console.error('Deleting error:', e);
    }

}


/**
 * puts the ID´s on the server in the right order after deleting one
 */
async function updateTasksID() {
    try {
        let tasks = JSON.parse(await getItem('tasks'));
        for (let i = 0; i < tasks.length; i++) {
            tasks[i]['id'] = i;
            await setItem('tasks', JSON.stringify(tasks));
        }
    } catch (e) {
        console.error('Refreshing IDs error:', e);
    }
}


/**
 * after checking if the input fields are filled it pushes the edited information to the task
 */
async function saveEditedTaskInformation(id) {
    checkForEmptyFields();
    if (fieldsFilledCorrectly) {
        let title = document.getElementById('editTaskTitle').value;
        let desc = document.getElementById('editTaskDesc').value;
        let date = document.getElementById('editTaskDate').value;
        captureEditedSubtasks()
        await updateTaskInformation(id, title, desc, date);
        clearVariables();
    }
}

/**
 * gets the edited subtask information
 */
function captureEditedSubtasks() {
    currentSubtasks = [];  
    let subtaskInputs = document.querySelectorAll('.subtask-input');  
    subtaskInputs.forEach((input, index) => {
        let subtaskText = input.value;  

        currentSubtasks.push({
            'text': subtaskText,
        });
    });
}


/**
 * gets all information and saves them on the server
 */
async function updateTaskInformation(id, title, desc, date) {

    let task = tasks[id];
    task = {
        'id': task.id,
        'category': currentAssignment,
        'topic': currentCat,
        'headline': title,
        'description': desc,
        'date': date,
        'subtasks': currentSubtasks,
        'clients': currentAssignedClients,
        'prio': currentPrio
    };
    closePopupWindow();
    showSuccessBanner('Task edited');
    await setItemInBackend('tasks', task, task.id, 'PATCH');
    await loadTasks();
}