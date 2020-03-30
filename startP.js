
const fs = require('fs');
const express = require('express');

var app = express();

app.use(express.static('/views/'));
app.use('/css', express.static(__dirname + '/css'));

app.use("/favicon.ico",function(req,res){
});

// 공통 로직
// 메뉴 정보
app.use((req,res,next)=>{
    console.log(req.originalUrl);
    fs.readdir('category', 'utf8', (err, categoryList) => {   
        res.locals.categoryList = categoryList;
        next();
    });
});

// router
const memoRouter = require(`${__dirname}/nodeJS/routes/memoRouter.js`)(app);
app.use('/r1', memoRouter);



app.use("/fileCheckAction/:filePath",function(req,res){

});

app.use("/",function(req,res){
    res.render('home',{});
});

// booting
var port = 8080;
// server.listen(port);

app.listen(port, function(){
    console.log('connect');
});

// support
console.log('Server running at http://127.0.0.1:'+port+'/');