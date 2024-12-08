import React, { useState } from 'react';
import { getAIResponse } from './openai';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        setLoading(true);

        const aiResponse = await getAIResponse(input);
        const botMessage = { role: 'assistant', content: aiResponse };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center' }}>AI Chat</h1>
            <div style={{
                border: '1px solid #ccc',
                padding: '10px',
                height: '400px',
                overflowY: 'scroll',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
            }}>
                {messages.map((msg, index) => (
                    <div key={index}
                         style={{
                             textAlign: msg.role === 'user' ? 'right' : 'left',
                             margin: '10px 0',
                             color: msg.role === 'user' ? 'blue' : 'green',
                         }}
                    >
                        <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
                    </div>
                ))}
                {loading && <div style={{ textAlign: 'center', color: 'gray' }}>Loading...</div>}
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <button
                    onClick={handleSend}
                    style={{
                        padding: '10px 20px',
                        marginLeft: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default Chat;
