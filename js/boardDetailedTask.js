/**
 * runs the functions to show the detailed clicked task
 */
function showDetailedTask(id) {
    resetAddTaskID();
    checkPriority(id);
    getDetailedTaskHTML(id);
    showDetailedAssignedClients(id);
    checkForExistingSubtasks(id);
}


/**
 * gets the prio from the clicked task pushes it into a variable and specifies the color
 */
function checkPriority(id) {
    let prio = tasks[id]['prio'];
    if (prio == 'urgent') {
        currentPrioColor = '#ff3d00';
        currentPrio = prio;
    }
    if (prio == 'medium') {
        currentPrioColor = '#ffa800';
        currentPrio = prio;
    }
    if (prio == 'low') {
        currentPrioColor = '#7ae229';
        currentPrio = prio;
    }
}


/**
 * get some task information, shows the popup window then shows the detailed task HTML
 */
function getDetailedTaskHTML(id) {
    shownTaskID = id;
    currentPopupStyle = 'fade';
    let template = detailedTaskHTML();
    fadeInPopupWindow(template);
}


/**
 * shows a small circle for every assigned client of the detailed task
 */
function showDetailedAssignedClients(id) {
    let task = tasks[id];
    let clients = task['clients'];
    let clientsSection = document.getElementById(`popupClientSection${id}`);
    for (let i = 0; i < clients.length; i++) {
        let clientID = clients[i];
        let id = contacts.findIndex(c => c['ID'] == clientID);
        let initials = contacts[id]['initials'];
        let color = contacts[id]['color'];
        let firstName = contacts[id]['firstname'];
        let lastName = contacts[id]['lastname'];
        clientsSection.innerHTML += `
            <div class="popup-client-box d-flex a-i-center">
                <div class="task-client f-center task-client-big" style="background-color:${color};">${initials}</div>
                <span class="popup-client-span">${firstName} ${lastName}</span>
            </div>
            `;
    }
}


/**
 * gets the subtask and either shows them normal or crossed out if already done
 */
function showDetailedSubtasks(task, id) {
    let subtaskSection = document.getElementById(`popupSubtaskSection${id}`);
    for (let i = 0; i < task['subtasks'].length; i++) {
        let subtask = task['subtasks'][i]['text'];
        let status = task['subtasks'][i]['status'];
        if (status) {
            getCrossedOutSubtaskHTML(subtaskSection, subtask);
        } else {
            getSubtaskHTML(subtaskSection, subtask);
        }
    }
}


/**
 * HTML for open subtasks
 */
function getSubtaskHTML(subtaskSection, subtask) {
    subtaskSection.innerHTML += `
    <div class="d-flex gap-8">
        <span>-</span>
        <span class="popup-subtask-span">${subtask}</span>
    </div>
    `;
}


/**
 * HTML for done subtasks
 */
function getCrossedOutSubtaskHTML(subtaskSection, subtask) {
    subtaskSection.innerHTML += `
    <div class="d-flex gap-8">
        <span class="opa-03">-</span>
        <span class="popup-subtask-span line-through opa-03">${subtask}</span>
    </div>
    `;
}