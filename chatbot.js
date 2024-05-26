const userForm = document.getElementById('user-form');
const userInput = document.getElementById('user-input');
const apiKey = 'API_KEY';
const loadingIndicator = document.getElementById('loading-indicator');
const chatLog = document.getElementById('chat-log');

userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    disableUserInput();
    const message = userInput.ariaValueMax;
    displayMessage(message, 'user');
    showLoadingIndicator();
    const botResponse = await getBotResponse(message);
    hideLoadingIndicator();
    displayMessage(botResponse, 'bot');
    enableUserInput();
    userInput.value = '';
});

function disableUserInput() {
    userInput.disabled = true;
}

function enableUserInput() {
    userInput.disabled = false;
}

function showLoadingIndicator() {
    loadingIndicator.style.display = 'flex';
}

function hideLoadingIndicator() {
    loadingIndicator.style.display = 'none';
}

async function getBotResponse(userMessage) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json';
        'Authorization': `Bearer ${apiKey}`;
    };
    const data = {
        model: 'gpt-3.5-turbo';
        messages: [
            {role: 'system', content: 'You are a chatbot.'},
            {role: 'user', content: userMessage},
        ],
    };
    const response = await fetch (apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatLog.appendChild(messageElement)
}