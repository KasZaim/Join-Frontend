/**
 * gets all information from the server, shows mainpage, loads current date and refreshes the summary
 */
async function initialize() {
    await includeHTML();
    await loadTopics();
    await loadTasks();
    await showContactsFirstLetters();
    loadDate();
    getTaskNumbers();
    showMainpage();
}


/**
 * gets all HTML pages and links them
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * changes the site to the mainpage
 */
function showMainpage() {
    changeSite(SUMMARY_ID);
    addBackgroundColorForMainPages('summarySidebar');
}


/**
 * changes the site, shows some effects and resets some variables
 * @param {number} id - ID of the page you want to go to
 */
function changeSite(id) {
    let pageToShow = document.getElementById(id);
    let currentShownPage = document.getElementById(currentPage);
    currentShownPage.classList.add('d-none');
    pageToShow.classList.remove('d-none');
    previousPage = currentPage;
    currentPage = id;
    currentAssignedClients = [];
    addTaskSideCreateContact = false;
    updateTasks();
    clearSearchField();
    deleteBackgroundColors();
    getTaskNumbers();
}


/**
 * changes the site to the add new task site and generates the dropdowns
 */
function changeToAddTaskSite(id) {
    changeSite(id);
    showAddTaskSite();
    generateTaskCategories();
    generateContacts();
}


/**
 * shows a popup for the logout
 */
function showLogoutPopup() {
    let popup = document.getElementById('logoutPopup');
    if (popup.classList.contains('d-none')) {
        popup.classList.remove('d-none');
        if (mediaQuery.matches) {
            let newContactBtn = document.getElementById('createContactBtn');
            newContactBtn.classList.add('d-none');
        }
    } else {
        closeLogoutPopup();
    }
}


/**
 * closes the logout popup
 */
function closeLogoutPopup() {
    let popup = document.getElementById('logoutPopup');
    popup.classList.add('d-none');
    if (mediaQuery.matches && !onContactCard) {
        let newContactBtn = document.getElementById('createContactBtn');
        newContactBtn.classList.remove('d-none');
    }
}


/**
 * prevents a element in the background not to trigger 
 */
function stopPropagation(event) {
    event.stopPropagation();
}


/**
 * adds background to sidebar element you go to (only for the sites you cant go back)
 */
function addBackgroundColorForMainPages(id) {
    document.getElementById(`${id}`).classList.add('backgroundSidebar');
    previousBackground = id;
}


/**
 * adds background to sidebar element you go to (for the sites you can go back)
 */
function addBackgroundColorForSpecialPages(id) {
    document.getElementById(`${id}`).classList.add('backgroundSidebar');
}


/**
 * searches for all elements with class .bgdHover then remove the background from each one of this classes
 */
function deleteBackgroundColors() {
    const background = document.querySelectorAll('.bgdHover');
    for (let i = 0; i < background.length; i++) {
        background[i].classList.remove('backgroundSidebar');
    }
}


/**
 * creates a random color and pushes it to a variable
 */
function createRandomColor() {
    currentPickedColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    randomContactColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
}


/**
 * shows the current date
 */
// function showCurrentDate(id) {
//     document.getElementById(id).value = new Date().toLocaleDateString('en-GB');
// }


/**
 * sets the focus on the clicked input field
 */
function getFocusOnInputField(id) {
    let input = document.getElementById(`${id}`);
    input.focus();
    input.select();
}


/**
 * resets variables 
 */
function clearVariables() {
    currentCat = '';
    currentPrio = '';
    currentAssignedClients = [];
    currentSubtasks = [];
    fieldsFilledCorrectly = false;
}


/**
 * clears the search field
 */
function clearSearchField() {
    document.getElementById('searchTasks').value = '';
}


/**
 * fades in a popup with dark background, inserts the content
 * @param {*template} - content to show
 */
function fadeInPopupWindow(template) {
    let popupWindow = document.getElementById('popupWindow');
    popupWindow.classList.remove('d-none');
    popupWindow.classList.remove('light');
    popupWindow.classList.add('dark');
    popupWindow.innerHTML = template;
}


/**
 * slides in content into a popup window
 * @param {template} template - content to show
 * @param {string} id - ID of the element to slide in the content
 */
function slideInContent(template, id) {
    fadeInPopupWindow(template);
    let content = document.getElementById(`${id}`);
    content.classList.remove('move-out');
    content.classList.add('move-in');
}

/**
 * if the popup is a fading one it closes it by fading out, otherwise by sliding out
 */
function closePopupWindow() {
    if (currentPopupStyle == 'fade') {
        let popupWindow = document.getElementById('popupWindow');
        popupWindow.classList.add('light');
        popupWindow.classList.remove('dark');
        popupWindow.innerHTML = '';
        setTimeout(deleteDarkBackground, 325, popupWindow);
    } else {
        slideOutContent();
        inAddTaskPopup = false;
        if (taskSavedInCache) {
            setTimeout(showAddTaskWindow, 350);
            setTimeout(loadTaskCache, 350);
        }
    }
    currentAssignment = 'toDo';
}


/**
 * slides out the content from the popup window
 */
function slideOutContent() {
    let popupWindow = document.getElementById('popupWindow');
    popupWindow.classList.add('light');
    popupWindow.classList.remove('dark');
    let content = document.getElementById(`${popupContentID}`);
    content.classList.remove('move-in');
    content.classList.add('move-out');
    setTimeout(deleteContent, 325, popupWindow);
}


/**
 * deletes the dark background
 */
function deleteDarkBackground(popupWindow) {
    popupWindow.classList.add('d-none');
}


/**
 * deletes the content of the popup window
 * @param {HTMLElement} popupWindow - popup window element
 */
function deleteContent(popupWindow) {
    popupWindow.innerHTML = '';
    deleteDarkBackground(popupWindow);
}


/**
 * shows feedback banner after done action
 */
function showSuccessBanner(text) {
    let banner = document.getElementById('successBanner');
    banner.innerHTML = `${text}`;
    banner.classList.remove('move-down', 'd-none');
    banner.classList.add('move-up');
    setTimeout(function () {
        banner.classList.remove('move-up');
        banner.classList.add('move-down');
    }, 1500);
    setTimeout(function () {
        banner.classList.add('d-none');
    }, 2000);
}


/**
 * shows alert banner when something isnt working
 */
function showFailureBanner(text) {
    let banner = document.getElementById('failureBanner');
    banner.innerHTML = `${text}`;
    banner.classList.remove('light-banner', 'd-none');
    banner.classList.add('dark-banner');
    setTimeout(function () {
        banner.classList.remove('dark-banner');
        banner.classList.add('light-banner');
    }, 2000);
    setTimeout(function () {
        banner.classList.add('d-none');
    }, 2400);
}