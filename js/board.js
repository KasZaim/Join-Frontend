/**
 * loads tasks from server
 */
// async function loadTasks() {
//     try {
//         tasks = JSON.parse(await getItem('tasks'));
//     } catch (e) {
//         console.error('Loading error:', e);
//     }
//     updateTasks();
// }
async function loadTasks() {
    
    try {
        tasks = await getItemFromBackend('tasks');
    } catch (e) {
        console.error('Loading error:', e);
    }
    updateTasks();
}


/**
 * loads task topics from server
 */
async function loadTopics() {
    
    try {
        topics = JSON.parse(await getItem('topics'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * saves tasks on the server
 */
async function setItemTasks(tasks) {
    await setItem('tasks', JSON.stringify(tasks));
}


/**
 * saves task topics on the server
 */
async function setItemTopics(topics) {
    await setItem('topics', JSON.stringify(topics));
}


/**
 * updates every section of the board
 */
function updateTasks() {
    updateTaskSection('toDo');
    updateTaskSection('inProgress');
    updateTaskSection('awaitFeedback');
    updateTaskSection('done');
}


/**
 * filters all the tasks by topics then shows them in the right section on the board
 */
function updateTaskSection(id) {
    let cat = tasks.filter(t => t['category'] == `${id}`);
    document.getElementById(`${id}`).innerHTML = '';
    for (let i = 0; i < cat.length; i++) {
        let taskSection = document.getElementById(`${id}`);
        let task = cat[i];
        getTaskInformationFromArray(task, taskSection);
        checkForSubtasks(task, task['id']);
        showClients(task);
    }
}


/**
 * gets some information from the tasks and shows them in the small task container 
 */
function getTaskInformationFromArray(task, taskSection) {
    
    let topicName = topics[task['topic']]['name'];
    let topicColor = topics[task['topic']]['color'];
    let doneSubtasks = task['subtasks'].filter(s => s.status === true);
    let progress = doneSubtasks.length;
    let subtasksAmount = task['subtasks'].length;
    generateTask(task, taskSection, topicName, topicColor, progress, subtasksAmount);
}


/**
 * shows every assigned client of the task
 */
function showClients(task) {

    let clientSection = document.getElementById(`taskClientSection${task['id']}`);
    let clientsAmount = task['clients'].length;
    let clients = task['clients'];
    
    for (let i = 0; i < clients.length; i++) {
        let clientID = clients[i];
        let index = contacts.findIndex(c => c['ID'] == clientID);
        if (index !== -1) {
            let initials = contacts[index]['initials'];
            let color = contacts[index]['color'];
            changeDesignBasedOnClientsAmount(i, clientSection, clientsAmount, initials, color);
        }
    }
}


/**
 * shows the style of the assigned clients different based on the amount of clients
 */
function changeDesignBasedOnClientsAmount(i, clientSection, clientsAmount, initials, color) {
    if (i < 2) {
        generateAssignedClientHTML(clientSection, initials, color);
        if (i == 1) {
            clientSection.getElementsByTagName('div')[1].classList.add('m-l-negative');
        }
    }
    if (i == 2 && clientsAmount > 3) {
        generateAssignedClientHTML(clientSection, `+${clientsAmount - 2}`, 'black');
        moveClientDivLeft(clientSection);
    }
    if (i == 2 && clientsAmount == 3) {
        generateAssignedClientHTML(clientSection, initials, color);
        moveClientDivLeft(clientSection);
    }
}


/**
 * generates the container for the clients
 */
function generateAssignedClientHTML(clientSection, initials, color) {
    clientSection.innerHTML += `
        <div class="task-client f-center" style="background-color:${color};">${initials}</div>
    `;
}


/**
 * moves the circles to the left for better optic
 */
function moveClientDivLeft(clientSection) {
    clientSection.getElementsByTagName('div')[1].classList.add('m-l-negative');
    clientSection.getElementsByTagName('div')[2].classList.add('m-l-negative');
}


/**
 * saves the task ID from the dragging function
 */
function startDragging(id) {
    // currentDraggedElement = id;
    currentDraggedElement = tasks.findIndex(task => task.id === id);
}


/**
 * allows the element to drop
 */
function allowDrop(event) {
    event.preventDefault();
}


/**
 * saves the new location of the task on the server and updates the tasks after
 */
async function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    await setItemTasks(tasks);
    updateTasks();
}
/**
 * Moves the selected task to the category above it.
 * 
 * @async
 * @param {number} elementId - The ID of the task to be moved.
 */
async function upCategory(elementId) {
    let currentTask = tasks[elementId];
    let currentCategoryIndex = categoriesOrder.indexOf(currentTask.category);
    if (currentCategoryIndex > 0) {
        currentTask.category = categoriesOrder[currentCategoryIndex - 1];
        await setItemTasks(tasks);
        updateTasks(); 
    }
}
/**
 * Moves the selected task to the category below it.
 * 
 * @async
 * @param {number} elementId - The ID of the task to be moved.
 */
async function downCategory(elementId) {
    let currentTask = tasks[elementId];
    let currentCategoryIndex = categoriesOrder.indexOf(currentTask.category);
    if (currentCategoryIndex < categoriesOrder.length - 1) {
        currentTask.category = categoriesOrder[currentCategoryIndex + 1];
        await setItemTasks(tasks);
        updateTasks(); 
    }
}


/**
 * shows a darker color when hovered over the drop container
 */
function showHighlight(id) {
    document.getElementById(id).classList.add('drag-over-highlight');
}


/**
 * removes the hover color from the container
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-over-highlight');
}


/**
 * changes the color of the small icon when hovered
 */
function changeIconColor(id) {
    let img = document.getElementById(id);
    img.src = "../assets/icons/plus_lightblue.png";
}


/**
 * removes the hovered color of the small icon
 */
function removeIconColor(id) {
    let img = document.getElementById(id);
    img.src = "../assets/icons/plus_blue.png";
}


/**
 * shows the progress of the subtasks based on the amount of subtasks
 */
function checkForSubtasks(task, id) {
    let subtasksAmount = task['subtasks'].length;
    let progress = document.getElementById(`progressContainer${id}`);
    if (subtasksAmount == 0) {
        progress.innerHTML = '';
    }
    else {
        progress.style = 'padding-bottom: 20px;'
    }
}


/**
 * shows the filtered tasks in every board section
 */
function filterTasks() {
    showFilteredTasks('toDo');
    showFilteredTasks('inProgress');
    showFilteredTasks('awaitFeedback');
    showFilteredTasks('done');
}


/**
 * filters the tasks by headline and/or description
 */
function showFilteredTasks(id) {
    let searchField = document.getElementById('searchTasks').value.toLowerCase();
    let cat = tasks.filter(t => t['category'] == `${id}`);
    document.getElementById(`${id}`).innerHTML = '';
    for (let i = 0; i < cat.length; i++) {
        let taskSection = document.getElementById(`${id}`);
        let task = cat[i];
        let filterHeadline = task.headline.toLowerCase().includes(searchField);
        let filterDescription = task.description.toLowerCase().includes(searchField);
        let filterTopic = false; 

        filterTopic=showFilteredTasksByTopics(searchField,task)

        if (filterHeadline || filterDescription || filterTopic) {
            getTaskInformationFromArray(task, taskSection);
            checkForSubtasks(task, task['id']);
        }
    }
}


/**
 * filters the tasks by topics and returns a boolean
 */
function showFilteredTasksByTopics(searchField,task) {
    for (let j = 0; j < topics.length; j++) {
        if (topics[j].name.toLowerCase().includes(searchField)) {
            if (task.topic === j) {
                return true; 
            }
        }
    }
    return false; 
}


/**
 * sets the current assigned category
 */
function setAssignment(id) {
    currentAssignment = id;
}