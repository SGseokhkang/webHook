const express = require("express");
const path = require("path");  // <-- 이 부분 추가
const app = express();
const port = 3000;
const cron = require('node-cron');

// 라우터
const libraryRouter = require("./router/ppool/library");
const ppoolRouter = require("./router/ppool/comment");
const stoveWeeklyReport = require("./router/ppool/weeklyWorkReport");
const manitoBot = require("./router/ppool/manitoBot");
const manitoBotMission = require("./router/ppool/manitoBotMission");


app.use(express.json());

// 웹 페이지 라우팅
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/webhook-library', libraryRouter); 
app.use('/comment-ppool', ppoolRouter); 
app.use('/weekly-report', stoveWeeklyReport);
app.use('/manitoBot', manitoBot);
app.use('/manitoBotMission', manitoBotMission);

// 스케줄러 초기화
require('./scheduler');
require('./manito');


app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});

