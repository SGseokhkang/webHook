const fetch = require('node-fetch');
const cron = require('node-cron');

exports.weeklyReport = async (req, res) => {
    const WEBHOOK_URL = 'https://schat.smilegate.net/hooks/652f5ed5aa06345cc50e5c86/Fiepqgxx9QFMSRpsu5LBxKMc2NbtEt4T5tPfy2KJ6NcNxbKo';

    const sendAutomaticPost = async () => {
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
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // 스케줄러 초기화
    cron.schedule('36 14 * * 3', sendAutomaticPost);
    
    // 요청에 대한 응답 (API 호출 시 바로 응답됨)
    res.status(200).send({ message: "Scheduler initialized" });
};
