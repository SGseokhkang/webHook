const fetch = require('node-fetch');

// 첫 번째 텍스트 메시지만 남김
const messages = [
    {
        text: "미션을 수행해주세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        attachments: [{
            image_url: "https://i.pinimg.com/originals/1c/d1/d8/1cd1d87bbf871f500f7ee7c3ba85b58a.jpg"
        }]
    }
];

let messageIndex = 0; // 현재 메시지 인덱스

// 유효성 검사 함수
function isValidMessage(message) {
    return typeof message === 'object' && 'text' in message;
}

exports.manitoBotMission = async (req, res) => {
    const WEBHOOK_URL = 'https://schat.smilegate.net/hooks/6572bc5a8c41792fdaf04855/XXitQ8me2SazHeDz9EyzkwojtuFgE8QvPBNXnGPp4YSJpWzZ';

    // 모든 메시지가 전송되었는지 확인
    if (messageIndex >= messages.length) {
        console.log('All messages have been sent.');
        res.status(200).send({ message: "All messages have been sent." });
        return;
    }

    let payload = messages[messageIndex];

    // 유효성 검사
    if (!isValidMessage(payload)) {
        console.error('Invalid message format:', payload);
        res.status(400).send({ message: "Invalid message format" });
        return;
    }

    // 다음 메시지를 위한 인덱스 업데이트
    messageIndex = (messageIndex + 1) % messages.length;

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Failed to send the message, status: ${response.status}`);
        }

        console.log('Message sent successfully!');
        res.status(200).send({ message: "Message sent successfully!" });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ message: "Error sending message" });
    }
};
