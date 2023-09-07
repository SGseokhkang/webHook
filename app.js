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

        // "게시자 ID" 값을 가져옵니다.
        const postID = req.body.triggered_by.handle;
        const postFile = req.body.file_name;
        const postContent = req.body.comment;

        // Webhook URL로 데이터 전송
        const webhookUrl = 'https://schat.smilegate.net/hooks/64e477d6892ec40472d71732/rjDH9MFQpPzFsjvQazM5764Co8CW2iQzZfFi6TqpuWud6NAE';
        const postData = {
            text: `게시자 ID : ${postID} 님이 파일명: ${postFile}에 댓글을 남겼습니다.`,
            attachments: [{
                title: postContent,
                title_link: "https://schat.smilegate.net",
                text: postContent, // 이 부분을 원하는 데이터로 수정하세요.
                // image_url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
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

            // handle 값을 출력합니다.
            console.log('handle 값:', handle);
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
