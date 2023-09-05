const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());  // JSON 파싱 미들웨어 추가
// figd_7QlB2H9m6Tu-PZZXjZSGYAd6bNVcxrqJmALFCWRy

// 웹훅 엔드포인트 설정
app.post('/webhook-ppool', (req, res) => {
  const passcode = req.headers['x-figma-passcode'];

  if (passcode === 'ppool12345') {
    // 웹훅 로직 처리
    console.log('Received Figma event:', req.body);
    res.status(200).send('OK');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// ... (기존의 checkFigmaComments 함수와 setInterval 부분)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
