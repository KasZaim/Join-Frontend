function firstLetterHTML(letter) {
    return `
    <div id="${letter}" class="f-column width-500">
        <div class="first-letter">${letter}</div>
    </div>
    `;
}


function contactBoxHTML(contact, i) {
    return `
    <div id="contactBox${i}" class="contact-box d-flex a-i-center pointer" onclick="stopPropagation(event); openDetailedContactCard(${i})">
        <div id="contactBoxInitials${i}" class="contact-box-initials f-center" style="background-color:${contact['color']};">
            ${contact['initials']}
        </div>
        <div class="contact-box-name">
            ${contact['firstname']} ${contact['lastname']}<br>
            <a href="mailto:${contact['mail']}">${contact['mail']}</a>
        </div>
    </div>
    `;
}


function openContactTemplate(i) {
    return `
    <div class="d-flex">
        <div id="initialen-${i}" class="initials-big f-center" style="background-color:${contacts[i]['color']};">
            ${contacts[i]['initials']}
        </div>
        <div class="contact-name-big f-center f-column">
            ${contacts[i]['firstname']} ${contacts[i]['lastname']}
            <div class="add-task-btn d-flex j-start a-i-center pointer" onclick="showAddTaskWindow()"> 
                <img src="../assets/icons/plus_lightblue.png">
                <span>Add Task</span> 
            </div>
        </div>
    </div>
    <div class="edit-contact-section d-flex a-i-center">
        Contact Information 
        <span id="editContact" class="edit-contact pointer" onclick="openEditContact(${i})">
            <img src="../assets/icons/pencil_blue.png"> Edit Contact
        </span>
    </div>
    <div class="contact-email f-column">
        <b>Email</b>
        <a href="mailto:${contacts[i]['mail']}">${contacts[i]['mail']}</a>
    </div>
    <div class="contact-phone f-column">
        <b>Phone</b>
        <span>${contacts[i]['phone']}</span>
    </div> 
    <div id="editContactBtnBox" class="edit-and-delete-box d-flex edit-and-delete-box-adjustment">
        <img src="../assets/icons/delete.png" class="delete-btn pointer" 
            onclick="deleteContact(${contacts[i]['ID']})">
        <img src="../assets/icons/pencil_white.png" class="edit-btn pointer" onclick="openEditContact(${i})">
    </div>
    `;
}


function addContactTemplate() {
    return `
    <div id="addContactPopup" class="add-contact-popup" onclick="stopPropagation(event)">
        <div class="add-contact-popup-left">
            <div class="f-column add-contact-headline-container">
                <img src="../assets/images/join.png">
                <div class="add-contact-headline">
                    <span class="add-contact-headline-top">Add Contact</span>
                    <span>Tasks are better with a team!</span>
                </div>
            </div>
        </div>
        <div class="add-contact-popup-right">
            <img src="../assets/icons/close.png" class="close-add-contact-btn pointer" onclick="closePopupWindow()">
            <div class="add-contact-img f-center">
                <img src="../assets/images/initials_default.png" class="mt-100negative add-contact-initials">
            </div>
            <form class="add-contact-form-container f-column j-center" onsubmit="createNewContact(); return false">
                <div class="p-relative">
                    <input required id="createContactFirstname" class="add-contact-form" placeholder="Firstname" type="text">
                    <img src="../assets/icons/person.png" class="input-icon">
                </div>
                <div class="p-relative">
                    <input required id="createContactSurname" class="add-contact-form" placeholder="Lastname" type="text">
                    <img src="../assets/icons/person.png" class="input-icon">
                </div>
                <div class="p-relative">
                    <input required  id="createContactMail" class="add-contact-form" placeholder="Email" type="email">
                    <img src="../assets/icons/mail.png" id="mail-icon" class="input-icon mail-icon-adjustment">
                </div>
                <div class="p-relative">
                    <input required id="createContactPhone" class="add-contact-form" placeholder="Phone" type="number">
                    <img src="../assets/icons/phone.png" class="input-icon input-icon-phone">
                </div>
                <div class="add-btn-container d-flex">
                    <div class="cancel-create-contact-btn d-flex a-i-center pointer" onclick="closePopupWindow()">Cancel</div>
                    <button class="create-contact-btn-popup d-flex a-i-center pointer" type="submit">Create Contact</button>
                </div>
            </form>
        </div>
    </div>
    `;
}

function editContactTemplate(i) {
    return `
    <div id="editContactPopup" class="edit-contact-popup" onclick="stopPropagation(event)">
        <div class="edit-contact-popup-left">
            <div class="f-column edit-contact-headline-container">
                <img src="../assets/images/join.png">
                <span class="edit-contact-headline-top">Edit Contact</span>
            </div>
        </div>
        <div class="edit-contact-popup-right">
            <img src="../assets/icons/close.png" class="close-edit-contact-btn pointer" onclick="closePopupWindow()">
            <div class="edit-contact-img f-center">
                <div class="edit-contact-initials f-center mt-100negative" style="background-color:${contacts[shownContactIndex]['color']};">
                    ${contacts[shownContactIndex]['initials']}
                </div>
            </div>
            <form class="edit-contact-form-container f-column j-center" onsubmit="changeContactsData(${contacts[shownContactIndex]['id']}); return false">
                <div class="p-relative">
                    <input required id="editContactFirstname" class="add-contact-form" placeholder="Firstname" 
                        type="text" value="${contacts[shownContactIndex]['firstname']}">
                    <img src="../assets/icons/person.png" class="input-icon">
                </div>
                <div class="p-relative">
                    <input required id="editContactSurname" class="add-contact-form" placeholder="Lastname"
                        type="text" value="${contacts[shownContactIndex]['lastname']}">
                    <img src="../assets/icons/person.png" class="input-icon">
                </div>
                <div class="p-relative">
                    <input required id="editContactMail" class="add-contact-form" placeholder="Email" 
                        type="email" value="${contacts[shownContactIndex]['mail']}">
                    <img src="../assets/icons/mail.png" class="input-icon mail-icon-adjustment">
                </div>
                <div class="p-relative">
                    <input required id="editContactPhone" class="add-contact-form" placeholder="Phone" 
                        type="number" value="${contacts[shownContactIndex]['phone']}">
                    <img src="../assets/icons/phone.png" class="input-icon input-icon-phone">
                </div>
                <div class="add-btn-container d-flex">
                    <div class="delete-contact-btn d-flex a-i-center pointer" onclick="deleteContact(${[shownContactIndex]})">Delete</div>
                    <button class="edit-contact-btn d-flex a-i-center pointer" type="submit">Save</button>
                </div>
            </form>
        </div>
    </div>
    `;
}