const fetch = require('node-fetch');
const cron = require('node-cron');

let count = 0; // 호출 횟수 추적
let maxAttempts = 6; // 최대 시도 횟수

// 한국시간 기준 12월 11일 오후 2시 35분에 시작하는 cron 작업 설정
let startTask = cron.schedule('55 14 11 12 *', () => {
    sendAutomaticPost();
    // 첫 실행 후 10초 간격으로 추가 실행을 위한 작업 설정
    scheduledTask = cron.schedule('*/10 * * * * *', sendAutomaticPost);
}, {
    scheduled: false,
    timezone: "Asia/Seoul"
});

let scheduledTask;

function sendAutomaticPost() {
    count++;
    console.log(`Function called ${count} times`);

    // 최대 시도 횟수 도달 시 cron 작업 중지
    if (count >= maxAttempts) {
        console.log(`Stopping cron job after ${maxAttempts} attempts`);
        if (scheduledTask) {
            scheduledTask.destroy();
            scheduledTask = null;
        }
        return;
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
}

// 시작 작업 활성화
startTask.start();
