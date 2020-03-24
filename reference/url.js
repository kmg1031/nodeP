const url = require('url');
const { URL } = url;
const myURL = new URL('http://www.naver.com?a1=1&a2=2&a3=3');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('------------------------------');

// 크롤링 할때 유용할듯
const parsedUrl = url.parse('http://www.naver.com?a1=1&a2=2&a3=3');
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));