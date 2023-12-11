const fetch = require('node-fetch');

// 메시지 목록 정의
const messages = [
    {
        text: "안녕하세요!!! 이번 마니또 TF에 새롭게 발령받은 산타마니또입니다!!! 소리질러!!!!!!!",
        attachments: [{
            image_url: "https://port-0-webhook-6w1j2allyzyvdu.sel5.cloudtype.app/resource/home/welcomeSanta.webp"
        }]
    },
    "이번 2023년 마니또 이벤트의 컨셉은... '데일리 미션 챌린지' 입니다. ",
    "매일 매일 랜덤으로 주어지는 미션카드를 가지고 수행해보세요",
    "ㅁㄴㅇㅁㄴㅇ",
    "테스트 5"
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
