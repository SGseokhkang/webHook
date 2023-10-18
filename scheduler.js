const fetch = require('node-fetch');
const cron = require('node-cron');

const sendAutomaticPost = () => {
    fetch('https://port-0-webhook-6w1j2allyzyvdu.sel5.cloudtype.app/weekly-report', {
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

cron.schedule('00 06 * * 4', sendAutomaticPost);



// // 10초마다 실행
// setInterval(sendAutomaticPost, 10000); // 10,000 milliseconds = 10 seconds
