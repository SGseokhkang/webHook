const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// 웹훅 리스너 엔드포인트
app.post('/figma-webhook', (req, res) => {
    // 피그마에서 받은 데이터 확인
    const data = req.body;
    console.log("Received data from Figma:", data);
    console.log("Received data from Figma:", data.content);

    // 특정 이벤트에 따른 처리 (이 예시에서는 모든 이벤트에 반응)
    post_data_to_smilegate(data);

    res.json({status: "success"});
});

function post_data_to_smilegate(data) {
    const url = "https://schat.smilegate.net/hooks/64e477d6892ec40472d71732/rjDH9MFQpPzFsjvQazM5764Co8CW2iQzZfFi6TqpuWud6NAE";
    const json_body = {
        "text": `${data.content}`,
        "attachments": [
            {
                "title": `${data.content}`,
                "title_link": "https://schat.smilegate.net",
                "text": `${data.content}`,
                "image_url": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
                "color": "#764FA5"
            }
        ]
    };

    axios.post(url, json_body)
        .then(response => {
            console.log("Response from Smilegate:", response.data);
        })
        .catch(error => {
            console.error("Error posting to Smilegate:", error);
        });
}

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
