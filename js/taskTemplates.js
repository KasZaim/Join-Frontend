/**
 * HTML for the small task container
 */
function generateTask(task, taskSection, topicName, topicColor, progress, subtasksAmount) {
    taskSection.innerHTML +=/*html*/`
    <div class="task-parent">
        <div class="task-box f-column pointer" draggable="true" ondragstart="startDragging(${task['id']})" onclick="showDetailedTask(${task['id']})">
            <span class="task-category" style="background-color: ${topicColor}">${topicName}</span>
            <span class="task-headline">${task['headline']}</span>
            <span class="task-description">${task['description']}</span>
            <div id="progressContainer${task['id']}" class="progress-container d-flex a-i-center">
                <div class="progress-box">
                    <div class="progress-bar" style="width:${progress / subtasksAmount * 100}%"></div>
                  </div>
                <span>${progress}/${subtasksAmount} Done</span>
            </div>
            <div class="task-assignment-section d-flex a-i-center">
                <div id="taskClientSection${task['id']}" class="d-flex f-row">
                </div>
                <img src="../assets/icons/prio_${task['prio']}.png" class="task-prio-icon">
            </div>
        </div>
        <div class="switch-category">
            <img src="/assets/icons/up.png" onclick="upCategory(${task['id']})">
            <img src="/assets/icons/down.png" onclick="downCategory(${task['id']})">
        </div>
    </div>
        
    `;
}



/**
 * HTML for the addTask site and popup
 */
function getAddTaskHTML() {
    return `
    <div id="popupContainer" class="popup-container p-relative" onclick="stopPropagation(event); closeLogoutPopup()">
        <img id="popupContainerBackButton" class="back-btn-addTask-popup pointer" src="../assets/icons/plus_blue.png" onclick="closePopupWindow()">
        <div class="spanMainpage d-none">Kanban Project Management Tool</div>
        <h2>Add Task</h2>
        <form class="addTask-form d-flex" onsubmit="getInputsFromForm(); return false" onclick="closeAllDropdowns()">
            <div class="addTask-form-left-container">
                <div>
                    <h4 class="addTask-form-headlines">Title</h4>
                    <input type="text" id="addTask-title-input" placeholder="Enter a title" maxlength="40" required>
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Description</h4>
                    <textarea id="addTask-desc-input" placeholder="Enter a description" maxlength="250" required></textarea>
                </div>
                <div id="categoryDropdownSection" class="category-select" onclick="stopPropagation(event)">
                    <h4 class="addTask-form-headlines">Category</h4>
                    <div id="categoryDropdown" class="dropdown pointer" onclick="showSelection('categorySelection','categoryDropdown')">
                        Select task category
                    </div>
                    <div class="category-selection" id="categorySelection">
                        <label class="addTask-category-label label-hover" onclick="createNewCategoryInAddTask()">
                            <span>Create new category</span>
                        </label>
                    </div>
                </div>
                <div id="contactDropdownSection" onclick="stopPropagation(event)">
                    <h4 class="addTask-form-headlines">Assigned to</h4>
                    <div id="contactDropdown" class="dropdown pointer" onclick="showSelection('contactsSelection','contactDropdown')">
                        Select contacts to assign
                    </div>
                    <div class="category-selection" id="contactsSelection">
                        <label onclick="openCreateContact()" class="label-hover">
                            <span>Create new contact</span>
                            <img src="../assets/icons/add_user.png" class="addTask-new-contact-img">
                        </label>
                    </div>
                    <div id="addedClientsBox" class="added-clients-box d-flex"></div>
                </div>
            </div>
            <div class="addTask-form-right-container">
                <div>
                    <h4 class="addTask-form-headlines">Due date</h4>
                    <div style="position: relative;">
                        <input type="date" class="pointer" id="addTaskDate" placeholder="dd/mm/yyyy" max="2030-01-01" / required>
                    </div>
                </div>
                <div>
                    <h4 class="addTask-form-headlines">Prio</h4>
                    <div id="prioContainer" class="addTask-prio-container d-flex f-row a-i-center" required>
                        <div id="urgent" class="prio f-center pointer" onclick="addPrioColor('urgent')">
                            <span>Urgent</span>
                            <img id="urgentIcon" src="../assets/icons/prio_urgent.png" class="prio-img">
                        </div>
                        <div id="medium" class="prio f-center pointer" onclick="addPrioColor('medium')">
                            <span>Medium</span>
                            <img id="mediumIcon" src="../assets/icons/prio_medium.png" class="prio-img extra">
                        </div>
                        <div id="low" class="prio f-center pointer" onclick="addPrioColor('low')">
                            <span>Low</span>
                            <img id="lowIcon" src="../assets/icons/prio_low.png" class="prio-img">
                        </div>
                    </div>
                </div>
                <div id="addSubtasksSection">
                    <h4 class="addTask-form-headlines">Subtask</h4>
                    <div id="emptyInputPopupPrio" style="position: absolute;" class="pos-1 d-none">
                        <div class="exclamation-box f-center">
                            <img src="../assets/icons/exclamation.png" class="exclamation">
                         </div>
                        <div class="empty-input-popup">Wähle die Priorität.</div>
                    </div>
                    <div style="position: relative;" onclick="createNewSubtask()">
                        <input type="text" id="subtaskInput" placeholder="Add new subtask">
                        <img class="subtask-plus-icon pointer" src="../assets/icons/plus_blue.png"> </img>
                    </div>
                </div>
                <div id="newSubtasksBox" class="new-subtask-box f-column"></div>
            </div>
            <div class="addTask-commit-buttons d-flex j-end" id="commitButtonsBox">
                <button class="addTask-clear-btn" type="reset" onclick="clearAddTaskSide()">Clear x</button>
                <button class="submit-btn pointer" type="submit">Create Task ✓</button>
            </div>
            <div id="emptyInputPopupCat" style="position: absolute;" class="pos-2 d-none">
                <div class="exclamation-box f-center">
                    <img src="../assets/icons/exclamation.png" class="exclamation">
                </div>
                <div class="empty-input-popup">Wähle eine Kategorie.</div>
            </div>
        </form>
    </div>
    `;
}


/**
 * HTML for the category dropdown options menu
 */
function getTopicDropdownHTML() {
    return `
    <h4 class="addTask-form-headlines">Category</h4>
    <div id="categoryDropdown" class="dropdown pointer" onclick="showSelection('categorySelection','categoryDropdown')">
        Select task category
    </div>
    <div class="category-selection" id="categorySelection">
        <label class="addTask-category-label label-hover" onclick="createNewCategoryInAddTask()">
            <span>Create new category</span>
        </label>
    </div>
    `;
}


/**
 * HTML for the chosen category
 * @param {*} cat - the chosen category
 * @param {*} color - the color of the category
 */
function selectedCategoryHTML(cat, color) {
    return `
    <div style="display:flex; align-items:center;">
        <span>${cat}</span>
        <div class="addTask-category-dot" style="background-color:${color};"></div>
    </div>
    `;
}


/**
 * changes the category input field to add a new category, shows a color selection to assign a color
 */
function createNewCategoryInAddTask() {
    currentCat = '';
    let dropdown = document.getElementById('categoryDropdownSection');
    dropdown.innerHTML = `
        <h4 class="addTask-form-headlines">Category</h4>
        <div class="dropdown pointer grey-text d-flex a-i-center">
            <input id="new-cat-input" class="new-cat-input" minvalue="3" maxlength="16" placeholder="New Category Name" required>
            <div class="create-cat-icon-box d-flex a-i-center pointer">
                <img src="../assets/icons/plus_blue.png" class="create-category-icon resize-icon" onclick="resetAddCategorySection()">
                <div class="gap-line"></div>
                <img src="../assets/icons/checkmark.png" class="create-category-icon" onclick="addCategory()">
            </div>
        </div>
        <div class="new-cat-color-select-box d-flex">
            <div id="pickColor1" class="addTask-category-dot dot-hover pointer" style="background-color:red;" 
            onclick="addBorderToPickedColor('pickColor1'); currentPickedColor = 'red'"></div>
            <div id="pickColor2" class="addTask-category-dot dot-hover pointer" style="background-color:orange;" 
            onclick="addBorderToPickedColor('pickColor2'); currentPickedColor = 'orange'"></div>
            <div id="pickColor3" class="addTask-category-dot dot-hover pointer" style="background-color:lightgreen;" 
            onclick="addBorderToPickedColor('pickColor3'); currentPickedColor = 'lightgreen'"></div>
            <div id="pickColor4" class="addTask-category-dot dot-hover pointer" style="background-color:lightblue;" 
            onclick="addBorderToPickedColor('pickColor4'); currentPickedColor = 'lightblue'"></div>
            <div id="pickColor5" class="addTask-category-dot dot-hover pointer" style="background-color:yellow;" 
            onclick="addBorderToPickedColor('pickColor5'); currentPickedColor = 'yellow'"></div>
            <div id="pickColor6" class="addTask-category-dot dot-hover pointer" style="background-color:aqua;" 
            onclick="addBorderToPickedColor('pickColor6'); currentPickedColor = 'aqua'"></div>
            <div id="pickColor7" class="addTask-category-dot dot-hover pointer" style="background-color:grey;" 
            onclick="addBorderToPickedColor('pickColor7'); currentPickedColor = 'grey'"></div>
        </div>
    `;
}


/**
 * HTML for new category
 */
function newGivenCategoryHTML(newCat) {
    return `
    <div style="display:flex; align-items:center;">
        <span>${newCat.value}</span>
        <div class="addTask-category-dot" style="background-color:${currentPickedColor};"></div>
    </div>
    `;
}


/**
 * HTML to reset the category input
 */
function categoryDropdownHTML() {
    return `
    <h4 class="addTask-form-headlines">Category</h4>
    <div id="categoryDropdown" class="dropdown pointer" onclick="showSelection('categorySelection','categoryDropdown')">
        Select task category
    </div>
    <div class="category-selection" id="categorySelection">
        <label class="addTask-category-label label-hover" onclick="createNewCategoryInAddTask()">
            <span>Create new category</span>
        </label>
    </div>
    `;
}


/**
 * HTML for the prio buttons
 */
function getPrioContainerHTML() {
    return `
    <div id="urgent" class="prio f-center pointer" onclick="addPrioColor('urgent')">
        <span>Urgent</span>
        <img id="urgentIcon" src="../assets/icons/prio_urgent.png" class="prio-img">
    </div>
    <div id="medium" class="prio f-center pointer" onclick="addPrioColor('medium')">
        <span>Medium</span>
        <img id="mediumIcon" src="../assets/icons/prio_medium.png" class="prio-img extra">
    </div>
    <div id="low" class="prio f-center pointer" onclick="addPrioColor('low')">
        <span>Low</span>
        <img id="lowIcon" src="../assets/icons/prio_low.png" class="prio-img">
    </div>
    `;
}


/**
 * HTML for subtasks
 */
function getSubtaskBoxHTML(i, text, checkmark) {
    return `
    <div class="addTask-subtask-container d-flex a-i-center j-start">
        <input id="editTaskSubtask${i}" type="checkbox" class="subtask-checkbox" onclick="changeSubtaskStatus(${i})" ${checkmark}>
        <label class="subtask-text" for="editTaskSubtask${i}">${text}</label>
    </div>
    `;
}


/**
 * changes the input field container to add a new subtask
 */
function createNewSubtask() {
    let container = document.getElementById('addSubtasksSection');
    container.innerHTML = `
        <h4 class="addTask-form-headlines">Assigned to</h4>
        <div class="dropdown pointer grey-text d-flex a-i-center padding-r-15">
            <input type="text" id="subtaskInput" maxlength="32" class="new-cat-input" onkeydown="addSubtaskOnEnter()">
            <div class="create-cat-icon-box d-flex a-i-center pointer">
                <img src="../assets/icons/plus_blue.png" class="create-category-icon resize-icon" onclick="clearSubtaskSection()">
                <div class="gap-line"></div>
                <img src="../assets/icons/checkmark.png" class="create-category-icon" onclick="addSubtask()">
            </div>
        </div>
    `;
    getFocusOnInputField('subtaskInput');
}


/**
 * resets subtask input HTML and shows current subtasks
 */
function clearSubtaskSection() {
    let container = document.getElementById('addSubtasksSection');
    container.innerHTML = `
        <h4 class="addTask-form-headlines">Assigned to</h4>
        <div style="position: relative;" onclick="createNewSubtask()">
            <input type="text" id="subtaskInput" placeholder="Add new subtask">
            <img class="subtask-plus-icon pointer" src="../assets/icons/plus_blue.png"></img>
        </div>
        `;
    renderSubtasks();
}


/**
 * the HTML for creating a new contact in the add task contact selection dropdown menu
 */
function createContactInAddTaskHTML() {
    return `
    <label onclick="openCreateContact()" class="label-hover">
        <span>Create new contact</span>
        <img src="../assets/icons/add_user.png" class="addTask-new-contact-img">
    </label>
    `;
}


/**
 * the HTML for a contact in the add task contact selection dropdown menu
 * @param {*string} contact 
 */
function contactHTML(contact) {
    return `
    <label class="label-hover">
        <span>${contact['firstname']} ${contact['lastname']}</span>
        <input id="contactCheckbox${contact['id']}" type="checkbox" class="checkbox" onclick="addOrRemoveClients(${contact['id']})">
    </label>
    `;
}


/**
 * the HTML for the categories in the add task category selection dropdown
 * @param {*number} i - ID of the category
 * @param {*string} cat - the name of the category
 * @param {*string} color - the color of the category
 */
function taskCategoryHTML(i, cat, color) {
    return `
    <label class="addTask-category-label label-hover" onclick="showSelectedCategory(${i})">
        <span>${cat}</span>
        <div class="addTask-category-dot" style="background-color:${color};"></div>
    </label>
    `;
}


/**
 * the HTML for the assigned clients showcase box of the tasks
 * @param {*string} element - the client
 * @param {*number} i - the ID of the client
 */
function assignedClientContainerHTML(element, i) {
    return `
    <div class="d-flex" onclick="stopPropagation(event)">
        <div id="addedClient${i}" class="task-client f-center task-client-big added-client-style pointer" style="background-color:${element['color']};" 
        onclick="removeClient(${i})">${element['initials']}</div>
    <div>
    `;
}