import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAIResponse = async (message) => {
    try {
        await delay(1000);

        const response = await axios.post(
            'https://open.bigmodel.cn/api/paas/v4/chat/completions',
            {
                model: 'glm-4-plus',
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const aiMessage = response.data.choices[0]?.message?.content;
        return aiMessage || 'No response received.';
        
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return 'An error occurred while communicating with the API.';
    }
};
