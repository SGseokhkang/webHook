const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

let latestComment = "아직 댓글이 없습니다.";
let latestLibraryData = {};  // 웹훅 데이터를 저장하기 위한 변수
let latestWebhookData = {};  // 웹훅 데이터를 저장하기 위한 변수

// 웹훅 라이브러리
app.post('/webhook-library', (req, res) => {
    console.log('Figma 이벤트를 받았습니다:', req.body);
    latestLibraryData = req.body;  // 웹훅 데이터 저장
    res.status(200).send('OK');
});

// 웹훅 댓글
app.post('/webhook-ppool', async (req, res) => {
    console.log('Figma 이벤트를 받았습니다:', req.body);
    latestWebhookData = req.body;  // 웹훅 데이터 저장

    if (req.body && req.body.comment) {
        // 코멘트를 하나의 문자열로 합칩니다.
        latestComment = req.body.comment.map(item => item.text || `[Mention: ${item.mention}]`).join(' ');

        // Webhook URL로 데이터 전송
        const webhookUrl = 'https://schat.smilegate.net/hooks/64f9818cac7ea68c73af63d4/bQZNbyma8LabhRGwnzYA3JJRrrJ5YLybkqLMydAHGx5Keynm';
        const postData = {
            text: "마크다운을 활용하여 메시지 내용을 입력하여 보낼 수 있습니다.",
            attachments: [{
                title: "첨부 파일의 타이틀 영역입니다",
                title_link: "https://schat.smilegate.net",
                text: latestComment, // 이 부분을 원하는 데이터로 수정하세요.
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
            console.log('웹훅으로 데이터를 보냈습니다:', response.data);
        } catch (error) {
            console.error('웹훅으로 데이터를 보내는 중 오류가 발생했습니다:', error);
        }
    } else {
        latestComment = "댓글 데이터를 찾을 수 없습니다.";
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
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
