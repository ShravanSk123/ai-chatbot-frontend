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
        <div style={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            background: '#ffffff',
            borderTop: '1px solid #f0f0f0', 
            padding: '16px', 
            zIndex: 1000 
        }}>
            <div style={{ maxWidth: '768px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Send a message..."
                        rows="1"
                        style={{
                            flex: 1,
                            padding: '12px 16px',
                            border: '1px solid #e5e5e5',
                            borderRadius: '24px',
                            fontSize: '14px',
                            resize: 'none',
                            outline: 'none',
                            fontFamily: 'inherit',
                            backgroundColor: '#fafafa',
                            color: '#1a1a1a',
                            transition: 'border-color 0.2s',
                            maxHeight: '120px'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#d5d5d5'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim()}
                        style={{
                            padding: '10px 20px',
                            color: '#ffffff',
                            borderRadius: '20px',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: inputMessage.trim() ? '#1a1a1a' : '#ddd',
                            cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                            fontSize: '14px',
                            fontWeight: 500,
                            transition: 'background-color 0.2s',
                            minWidth: '60px'
                        }}
                        onMouseEnter={(e) => {
                            if (inputMessage.trim()) e.target.style.backgroundColor = '#333';
                        }}
                        onMouseLeave={(e) => {
                            if (inputMessage.trim()) e.target.style.backgroundColor = '#1a1a1a';
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}>
                            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16257394 C3.34915502,0.9054766 2.40734225,1.01623725 1.77946707,1.4875294 C0.994623095,2.11631406 0.837654326,3.20563968 1.15159189,3.99113264 L3.03521743,10.4321256 C3.03521743,10.5892231 3.19218622,10.7463204 3.50612381,10.7463204 L16.6915026,11.5318074 C16.6915026,11.5318074 17.1624089,11.5318074 17.1624089,12.0030995 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}