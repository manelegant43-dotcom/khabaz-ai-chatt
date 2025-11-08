// Khabaz AI Knowledge Base - AI:s hjärna
class KhabazAI {
    constructor() {
        this.responses = {
            greetings: {
                patterns: ['hej', 'hallå', 'tjena', 'god dag', 'morn', 'hejsan'],
                responses: [
                    'Hej! Vad kul att höra från dig! 😊',
                    'Hallå där! Hur mår du idag?',
                    'Tjena! Vad kan jag hjälpa dig med?'
                ]
            },
            feelings: {
                patterns: ['mår du', 'hur är det', 'känner du', 'mår', 'känns'],
                responses: [
                    'Jag mår bra tack! Som en AI har jag inga känslor, men jag är full av energi för att hjälpa dig! 💪',
                    'Allt är bra i mitt digitala universum! Hur mår du själv?',
                    'Jag fungerar perfekt! Redo att hjälpa dig med vad du än behöver!'
                ]
            },
            app: {
                patterns: ['app', 'webb', 'webapp', 'pwa', 'mobil', 'telefon'],
                responses: [
                    'Den här appen är byggd som en PWA (Progressive Web App)! Det betyder att du kan installera den på din mobil som en riktig app! 📱',
                    'Kul att du frågar om appen! Den är byggd med HTML, CSS och JavaScript, och kan installeras på både Android och iOS.',
                    'Webbappar som denna kan fungera offline och kännas som en native app - ganska coolt va? 😎'
                ]
            },
            help: {
                patterns: ['hjälp', 'help', 'assistent', 'support', 'hjälpa'],
                responses: [
                    'Jag kan hjälpa dig med många saker! Testa att fråga om teknik, webbutveckling, eller bara säga hej! 🚀',
                    'Jag är här för att svara på dina frågor och hjälpa dig. Vad vill du veta?',
                    'Som din AI-assistent kan jag ge dig information, tips och stöd. Fråga på!'
                ]
            },
            default: [
                'Det var ett intressant påstående! Kan du berätta mer?',
                'Jag förstår! Har du någon specifik fråga?',
                'Intressant! Vill du att jag hjälper dig med något specifikt?',
                'Jag läser vad du skriver. Finns det något särskilt du undrar över?'
            ]
        };
    }

    findResponse(message) {
        const lowerMessage = message.toLowerCase().trim();
        
        // Kolla mot varje kategori
        for (const [category, data] of Object.entries(this.responses)) {
            if (category === 'default') continue;
            
            const hasMatch = data.patterns.some(pattern => 
                lowerMessage.includes(pattern)
            );
            
            if (hasMatch) {
                const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)];
                return randomResponse;
            }
        }
        
        // Default svar om inget matchar
        const randomDefault = this.responses.default[Math.floor(Math.random() * this.responses.default.length)];
        return randomDefault;
    }

    processMessage(message) {
        // Simulera lite "tänkande" tid
        const thinkingTime = Math.random() * 1000 + 500;
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = this.findResponse(message);
                resolve(response);
            }, thinkingTime);
        });
    }
}

// Skapa en global instans av AI:n
const khabazAI = new KhabazAI();
