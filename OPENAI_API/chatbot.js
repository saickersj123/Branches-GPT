const chatMessages = document.querySelector('#chat-messages');
const userInput = document.querySelector('#user-input input');
const sendButton = document.querySelector('#user-input button');
const apiKey = 'API 키를 입력하는 란';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions'
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.prepend(messageElement);
}
async function fetchAIResponse(prompt) {

    const requestOptions = {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  
            messages: [{
                role: "user", 
                content: prompt 
            }, ],
            temperature: 0.8, 
            max_tokens: 1024, 
            top_p: 1, 
            frequency_penalty: 0.5, 
            presence_penalty: 0.5, 
            stop: ["Human"], 
        }),
    };
    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        return aiResponse;
    } catch (error) {
		console.error('OpenAI API 호출 중 오류 발생:', error);
        return 'OpenAI API 호출 중 오류 발생';
    }
}

sendButton.addEventListener('click', async () => {

    const message = userInput.value.trim();
    if (message.length === 0) return;
    addMessage('나', message);
    userInput.value = '';
    const aiResponse = await fetchAIResponse(message);
    addMessage('챗봇', aiResponse);
});
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
