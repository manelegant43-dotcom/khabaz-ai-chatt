// Chatt UI Hanterare
class ChatUI {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Fokusera på input fältet
        this.messageInput.focus();
        
        console.log('Khabaz AI Chatt är redo! 🚀');
    }
    
    async sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message) return;
        
        // Lägg till användarens meddelande
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        
        // Visa "skriver..." indikator
        const typingIndicator = this.showTypingIndicator();
        
        try {
            // Få svar från AI:n
            const response = await khabazAI.processMessage(message);
            
            // Ta bort "skriver..." och lägg till AI:s svar
            this.removeTypingIndicator(typingIndicator);
            this.addMessage(response, 'ai');
            
        } catch (error) {
            this.removeTypingIndicator(typingIndicator);
            this.addMessage('Oops! Något gick fel. Försök igen.', 'ai');
            console.error('Chatt fel:', error);
        }
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Scrolla till botten
        this.scrollToBottom();
        
        // Animera in meddelandet
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = 'Skriver...';
        
        typingDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
        
        return typingDiv;
    }
    
    removeTypingIndicator(typingElement) {
        if (typingElement && typingElement.parentNode) {
            typingElement.parentNode.removeChild(typingElement);
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Starta chatt UI när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
    new ChatUI();
});