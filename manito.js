const fetch = require('node-fetch');
const cron = require('node-cron');

let count = 0; // 호출 횟수 추적

const sendAutomaticPost = () => {
    count++;
    console.log(`Function called ${count} times`);

    if (count >= 5) {
        console.log('Stopping cron job after 5 calls');
        scheduledTask.stop(); // 5회 호출 후 cron 작업 중지
    }

    fetch('https://port-0-webhook-6w1j2allyzyvdu.sel5.cloudtype.app/manitoBot', {
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

// cron 작업 설정
const scheduledTask = cron.schedule('*/10 * * * * *', sendAutomaticPost);
