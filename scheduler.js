const fetch = require('node-fetch');
const cron = require('node-cron');

let count = 0; // 호출 횟수를 추적하는 변수

const sendAutomaticPost = () => {
    count++;
    console.log('Function called', count, 'times');

    // 함수를 5회 호출한 후 cron 작업 중지
    if (count >= 5) {
        scheduledTask.stop();
        console.log('Cron job stopped after 5 calls');
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

// 10초 간격으로 sendAutomaticPost 함수 호출
const scheduledTask = cron.schedule('*/10 * * * * *', sendAutomaticPost);



// // 10초마다 실행
// setInterval(sendAutomaticPost, 10000); // 10,000 milliseconds = 10 seconds
