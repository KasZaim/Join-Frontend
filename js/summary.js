/**
 * displays the current date on the webpage and greets the user
 */
function loadDate() {
    let date = document.getElementById('date');
    let currentHour = new Date().getHours() + 1;
    let formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    date.innerHTML = formattedDate;
    greetAccordingToTime(currentHour);
    setUsernameToGreet();
}


/**
 * greets the user based on the current time
 * @param {number} currentHour - the current hour (in 24-hour format)
 */
function greetAccordingToTime(currenthour) {
    if (currenthour > 5 && currenthour <= 12) {
        document.getElementById('greetText').innerHTML = 'Good Morning';
    } if (currenthour > 12 && currenthour <= 18) {
        document.getElementById('greetText').innerHTML = 'Good Afternoon';
    } if (currenthour > 18 && currenthour <= 24) {
        document.getElementById('greetText').innerHTML = 'Good Evening';
    } if (currenthour >= 0 && currenthour <= 5) {
        document.getElementById('greetText').innerHTML = 'Good Night';
    }
}


/**
 * sets the username to greet
 */
function setUsernameToGreet() {
    if (currentUser.length == 0) {
        document.getElementById('userFirstname').innerHTML = 'Dear Guest';
    } else {
        document.getElementById('userFirstname').innerHTML = `${currentUser[0]['name']}`;
    }
}


/**
 * displays the number of tasks in the summary
 */
function getTaskNumbers() {
    
    showTaskNumbers('inProgress', 'tasksInProgressCount');
    showTaskNumbers('awaitFeedback', 'tasksAwaitingFeedbackCount');
    showTaskNumbers('toDo', 'tasksToDoCount');
    showTaskNumbers('done', 'tasksDoneCount');
    showUrgentTasksCount();
    showAllTasksCount();
}


/**
 * displays the number of tasks for a specific category
 * @param {string} category - the category of the tasks
 * @param {string} id - the id of the element to display the count
 */
function showTaskNumbers(category, id) {
    
    let tasksOfSelectedCat = tasks.filter(t => t.category === `${category}`);
    let amount = tasksOfSelectedCat.length;
    document.getElementById(`${id}`).innerHTML = amount;
}


/**
 * displays the number of urgent tasks
 */
function showUrgentTasksCount() {
    let urgentTasks = tasks.filter(u => u.prio === 'urgent');
    document.getElementById('urgentTasksCount').innerHTML = urgentTasks.length;
}


/**
 * displays the number of all tasks
 */
function showAllTasksCount() {
    let allTasks = document.getElementById('allTasksCount');
    allTasks.innerHTML = tasks.length;
}