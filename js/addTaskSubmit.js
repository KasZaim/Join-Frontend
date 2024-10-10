/**
 * checks the dropdowns and the prio buttons if they are filled and shows a alert popup if not
 */
function checkForEmptyFields() {
    if (currentCat.length == 0 && currentPrio.length == 0) {
        document.getElementById('emptyInputPopupCat').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupCat');
        document.getElementById('emptyInputPopupPrio').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupPrio');
    } else if (currentCat.length == 0) {
        document.getElementById('emptyInputPopupCat').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupCat');
    } else if (currentPrio.length == 0) {
        document.getElementById('emptyInputPopupPrio').classList.remove('d-none');
        setTimeout(removeFillFieldPopup, 2000, 'emptyInputPopupPrio');
    } else {
        fieldsFilledCorrectly = true;
    }
}


/**
 * if the fields are empty it refreshes the function above otherwise it runs the tasks push function
 */
async function getInputsFromForm() {
    checkForEmptyFields();
    if (fieldsFilledCorrectly) {
        let title = document.getElementById('addTask-title-input').value;
        let desc = document.getElementById('addTask-desc-input').value;
        let date = document.getElementById('addTaskDate').value;
        await addTask(title, desc, date);
    }
}


/**
 * pushes the task information to the server, clears the variables afterwards and shows a logo and changes the site to the board
 */
async function addTask(title, desc, date) {
    
    task ={
            'id': tasks.length,
            'category': currentAssignment,
            'topic': currentCat,
            'headline': title,
            'description': desc,
            'date': date,
            'subtasks': currentSubtasks,
            'clients': currentAssignedClients,
            'prio': currentPrio
        };
        tasks.push(task)

    await setItemInBackend('tasks', task);
    clearVariables();
    if (!(currentPage == ADDTASK_ID)) {
        closePopupWindow();
    }
    showSuccessBanner('Task created');
    changeSite(BOARD_ID);
}


/**
 * removes the empty field popup
 */
function removeFillFieldPopup(id) {
    document.getElementById(id).classList.add('d-none');
}


/**
 * positions the empty field popup correct 
 */
function emptyFieldPopupPositioning() {
    let emptyCat = document.getElementById('emptyInputPopupCat');
    let emptyPrio = document.getElementById('emptyInputPopupPrio');
    emptyCat.classList.add('empty-field-popup-repositioning-1');
    emptyPrio.classList.add('empty-field-popup-repositioning-2');
}


/**
 * clear all variables and resets the already given properties of the new task
 */
function clearAddTaskSide() {
    document.getElementById('addedClientsBox').innerHTML = '';
    document.getElementById('contactsSelection').innerHTML = '';
    clearVariables();
    clearDropDownSection();
    clearPrioSection();
    clearSubtaskSection();
    generateTaskCategories();
    generateContacts();
}


/**
 * clears the task category selection and renews it
 */
function clearDropDownSection() {
    let dropdown = document.getElementById('categoryDropdownSection');
    dropdown.innerHTML = '';
    dropdown.innerHTML = getTopicDropdownHTML();
}


/**
 * clears the task prio selection and renews it
 */
function clearPrioSection() {
    let prioSelect = document.getElementById('prioContainer');
    prioSelect.innerHTML = getPrioContainerHTML();
}


/**
 * saves the inputs of the new task the user wants to create when the create contact popup is called
 */
function saveCurrentInput() {
    
    newTaskCache.push(
        {
            'category': currentAssignment,
            'topic': currentCat,
            'headline': document.getElementById('addTask-title-input').value,
            'description': document.getElementById('addTask-desc-input').value,
            'date': document.getElementById('addTaskDate').value,
            'subtasks': currentSubtasks,
            'clients': currentAssignedClients,
            'prio': currentPrio
        }
    );
}


/**
 * loads the task informations again from the cache after create contact popup is closed
 */
function loadTaskCache() {
    let task = newTaskCache[0];
    loadCurrentVariablesFromCache(task);
    showLoadedTaskCache(task);
    resetTaskCache();
}


/**
 * saves variables from loaded task global
 * @param {*string} task - task infos from cache
 */
function loadCurrentVariablesFromCache(task) {
    currentCat = task['topic'];
    currentPrio = task['prio'];
    currentAssignment = task['category'];
}


/**
 * loads the functions to show the presaved task
 * @param {*string} task - task infos from cache
 */
function showLoadedTaskCache(task) {
    showLoadedText(task);
    showLoadedPrioAndCat();
    showLoadedClientsAndSubtasks(task);
}


/**
 * shows the task information in the input fields
 * @param {*string} task - task infos from cache 
 */
function showLoadedText(task) {
    document.getElementById('addTask-title-input').value = task['headline'];
    document.getElementById('addTask-desc-input').value = task['description'];
    document.getElementById('addTaskDate').value = task['date'];
}


/**
 * shows task prio and category if already given
 */
function showLoadedPrioAndCat() {
    if (currentPrio) {
        addPrioColor(`${currentPrio}`);
    } if (currentCat || currentCat === 0) {
        showSelectedCategory(currentCat);
    }
}


/**
 * shows task assigned clients and subtasks if already given
 * @param {*string} task - task infos from cache 
 */
function showLoadedClientsAndSubtasks(task) {
    let contactMenu = document.getElementById('contactsSelection');
    if (task['clients']) {
        contactMenu.innerHTML = createContactInAddTaskHTML();
        pushAssignedClientsToArray(task['clients']);
        generateContacts();
    } if (task['subtasks']) {
        pushAttachedSubtasksToArray(task['subtasks']);
        renderSubtasks();
    }
}


/**
 * resets task cache variables
 */
function resetTaskCache() {
    taskSavedInCache = false;
    newTaskCache = [];
}