const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

let latestComment = "No comments yet.";
let latestWebhookData = {};  // 웹훅 데이터를 저장하기 위한 변수

// 웹훅 라이브러리
app.post('/webhook-library', (req, res) => {

    console.log('Received Figma event:', req.body);
    latestLibraryData = req.body;  // 웹훅 데이터 저장

    res.status(200).send('OK');

});


// 웹훅 댓글
app.post('/webhook-ppool', async (req, res) => {
    console.log('Received Figma event:', req.body);
    const latestComment = req.body;  // 웹훅 데이터 저장

    if (req.body && req.body.comment) {
        // 코멘트를 하나의 문자열로 합칩니다.
        latestComment = req.body.comment.map(item => item.text || `[Mention: ${item.mention}]`).join(' ');
    } else {
        latestComment = "No comment data found.";
    }

    // Webhook URL로 데이터 전송
    const webhookUrl = 'https://schat.smilegate.net/hooks/64f9818cac7ea68c73af63d4/bQZNbyma8LabhRGwnzYA3JJRrrJ5YLybkqLMydAHGx5Keynm';
    const postData = {
        text: "markdown을 활용하여 메시지 내용 입력하여 보낼 수 있습니다.",
        attachments: [{
            title: "첨부 파일의 타이틀 영역입니다",
            title_link: "https://schat.smilegate.net",
            text: latestComment, // Modify this to send the `latestComment` or any other data you wish.
            image_url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            color: "#764FA5"
        }]
    };

    try {
        const response = await axios.post(webhookUrl, postData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Sent data to webhook:', response.data);
    } catch (error) {
        console.error('Error sending data to webhook:', error);
    }

    res.status(200).send('OK');
});

// 최신 웹훅 데이터를 가져오는 엔드포인트
app.get('/webhook', (req, res) => {
    res.json(latestWebhookData);
});

app.get('/webhook-library', (req, res) => {
    res.json(latestLibraryData);
});

// 웹 페이지 라우팅
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
