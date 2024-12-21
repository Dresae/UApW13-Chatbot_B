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