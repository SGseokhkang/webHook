const fetch = require('node-fetch');
const cron = require('node-cron');

let count = 0; // 호출 횟수 추적
let scheduledTask = cron.schedule('*/10 * * * * *', sendAutomaticPost); // cron 작업 초기 설정
let maxAttempts = 6; // 최대 시도 횟수

function sendAutomaticPost() {
    count++;
    console.log(`Function called ${count} times`);

    // 최대 시도 횟수 도달 시 cron 작업 중지
    if (count >= maxAttempts) {
        console.log(`Stopping cron job after ${maxAttempts} attempts`);
        scheduledTask.destroy();
        scheduledTask = null;
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
        if (scheduledTask) {
            count--; // 오류 발생 시 count 감소
            console.log('Attempting to resend...');
        }
    });
}

// 필요한 경우 cron 작업을 다시 시작할 수 있습니다.
// 예: scheduledTask = cron.schedule('*/10 * * * * *', sendAutomaticPost);
