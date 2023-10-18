const fetch = require('node-fetch');

exports.weeklyReport = async (req, res) => {
    const WEBHOOK_URL = 'https://schat.smilegate.net/hooks/652f5ed5aa06345cc50e5c86/Fiepqgxx9QFMSRpsu5LBxKMc2NbtEt4T5tPfy2KJ6NcNxbKo';

    const payload = {
        text: "주간업무 쓰세요!!!!!!!!!!까먹지말고!!!!!!!!"
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Failed to send the message');
        }

        console.log('Message sent successfully!');
        res.status(200).send({ message: "Message sent successfully!" });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ message: "Error sending message" });
    }
};
