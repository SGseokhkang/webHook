const fetch = require('node-fetch');
const cron = require('node-cron');

const sendAutomaticPost = () => {
    fetch('https://port-0-webhook-6w1j2allyzyvdu.sel5.cloudtype.app//weekly-report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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

// 매주 목요일 오후 3시에 실행
cron.schedule('50 14 * * 3', sendAutomaticPost);