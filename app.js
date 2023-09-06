const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

let latestComment = "No comments yet.";

// 웹훅 로그 가져오기
app.get('/webhook-logs', async (req, res) => {
  try {
    const webhookId = "577584";  // 웹훅 아이디
    const figmaToken = "figd_Do-_y5XpGO6REo9QYHI3rGJ-DFb6EnWkONYnc1HH";  // Figma 토큰
    const response = await axios.get(`https://api.figma.com/v2/webhooks/${webhookId}/requests`, {
      headers: {
        'X-FIGMA-TOKEN': figmaToken,
      },
    });

    const requests = response.data.requests;
    const lastRequest = requests[requests.length - 1];  // 배열의 마지막 요소

    res.json(lastRequest);  // 마지막 요소만 응답으로 보냅니다
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});


// 웹 페이지 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
