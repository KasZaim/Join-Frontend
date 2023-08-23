/**
 * HTML for detailed information of clicked task
 * @param {array} tasks - all saved tasks
 * @param {number} shownTaskID - ID of clicked task
 * @param {array} topics - all saved task categories
 * @returns {string} - HTML markup for the detailed task information
 */
function detailedTaskHTML() {
    return `
    <div class="popup-task f-column p-relative" onclick="stopPropagation(event)">
        <img class="back-btn pointer back-btn-none" src="../assets/icons/plus_blue.png" onclick="closePopupWindow()">
        <img src="../assets/icons/back_arrow.png" class="back-arrow-responsive-popup" onclick="closePopupWindow()">
        <div class="edit-and-delete-box d-flex">
            <img class="delete-btn pointer" src="../assets/icons/delete.png" onclick="deleteShownTask(${shownTaskID})">
            <img class="edit-btn pointer" src="../assets/icons/pencil_white.png" onclick="editDetailedTask(${shownTaskID})">
        </div>
        <span class="task-category popup-category" 
            style="background-color: ${topics[tasks[shownTaskID]['topic']]['color']}">
            ${topics[tasks[shownTaskID]['topic']]['name']}</span>
        <h2 class="popup-headline">${tasks[shownTaskID]['headline']}</h2>
        <span class="popup-span">${tasks[shownTaskID]['description']}</span>
        <span class="popup-span"><b>Due date:</b>${tasks[shownTaskID]['date']}</span>
        <div class="popup-span" style="display:flex; align-items:center">
            <span><b>Priority:</b></span>
            <span class="task-category popup-prio" style="background-color: ${currentPrioColor}">${currentPrio}
                <img src="../assets/icons/prio_${tasks[shownTaskID]['prio']}.png" class="popup-prio-icon img-brightening">
            </span>
        </div>
        <span class="popup-span"><b>Assigned to:</b></span>
        <div id="popupClientSection${shownTaskID}" class="popup-clients-container d-flex">
        </div>
        <span id="popupSubtaskHeadline${shownTaskID}" class="popup-span m-t-5"><b>Subtasks</b></span>
        <div id="popupSubtaskSection${shownTaskID}" class="popup-subtask-container f-column"></div>
    </div>
    `;
}


/**
 * HTML for edit task information of clicked task
 */
function getEditTaskHTML() {
    let task = tasks[shownTaskID];
    let popup = document.getElementById('popupWindow');
    popup.innerHTML = `
    <div class="popup-task f-column p-relative" onclick="stopPropagation(event); closeAllDropdowns()">
        <form class="edit-task-form w-100" onsubmit="saveEditedTaskInformation(${shownTaskID}); return false">
            <img class="back-btn pointer back-btn-popup back-btn-none" src="../assets/icons/plus_blue.png" onclick="stopPropagation(event); closePopupWindow(); clearVariables()">
            <div class="popup-text-boxes">
                <h4 class="addTask-form-headlines">Title</h4>
                <input id="editTaskTitle" placeholder="Enter a title" maxlength="40" value="${task['headline']}" required>
            </div>
            <div class="popup-text-boxes">
                <h4 class="addTask-form-headlines">Description</h4>
                <textarea id="editTaskDesc" placeholder="Enter a description" maxlength="200">${task['description']}</textarea>
            </div>
            <div class="popup-text-boxes">
                <h4 class="addTask-form-headlines">Due date</h4>
                <div style="position: relative;">
                    <img class="calendar-icon" src="../assets/icons/calendar.png"></img>
                    <input type="date" class="pointer" id="editTaskDate" placeholder="dd/mm/yyyy" value="${task['date']}" required>
                </div>
            </div>
            <div class="popup-text-boxes p-relative">
                <h4 class="addTask-form-headlines">Prio</h4>
                <div class="addTask-prio-container d-flex f-row a-i-center">
                    <div id="urgent" class="prio f-center pointer prio-small" onclick="addPrioColor('urgent')">
                        <span>Urgent</span>
                        <img id="urgentIcon" src="../assets/icons/prio_urgent.png" class="prio-img prio-img-small">
                    </div>
                    <div id="medium" class="prio f-center pointer prio-small" onclick="addPrioColor('medium')">
                        <span>Medium</span>
                        <img id="mediumIcon" src="../assets/icons/prio_medium.png" class="prio-img prio-img-small">
                    </div>
                    <div id="low" class="prio f-center pointer prio-small" onclick="addPrioColor('low')">
                        <span>Low</span>
                        <img id="lowIcon" src="../assets/icons/prio_low.png" class="prio-img prio-img-small">
                    </div>
                </div>
                <div id="emptyInputPopupPrio" style="position: absolute;" class="pos-3 d-none">
                    <div class="exclamation-box f-center">
                        <img src="../assets/icons/exclamation.png" class="exclamation">
                    </div>
                    <div class="empty-input-popup">Wähle die Priorität.</div>
                </div>
            </div>
            <div id="contactDropdownSection" class="w-100">
                <h4 class="addTask-form-headlines">Assigned to</h4>
                <div id="contactDropdown" class="dropdown pointer" onclick="stopPropagation(event); showSelection('contactsSelection','contactDropdown')">
                    Select contacts to assign
                </div>
                <div class="category-selection" id="contactsSelection" onclick="stopPropagation(event)"></div>
            </div>
            <div id="addedClientsBox" class="d-flex f-wrap"></div>
            <div id="addSubtasksSection">
                <h4 class="addTask-form-headlines">Assigned to</h4>
                <div class="p-relative" onclick="createNewSubtask()">
                    <input type="text" id="subtaskInput" placeholder="Add new subtask">
                    <img class="subtask-plus-icon pointer" src="../assets/icons/plus_blue.png"></img>
                </div>
            </div>
            <div id="newSubtasksBox" class="new-subtask-box f-column editTask-subtask-box"></div>
            <div class="w-100 d-flex j-end">
                <button class="submit-btn pointer ok-btn" type="submit">Ok ✓</button>
            </div>        
        </form>
    </div>
    `;
}