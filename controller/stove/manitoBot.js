const fetch = require('node-fetch');

// 모든 메시지를 객체 형식으로 정의
const messages = [
    {
        text: "안녕하세요!!! 이번 마니또 TF에 새롭게 발령받은 산타마니또입니다!!! 소리질러!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        attachments: [{
            image_url: "https://i.pinimg.com/originals/1c/d1/d8/1cd1d87bbf871f500f7ee7c3ba85b58a.jpg"
        }]
    },
    {
        text: "이번 2023년 마니또 이벤트의 컨셉은... **'데일리 미션 챌린지'** 입니다. 12/13일부터 21일까지 진행되는 데일리 미션을 수행하셔야 합니다. (12/21에는 선물 교환식 예정. 선물은 3만원 이내로 준비해 주세요!) ",
    },
    {
        text: "1. 아래 링크에서 내 마니또를 추첨해 주세요. https://secretsantadesign2023.framer.website/ **마니또 추첨은 반드시 '본인이름' 만 입력해주세요!!!**",
    },
    {
        text: "2. 해당 링크에서 **12/13일부터 매일 오전 10시에 미션 카드가 오픈**됩니다. 카드를 오픈 후, 내 추첨된 대상에게 9일간 미션을 수행해 주세요.",
    },
    {
        text: "**마니또에게 미션 수행을 받은 팀원는 받은 내용을 열심히 이곳 허브방에 사진,영상등으로 인증**해주세요, 인증률이 높을수록,,, 재미있을수록.. 추가 경품이 있을 수 있어요. (인증횟수 체크하고 있어요^^) 그럼, 행운을 빕니다....",
        attachments: [{
            image_url: "https://i.pinimg.com/originals/9a/66/ef/9a66efa4c5c32821de88dac94ad469a6.jpg"
        }]
    },
];

let messageIndex = 0; // 현재 메시지 인덱스

// 유효성 검사 함수
function isValidMessage(message) {
    return typeof message === 'object' && 'text' in message;
}

exports.manitoBot = async (req, res) => {
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
