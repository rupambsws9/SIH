const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
const typingStatus = document.getElementById('typing-status');
const userList = document.getElementById('user-list');

let users = [];
let messages = [];
let typing = false;

// Mock user data
users.push({ id: 1, name: 'John Doe' });
users.push({ id: 2, name: 'Jane Doe' });

// Display user list
users.forEach((user) => {
    const userElement = document.createElement('li');
    userElement.innerText = user.name;
    userList.appendChild(userElement);
});

// Send message functionality
sendBtn.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        const message = {
            id: messages.length + 1,
            text: messageText,
            userId: 1, // Current user ID
        };
        messages.push(message);
        displayMessage(message);
        messageInput.value = '';
    }
});

// Typing indicator functionality
messageInput.addEventListener('keydown', () => {
    typing = true;
    updateTypingStatus();
});

messageInput.addEventListener('keyup', () => {
    typing = false;
    updateTypingStatus();
});

function updateTypingStatus() {
    if (typing) {
        typingStatus.innerText = 'Someone is typing...';
    } else {
        typingStatus.innerText = '';
    }
}

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <span>${getMessageAuthor(message.userId).name}:</span>
        <span>${message.text}</span>
    `;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getMessageAuthor(userId) {
    return users.find((user) => user.id === userId);
}