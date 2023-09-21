const axios = require("axios");

let latestLibraryData = {};

exports.webhookLibrary = async (req, res) => {
    console.log('Figma 이벤트를 받았습니다:', req.body);
    latestLibraryData = req.body;

    const libraryPostID = req.body.triggered_by.handle || "없음";
    const created_components_data = req.body.created_components.length > 0 ? req.body.created_components[0].name : "없음";
    const created_styles_data = req.body.created_styles.length > 0 ? req.body.created_styles[0].name : "없음";
    const deleted_components_data = req.body.deleted_components.length > 0 ? req.body.deleted_components[0].name : "없음";
    const modified_components_data = req.body.modified_components.length > 0 ? req.body.modified_components[0].name : "없음";
    const modified_styles_data = req.body.modified_styles.length > 0 ? req.body.modified_styles[0].name : "없음";



    const webhookUrl = 'https://schat.smilegate.net/hooks/64e477d6892ec40472d71732/rjDH9MFQpPzFsjvQazM5764Co8CW2iQzZfFi6TqpuWud6NAE';
    const postData = {
        text: `게시자 ID: ${libraryPostID} 님이 ppool 라이브러리를 Publish 했습니다.`,
        attachments: [{
            title: "라이브러리",
            title_link: "https://schat.smilegate.net",
            text: `새로 만든 컴포넌트: ${created_components_data}\n새로 만든 스타일: ${created_styles_data}\n삭제 된 컴포넌트: ${deleted_components_data}\n수정 된 컴포넌트: ${modified_components_data}\n수정 된 스타일: ${modified_styles_data} `,
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
