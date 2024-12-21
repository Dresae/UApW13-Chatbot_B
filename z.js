const chatbotIcon = document.querySelector('.chatbot-icon');
const chatbot = document.querySelector('.chatbot');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-btn');
const chatBody = document.querySelector('.chat-body');
const typingIndicator = document.querySelector('.typing-indicator');
let isOpen = false;

const API_KEY = 'put-the-key-here';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + API_KEY;

// Toggle chatbot
chatbotIcon.addEventListener('click', () => {
    isOpen = !isOpen;
    chatbot.classList.toggle('active');
    if (isOpen) {
        chatbotIcon.style.opacity = '0.5';
        messageInput.focus();
    } else {
        chatbotIcon.style.opacity = '1';
    }
});

// Send message function
async function sendMessage(message) {
    // Add user message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = message;
    chatBody.appendChild(userMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show typing indicator
    typingIndicator.classList.add('active');

    // Prepare HTTP request body
    const requestBody = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts:[{text: message}]
            }]
        })
    }

    try {
        // Fetch bot response
        const response = await fetch(API_URL, requestBody);
        const data = await response.json();
        
        // Hide typing indicator
        typingIndicator.classList.remove('active');

        // Extract and dispay bot's response text
        const apiResponseText = data.candidates[0].content.parts[0].text.trim();
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot-message';
        botMessageDiv.textContent = apiResponseText;

        chatBody.appendChild(botMessageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;


    } catch (error) {
        console.error('Error:', error);
        typingIndicator.classList.remove('active');
        
        // Add error message to chat
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.className = 'message bot-message';
        errorMessageDiv.textContent = 'Sorry, I encountered an error. Please try again.';
        chatBody.appendChild(errorMessageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// Handle send button click
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message);
        messageInput.value = '';
    }
});

// Handle enter key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = messageInput.value.trim();
        if (message) {
            sendMessage(message);
            messageInput.value = '';
        }
    }
});

// Close chatbot when clicking outside
document.addEventListener('click', (e) => {
    if (!chatbot.contains(e.target) && !chatbotIcon.contains(e.target) && isOpen) {
        isOpen = false;
        chatbot.classList.remove('active');
        chatbotIcon.style.opacity = '1';
    }
});