const fetch = require('node-fetch');
const cron = require('node-cron');

let count = 0; // 호출 횟수 추적
let scheduledTask; // cron 작업 변수 선언

const sendAutomaticPost = () => {
    count++;
    console.log(`Function called ${count} times`);

    if (count >= 5) {
        console.log('Stopping cron job after 5 calls');
        scheduledTask.stop(); // 5회 호출 후 cron 작업 중지
        return; // 함수 실행을 여기서 중단
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
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        console.log('Response received:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

// cron 작업 설정
scheduledTask = cron.schedule('*/10 * * * * *', sendAutomaticPost);
