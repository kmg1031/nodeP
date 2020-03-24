// fs 파일시스템
const fs = require('fs');

// 파일 읽기
fs.readFile('/etc/passwd', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });