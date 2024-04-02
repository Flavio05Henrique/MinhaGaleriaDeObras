"use strict";
const showMessageContainer = document.querySelector('[data="showMessage__container"]');
let messageToClose;
const showMessageError = (title, message) => {
    createMessage(title, message, 'error');
};
const showMessageSuccess = (title, message) => {
    createMessage(title, message, 'success');
};
const createMessage = (title, message, type) => {
    if (messageToClose) {
        clearTimeout(messageToClose);
    }
    const messageCard = `
        <div class="showMessage__message showMessage__message--${type} showMessage__animation">
            <h3 class="showMessage__title">${title}</h3>
            <p class="showMessage__text">${message}</p>
        </div>
    `;
    showMessage(messageCard);
};
const showMessage = (messageCard) => {
    showMessageContainer.innerHTML = messageCard;
    const ref = setTimeout(() => closeMessage(), 3000);
    messageToClose = ref;
};
const closeMessage = () => {
    const message = showMessageContainer.children[0];
    message.style.opacity = '0';
    setTimeout(() => {
        message.remove();
    }, 1000);
};
