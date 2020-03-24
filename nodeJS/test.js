const http = require('http');
// const url = require('url');
const fs = require('fs');

console.log('start');

// 파일 읽기
fs.readFile('../html/home.html', 'utf8', (err, data) => {
    console.log(data);
});

console.log('end');