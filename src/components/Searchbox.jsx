import React, { useState } from 'react';
import { API_BASE_URL } from '../constants';

export default function Searchbox({ inputMessage, setInputMessage, messages, setMessages }) {
    const [apiError, setApiError] = useState('');

    const sendMessage = async () => {
        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentMessage = inputMessage;
        setInputMessage('');
        setApiError('');

        try {
            console.log('Sending request to:', `${API_BASE_URL}`);
            console.log('Request body:', { message: currentMessage });

            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    message: currentMessage
                }),
                mode: 'cors',
            });

            console.log('Response status:', response.status);

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                const botMessage = {
                    id: Date.now() + 1,
                    text: data.response,
                    sender: 'bot',
                    timestamp: new Date(),
                    model: data.model
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                setApiError(data.message || 'Failed to get response from chatbot');
                const errorMessage = {
                    id: Date.now() + 1,
                    text: `API Error: ${data.message || 'Failed to get response'}`,
                    sender: 'bot',
                    timestamp: new Date(),
                    isError: true
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            console.error('Error details:', error);
            let errorMsg = 'Network error occurred';

            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMsg = 'CORS error - API not accessible. Check API CORS settings.';
            } 
            else if (error.message.includes('HTTP')) {
                errorMsg = `Server error: ${error.message}`;
            }

            setApiError(errorMsg);
            const errorMessage = {
                id: Date.now() + 1,
                text: `Error: ${errorMsg}`,
                sender: 'bot',
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #e5e7eb', padding: '16px', zIndex: 1000 }}>
            <div style={{ maxWidth: '896px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message here..."
                        rows="1"
                        style={{ 
                            flex: 1, 
                            padding: '12px 16px', 
                            border: '1px solid #d1d5db', 
                            borderRadius: '8px',
                            fontSize: '14px',
                            resize: 'none',
                            outline: 'none'
                        }}
                    />
                    <button
                        onClick={sendMessage}
                        style={{ 
                            padding: '12px 24px',  
                            color: 'white', 
                            borderRadius: '8px', 
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'blue',
                            cursor: 'pointer',
                        }}>
                        <span>Send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}