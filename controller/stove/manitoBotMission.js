const fetch = require('node-fetch');

const messages = [
    {
        text: "⭐️⭐️마니또의 미션이 도착했습니다. 오늘 내로 미션을 꼭 수행해주세요⭐️⭐️ 미션 확인하러 가기 👉👉 https://secretsantadesign2023.framer.website/ ",
        attachments: [{
            image_url: "https://i.pinimg.com/originals/5d/3f/79/5d3f79cf77ef318412a20e50ec8afbff.jpg"
        }]
    }
];

let messageIndex = 0; // 현재 메시지 인덱스
let sendCount = 0; // 메시지 전송 횟수 추적
const maxAttempts = 2; // 최대 전송 횟수 (2번으로 설정)

function isValidMessage(message) {
    return typeof message === 'object' && 'text' in message;
}

exports.manitoBotMission = async (req, res) => {
    const WEBHOOK_URL = 'https://schat.smilegate.net/hooks/6572bc5a8c41792fdaf04855/XXitQ8me2SazHeDz9EyzkwojtuFgE8QvPBNXnGPp4YSJpWzZ';

    // 모든 메시지가 전송되었는지 확인
    if (sendCount >= maxAttempts) {
        console.log('All messages have been sent the maximum number of times.');
        res.status(200).send({ message: "All messages have been sent the maximum number of times." });
        return;
    }

    let payload = messages[messageIndex];

    // 유효성 검사
    if (!isValidMessage(payload)) {
        console.error('Invalid message format:', payload);
        res.status(400).send({ message: "Invalid message format" });
        return;
    }

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

    // 다음 메시지 전송을 위한 인덱스 및 카운트 업데이트
    sendCount++;
    messageIndex = (messageIndex + 1) % messages.length;
};
