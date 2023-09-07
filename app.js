const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

let latestComment = "No comments yet.";
let latestWebhookData = {};  // 웹훅 데이터를 저장하기 위한 변수

// 웹훅 엔드포인트 설정
app.post('/', (req, res) => {
    const passcode = req.headers['x-figma-passcode'];

    if (passcode === 'ppool12345') {  // 설정한 passcode와 일치하는지 확인
        console.log('Received Figma event:', req.body);
        latestWebhookData = req.body;  // 웹훅 데이터 저장

        if (req.body && req.body.comment) {
            // 코멘트를 하나의 문자열로 합칩니다.
            latestComment = req.body.comment.map(item => item.text || `[Mention: ${item.mention}]`).join(' ');
        } else {
            latestComment = "No comment data found.";
        }

        res.status(200).send('OK');
    } else {
        res.status(401).send('Unauthorized');
    }
});

// 최신 웹훅 데이터를 가져오는 엔드포인트
app.get('/latest-webhook-data', (req, res) => {
    res.json(latestWebhookData);
});

// 웹 페이지 라우팅
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
