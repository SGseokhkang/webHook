const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// // 보안을 위해 노출되면 안 되는 키 값들은 환경 변수나 별도의 설정 파일에서 가져와야 합니다.
// const FIGMA_API_TOKEN = process.env.FIGMA_API_TOKEN || 'YOUR_DEFAULT_FIGMA_API_KEY';
// const FILE_ID = process.env.FILE_ID || 'YOUR_DEFAULT_FILE_ID';
// cloudtype

// 보안을 위해 노출되면 안 되는 키 값들은 환경 변수나 별도의 설정 파일에서 가져와야 합니다.
const FIGMA_API_TOKEN = 'figd_6n2fAdrTNeNqiwtM4RA3wOkGHXmhVxt-pT9O-Z6m';
const FILE_ID = 'O4jSSRxzFAcHRKrSFOSZmh';


axios.defaults.headers.common['Authorization'] = `Bearer ${FIGMA_API_TOKEN}`;

app.post('/figma-webhook', async (req, res) => {
    try {
        const response = await axios.get(`https://api.figma.com/v1/files/${FILE_ID}/comments`);
        const comments = response.data.data.comments;

        for (let comment of comments) {
            console.log(`User: ${comment.user.handle}`);
            console.log(`Comment: ${comment.message}`);
            console.log('-------------------');
            post_data_to_smilegate(comment); // 각 댓글을 Smilegate로 전송
        }

        res.send('Comments fetched and posted!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});

function post_data_to_smilegate(comment) {
    const url = "https://schat.smilegate.net/hooks/64e5a520840cf4465cd881a0/WJTTqdN6s4eo7Q2ekC32WwjoWyWBPwMKX9xTb6wb5LiM5Q58";
    const json_body = {
        "text": `${comment.message}`,
        "attachments": [
            {
                "title": `${comment.message}`,
                "title_link": "https://schat.smilegate.net",
                "text": `testㅇ`,
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
