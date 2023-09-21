const axios = require("axios");

let latestLibraryData = {};

exports.webhookLibrary = async (req, res) => {
    console.log('Figma 이벤트를 받았습니다:', req.body);
    latestLibraryData = req.body;

    const libraryPostID = req.body.triggered_by.handle || "없음";
    const createdComponentsCount = req.body.created_components.length;
    const createdStylesCount = req.body.created_styles.length;
    const deletedComponentsCount = req.body.deleted_components.length;
    const modifiedComponentsCount = req.body.modified_components.length;
    const modifiedStylesCount = req.body.modified_styles.length;

    const webhookUrl = 'https://schat.smilegate.net/hooks/64e477d6892ec40472d71732/rjDH9MFQpPzFsjvQazM5764Co8CW2iQzZfFi6TqpuWud6NAE';
    const postData = {
        text: `게시자 ID: ${libraryPostID} 님이 ppool 라이브러리를 Publish 했습니다.`,
        attachments: [{
            title: "라이브러리",
            title_link: "https://schat.smilegate.net",
            text: `새로 만든 컴포넌트 갯수: ${createdComponentsCount}\n새로 만든 스타일 갯수: ${createdStylesCount}\n삭제 된 컴포넌트 갯수: ${deletedComponentsCount}\n수정 된 컴포넌트 갯수: ${modifiedComponentsCount}\n수정 된 스타일 갯수: ${modifiedStylesCount} `,
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
    } catch (error) {
        console.error('웹훅으로 데이터를 보내는 중 오류가 발생했습니다:', error);
    }

    res.status(200).send('OK');
};

exports.getLibraryData = (req, res) => {
    res.json(latestLibraryData);
};
