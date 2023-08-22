/**
 * gets the add task template, shows it, makes some css adjustments
 */
function showAddTaskSite() {
    let addTaskSite = document.getElementById('addTaskSite');
    addTaskSite.innerHTML = getAddTaskHTML();
    let popupContainer = document.getElementById('popupContainer');
    popupContainer.classList.add('add-task-adjustment');
    let backButton = document.getElementById('popupContainerBackButton');
    backButton.classList.add('d-none');
    addTaskSideCreateContact = true;
    clearVariables();
}


/**
 * shows the popup window for adding a new task, generates all informations and effects
 */
function showAddTaskWindow() {
    resetAddTaskID();
    currentPopupStyle = 'slide';
    popupContentID = 'popupContainer'
    let template = getAddTaskHTML();

    slideInContent(template, popupContentID);
    clearVariables();
    generateTaskCategories();
    generateContacts();
    renderSubtasks();
    document.getElementById('commitButtonsBox').style.right = '65px';
    emptyFieldPopupPositioning();
    addTaskSideCreateContact = true;

    inAddTaskPopup = true;
}


/**
 * checks if the current clicked button already contains a color, removes the highlighted icon
 * @param {string} id - ID of the clicked priority button
 */
function addPrioColor(id) {
    let element = document.getElementById(id);
    let target = element.classList.contains(`${id}-highlight`);
    removeIMGBrightening();
    if (target) {
        removePrioHighlight(element, id);
    } else {
        detectCurrentClickedPrio(id);
    }
}


/**
 * removes highlighted Icon from all buttons
 */
function removeIMGBrightening() {
    document.getElementById('urgentIcon').classList.remove('img-brightening');
    document.getElementById('mediumIcon').classList.remove('img-brightening');
    document.getElementById('lowIcon').classList.remove('img-brightening');
}


/**
 * removes color from the highlighted button and resets variables
 * @param {HTMLElement} element - clicked priority button
 * @param {string} id - ID of the clicked priority button
 */
function removePrioHighlight(element, id) {
    element.classList.remove(`${id}-highlight`);
    currentPrio = '';
    // currentPrioImageSource = '';
}


/**
 * detects the right button by the ID
 * @param {string} id - ID of the clicked priority button
 */
function detectCurrentClickedPrio(id) {
    if (id == 'urgent') {
        changePrioProperties(id, 'medium', 'low');
    } if (id == 'medium') {
        changePrioProperties(id, 'urgent', 'low');
    } if (id == 'low') {
        changePrioProperties(id, 'medium', 'urgent');
    }
}


/**
 * adds the color to the clicked priority button and icon and removes it from the others
 * @param {string} shownPrio - ID of the clicked priority button
 * @param {string} hidingPrio1 - ID of the non-clicked priority button
 * @param {string} hidingPrio2 - ID of the non-clicked priority button
 */
function changePrioProperties(shownPrio, hidingPrio1, hidingPrio2) {
    let element = document.getElementById(shownPrio);
    element.classList.add(`${shownPrio}-highlight`);
    document.getElementById(hidingPrio1).classList.remove(`${hidingPrio1}-highlight`);
    document.getElementById(hidingPrio2).classList.remove(`${hidingPrio2}-highlight`);
    let icon = document.getElementById(`${shownPrio}Icon`);
    icon.classList.add('img-brightening');
    currentPrio = shownPrio;
}


/**
 * resets ID of addTask site
 */
function resetAddTaskID() {
    let addTaskSite = document.getElementById('addTaskSite');
    addTaskSite.innerHTML = '';
}


/**
 * shows the options menu if the dropdown is clicked; otherwise, closes the options menu
 * @param {string} select - ID of the current dropdown options
 * @param {string} container - ID of the current dropdown container
 */
function showSelection(select, container) {
    let options = document.getElementById(`${select}`);
    let dropdown = document.getElementById(`${container}`);
    let overflow = document.getElementById('addedClientsBox');
    if (showCheckBoxes) {
        options.style.display = "flex";
        showCheckBoxes = !showCheckBoxes;
        dropdown.classList.add('selection-border-align');
        overflow.classList.add('hide-dropdown-overflow');
    } else {
        closeAllDropdowns();
    }
}


/**
 * closes all dropdowns
 */
function closeAllDropdowns() {
    let closeOptions = document.querySelectorAll('.category-selection');
    let overflow = document.getElementById('addedClientsBox');
    for (let i = 0; i < closeOptions.length; i++) {
        closeDropdown(closeOptions, i);
    }
    showCheckBoxes = !showCheckBoxes;
    overflow.classList.remove('hide-dropdown-overflow');
}


/**
 * closes one specific dropdown
 */
function closeDropdown(closeOptions, i) {
    let removeBorder = document.querySelectorAll('.dropdown');
    closeOptions[i].style.display = "none";
    removeBorder[i].classList.remove('selection-border-align');
}


/**
 * generates the categories in the hidden category options menu
 */
function generateTaskCategories() {
    let select = document.getElementById('categorySelection');
    for (let i = 0; i < topics.length; i++) {
        let cat = topics[i]['name'];
        let color = topics[i]['color'];
        select.innerHTML += taskCategoryHTML(i, cat, color);
    }
}


/**
 * shows the clicked category in the input field with its color
 * @param {number} i - ID of the clicked category
 */
function showSelectedCategory(i) {
    let container = document.getElementById('categoryDropdown');
    let cat = topics[i]['name'];
    let color = topics[i]['color'];
    container.innerHTML = selectedCategoryHTML(cat, color);
    showSelection('categorySelection', 'categoryDropdown');
    currentCat = i;
    currentPickedColor = color;
}


/**
 * generates your contacts in the hidden contact options menu, then shows already assigned contacts 
 */
function generateContacts() {
    let select = document.getElementById('contactsSelection');
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        select.innerHTML += contactHTML(contact);
    }
    showAssignedClients();
}


/**
 * if the checkbox is checked, removes the contact from the current assigned; otherwise, adds the contact
 * @param {number} i - ID of clicked contact
 */
function addOrRemoveClients(i) {
    let checkbox = document.getElementById(`contactCheckbox${i}`);
    if (!checkbox.checked) {
        removeClient(i);
    } else {
        currentAssignedClients.push(i);
        createAssignedClientContainer(i);
    }
}


/**
 * shows a little colored container with initials for every assigned contact
 */
function showAssignedClients() {
    let dropdown = document.getElementById('addedClientsBox');
    dropdown.innerHTML = '';
    for (let i = 0; i < currentAssignedClients.length; i++) {
        let assignedClientID = currentAssignedClients[i];
        createAssignedClientContainer(assignedClientID);
        let checkbox = document.getElementById(`contactCheckbox${assignedClientID}`);
        checkbox.checked = true;
    }
}


/**
 * removes the clicked current assigned client container and resets the checkbox
 * @param {number} i - ID of clicked contact
 */
function removeClient(i) {
    let clientID = currentAssignedClients.indexOf(`${i}`);
    currentAssignedClients.splice(clientID, 1);
    let checkbox = document.getElementById(`contactCheckbox${i}`);
    checkbox.checked = false;
    let client = document.getElementById(`addedClient${i}`);
    client.remove();
}


/**
 * HTML for the assigned client container with initials and color
 * @param {number} i - ID of clicked container
 */
function createAssignedClientContainer(i) {
    let dropdown = document.getElementById('addedClientsBox');
    let contact = contacts.filter(c => c['ID'] == `${i}`);
    for (let j = 0; j < contact.length; j++) {
        let element = contact[j];
        dropdown.innerHTML += assignedClientContainerHTML(element, i);
    }
}


/**
 * removes borders from all colors first, then adds a border to the clicked color
 * @param {string} id - ID of picked color
 */
function addBorderToPickedColor(id) {
    const colors = document.querySelectorAll('.dot-hover');
    for (let i = 0; i < colors.length; i++) {
        colors[i].classList.remove('color-dot-bg');
    }
    let pickedColor = document.getElementById(`${id}`);
    pickedColor.classList.add('color-dot-bg');
}


/**
 * gets the clicked color then creates new category, saves it, resets the dropdown and shows the new category 
 */
async function addCategory() {
    checkPickedColor();
    let newCat = document.getElementById('new-cat-input');
    if (newCat.value.length > 1) {
        await pushNewTopic(newCat);
        resetAddCategorySection();
        showNewCreatedTopic(newCat);
    }
}


/**
 * saves the new category on the server
 */
async function pushNewTopic(newCat) {
    topics.push(
        {
            'name': `${newCat.value}`,
            'color': `${currentPickedColor}`
        }
    );
    await setItemTopics(topics);
}


/**
 * resets the HTML for the category dropdown
 */
function resetAddCategorySection() {
    let select = document.getElementById('categoryDropdownSection');
    select.innerHTML = categoryDropdownHTML();
    generateTaskCategories();
    showCheckBoxes = !showCheckBoxes;
}


/**
 * shows the new given category in the input field
 */
function showNewCreatedTopic(newCat) {
    let dropdown = document.getElementById('categoryDropdown');
    dropdown.innerHTML = newGivenCategoryHTML(newCat);
    currentCat = topics.length - 1;
}


/**
 * if no color is chosen it creates a random color
 */
function checkPickedColor() {
    if (currentPickedColor == '') {
        createRandomColor();
    }
}


/**
 * shows all subtasks and checks the boxes if already done
 */
function renderSubtasks() {
    let subtaskBox = document.getElementById('newSubtasksBox');
    subtaskBox.innerHTML = '';
    for (let i = 0; i < currentSubtasks.length; i++) {
        let text = currentSubtasks[i]['text'];
        let status = currentSubtasks[i]['status'];
        checkmark = status ? 'checked' : '';
        subtaskBox.innerHTML += getSubtaskBoxHTML(i, text, checkmark);
    }
}


/**
 * pushes a new subtask in subtask array and clears subtask container
 */
function addSubtask() {
    let input = document.getElementById('subtaskInput');
    if (input.value.length > 1) {
        pushNewSubtask(input);
        clearSubtaskSection();
    }
}


/**
 * adds a new subtask to the array and clears the input
 */
function pushNewSubtask(input) {
    currentSubtasks.push(
        {
            'text': input.value,
            'status': false
        }
    );
    input.value = '';
}


/**
 * if the user presses the "Enter" key on the keyboard it also adds new subtask
 */
function addSubtaskOnEnter() {
    let subtaskInputField = document.getElementById('subtaskInput');
    subtaskInputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addSubtask();
        }
    });
}


/**
 * changes subtask status
 * @param {number} i - Index of the subtask
 */
function changeSubtaskStatus(i) {
    currentSubtasks[i]['status'] = !currentSubtasks[i]['status'];
}