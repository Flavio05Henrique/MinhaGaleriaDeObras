"use strict";
const showMessageContainer = document.querySelector('[data="showMessage__container"]');
console.log(showMessageContainer);
const showMessageError = (title, message) => {
    createMessage(title, message, 'error');
};
const showMessageSuccess = (title, message) => {
    createMessage(title, message, 'success');
};
const createMessage = (title, message, type) => {
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
    setTimeout(() => closeMessage(), 3000);
};
const closeMessage = () => {
    const message = showMessageContainer.children[0];
    message.style.opacity = '0';
    setTimeout(() => message.remove(), 1000);
};
