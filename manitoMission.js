const fetch = require('node-fetch');
const cron = require('node-cron');

let count = 0; // 호출 횟수 추적
let maxAttempts = 2; // 최대 시도 횟수 (두 번 실행되도록 2로 설정)

// const dates = ['13', '14', '18', '19', '20', '21']; // 12월의 날짜들
// let scheduledTasks = []; // cron 작업을 저장할 배열

// dates.forEach(date => {
//     let task = cron.schedule(`0 10 ${date} 12 *`, sendAutomaticPost, {
//         scheduled: false,
//         timezone: "Asia/Seoul"
//     });
//     scheduledTasks.push(task);
//     task.start();
// });

const dates = ['11', '14', '18', '19', '20', '21']; // 12월의 날짜들
let scheduledTasks = []; // cron 작업을 저장할 배열

dates.forEach(date => {
    let task = cron.schedule(`44 15 ${date} 12 *`, sendAutomaticPost, {
        scheduled: false,
        timezone: "Asia/Seoul"
    });
    scheduledTasks.push(task);
    task.start();
});


function sendAutomaticPost() {
    count++;
    console.log(`Function called ${count} times`);

    // 최대 시도 횟수 도달 시 cron 작업 중지
    if (count >= maxAttempts) {
        console.log(`Stopping cron job after ${maxAttempts} attempts`);
        return;
    }

    fetch('https://port-0-webhook-6w1j2allyzyvdu.sel5.cloudtype.app/manitoBotMission', {
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
