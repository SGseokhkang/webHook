const express = require("express");
const libraryRouter = require("./router/ppool/library");
const ppoolRouter = require("./router/ppool/comment");
const path = require("path");  // <-- 이 부분 추가
const app = express();
const port = 3000;

app.use(express.json());

// 웹 페이지 라우팅
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/webhook-library', libraryRouter);
app.use('/comment-ppool', ppoolRouter);

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
