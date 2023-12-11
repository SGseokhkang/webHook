const fetch = require('node-fetch');

exports.manitoBot = async (req, res) => {
    const WEBHOOK_URL = 'https://schat.smilegate.net/hooks/6572bc5a8c41792fdaf04855/XXitQ8me2SazHeDz9EyzkwojtuFgE8QvPBNXnGPp4YSJpWzZ';

    const payload = {
        text: "마니또 테스트"
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
