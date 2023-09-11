const axios = require("axios");

let latestWebhookData = {};

exports.webhookPpool = async (req, res) => {
    console.log('Figma 이벤트를 받았습니다:', req.body);
    latestWebhookData = req.body;

    // PING 이벤트 처리 추가
    if (req.body && req.body.event_type === "PING") {
        console.log('PING 이벤트를 받았습니다.');
        return res.status(200).send('PING OK');
    }

    if (req.body && req.body.comment) {
        const postID = req.body.triggered_by.handle;
        const postFile = req.body.file_name;
        const postContent = req.body.comment.map(item => item.text).join(' ');
        const postFileKey = req.body.file_key;
        const postFileURL = `https://www.figma.com/file/${postFileKey}/${postFile}`

        const webhookUrl = 'https://schat.smilegate.net/hooks/64e477d6892ec40472d71732/rjDH9MFQpPzFsjvQazM5764Co8CW2iQzZfFi6TqpuWud6NAE';
        const postData = {
            text: `${postID} 님이 ${postFile}에 댓글을 남겼습니다.`,
            attachments: [{
                text: `@here @강석환 ${postContent} ${postFileURL}`,
                color: "#111111"
            }]
        };

        try {
            const response = await axios.post(webhookUrl, postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('웹훅으로 데이터를 보냈습니다:', response.data);
        } catch (error) {
            console.error('웹훅으로 데이터를 보내는 중 오류가 발생했습니다:', error);
        }
    } else {
        console.error("댓글 데이터를 찾을 수 없습니다.");
    }

    res.status(200).send('OK');
};

exports.getWebhookData = (req, res) => {
    res.json(latestWebhookData);
};
