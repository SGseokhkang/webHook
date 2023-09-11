const express = require("express");
const libraryRouter = require("./router/library");
const ppoolRouter = require("./router/ppool");
const app = express();
const port = 3000;

app.use(express.json());

// 웹 페이지 라우팅
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/webhook-library', libraryRouter);
app.use('/webhook-ppool', ppoolRouter);

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
