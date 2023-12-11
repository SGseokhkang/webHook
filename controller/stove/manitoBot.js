const fetch = require('node-fetch');

// 메시지 목록 정의
const messages = [
    {
        text: "안녕하세요!!! 이번 마니또 TF에 새롭게 발령받은 산타마니또입니다!!! 소리질러!!!!!!!",
        attachments: [{
            image_url: "https://i.pinimg.com/originals/1c/d1/d8/1cd1d87bbf871f500f7ee7c3ba85b58a.jpg"
        }]
    },
    "이번 2023년 마니또 이벤트의 컨셉은... '데일리 미션 챌린지' 입니다. ",
    "1. 아래 링크에서 내 마니또를 추첨해 주세요. https://secretsantadesign2023.framer.website/ ",
    "2. 해당 링크에서 12/13일부터 매일 오전 10시에 미션 카드가 오픈됩니다. 카드를 오픈 후, 내 마니또에게 미션을 수행해 주세요.",
    "잘 수행하시면,,, 추가 경품이 있을 수 있어요. 그럼, 행운을 빕니다...."
];
let messageIndex = 0; // 현재 메시지 인덱스

exports.manitoBot = async (req, res) => {
    const WEBHOOK_URL = 'https://schat.smilegate.net/hooks/6572bc5a8c41792fdaf04855/XXitQ8me2SazHeDz9EyzkwojtuFgE8QvPBNXnGPp4YSJpWzZ';

    let payload;
    if (typeof messages[messageIndex] === 'object') {
        // 메시지가 객체인 경우 (첫 번째 메시지)
        payload = messages[messageIndex];
    } else {
        // 메시지가 단순 문자열인 경우
        payload = {
            text: messages[messageIndex]
        };
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
            throw new Error('Failed to send the message');
        }

        console.log('Message sent successfully!');
        res.status(200).send({ message: "Message sent successfully!" });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ message: "Error sending message" });
    }
};
