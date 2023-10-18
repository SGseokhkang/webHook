const express = require("express");
const libraryRouter = require("./router/ppool/library");
const ppoolRouter = require("./router/ppool/comment");
const stoveWeeklyReport = require("./router/ppool/weeklyWorkReport");
const path = require("path");  // <-- 이 부분 추가
const app = express();
const port = 3000;
const cron = require('node-cron');

app.use(express.json());

// 웹 페이지 라우팅
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/webhook-library', libraryRouter); 
app.use('/comment-ppool', ppoolRouter); 
app.use('/weekly-report', stoveWeeklyReport);

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
    
    const sendAutomaticPost = () => {
        fetch('http://localhost:' + port + '/weekly-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // 예시 데이터입니다. 필요한 데이터로 변경하시면 됩니다.
            body: JSON.stringify({
                data: 'test data'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    cron.schedule('00 15 * * 4', sendAutomaticPost);

});

