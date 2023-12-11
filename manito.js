const fetch = require('node-fetch');
const cron = require('node-cron');

let count = 0; // 호출 횟수 추적
let scheduledTask = cron.schedule('*/10 * * * * *', sendAutomaticPost); // cron 작업 초기 설정

function sendAutomaticPost() {
    count++;
    console.log(`Function called ${count} times`);

    if (count >= 10) {
        console.log('Stopping cron job after 5 calls');
        scheduledTask.destroy(); // cron 작업 완전히 제거
        scheduledTask = null; // scheduledTask 변수 초기화
        return; // 함수 실행 중단
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

// 이 코드를 사용하여 필요한 경우 cron 작업을 다시 시작할 수 있습니다.
// 예: scheduledTask = cron.schedule('*/10 * * * * *', sendAutomaticPost);
