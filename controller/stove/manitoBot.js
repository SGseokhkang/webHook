const fetch = require('node-fetch');

// 메시지 목록 정의
const messages = ["테스트 1", "테스트 2", "테스트 3", "테스트 4", "테스트 5"];
let messageIndex = 0; // 현재 메시지 인덱스

exports.manitoBot = async (req, res) => {
    const WEBHOOK_URL = 'https://schat.smilegate.net/hooks/6572bc5a8c41792fdaf04855/XXitQ8me2SazHeDz9EyzkwojtuFgE8QvPBNXnGPp4YSJpWzZ';

    const payload = {
        text: messages[messageIndex]
    };

    // 다음 메시지를 위한 인덱스 업데이트
    messageIndex = (messageIndex + 1) % messages.length;

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
