const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000;

// Figma 파일 ID와 개인 엑세스 토큰을 설정합니다.
const figmaFileId = "oOsVn88SOLqm7uksrqQo3w";
const personalAccessToken = "figd_Jgkpc3nYhU8lUb91iTr8tVHyiu0vc5qwFaD1S9U6";

async function checkFigmaComments(lastCommentId = null) {
  try {
    // Figma API를 사용하여 코멘트를 불러옵니다.
    const response = await axios.get(`https://api.figma.com/v1/files/${figmaFileId}/comments`, {
      headers: {
        "X-Figma-Token": personalAccessToken,
      },
    });
    const comments = response.data.comments;

    if (comments.length === 0) {
      return;
    }

    // 새로운 코멘트가 있는지 확인합니다.
    const latestComment = comments[0];
    if (latestComment.id !== lastCommentId) {
      console.log("새로운 코멘트 감지:", latestComment.message);
      console.log("새로운 코멘트유저 감지:", latestComment.user);

      const url = "https://schat.smilegate.net/hooks/64e477d6892ec40472d71732/rjDH9MFQpPzFsjvQazM5764Co8CW2iQzZfFi6TqpuWud6NAE";

      const payload = {
          text: `${latestComment.message}`,
          attachments: [
              {
                  title: `[${latestComment.user}]:${latestComment.message}`,
                  title_link: "https://schat.smilegate.net",
                  text: "첨부 파일의 본문 영역입니다. 첨부파일도 추가하여 보낼 수 있습니다.",
                  image_url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
                  color: "#764FA5"
              }
          ]
      };
      
      axios.post(url, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then((response) => {
          console.log('성공:', response.data);
      })
      .catch((error) => {
          console.error('에러:', error);
      });
      return latestComment.id;
    }
  } catch (error) {
    console.error("Figma API 요청에 실패했습니다:", error);
  }
  return lastCommentId;
}

// 주기적으로 Figma 코멘트를 체크합니다.
let lastCommentId = null;
setInterval(async () => {
  lastCommentId = await checkFigmaComments(lastCommentId);
}, 5000); // 5초마다 체크

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
