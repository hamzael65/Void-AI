import React, { useState, useEffect } from 'react';
import { getAIResponse } from './openai';
import SiriWave from 'siriwave';
import './style.css'; 

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let siriWave;
        if (loading) {
            siriWave = new SiriWave({
                container: document.getElementById('siri-container'),
                width: 300,
                height: 100,
                style: 'ios9',
            });
            siriWave.start();
        }
        return () => {
            if (siriWave) siriWave.stop();
        };
    }, [loading]);

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
        <div className="chat-container">
            <h1 className="chat-title">AI Chat</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            msg.role === 'user' ? 'chat-message-user' : 'chat-message-ai'
                        }`}
                    >
                        <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
                    </div>
                ))}
                {loading && <div id="siri-container" className="siri-wave" />}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button
                    onClick={handleSend}
                    className="chat-send-button"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default Chat;
