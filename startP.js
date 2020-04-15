
const fs = require('fs');
const express = require('express');

const conn = require(`${__dirname}/lib/connect`);

var app = express();


app.use(express.static('/views/'));
app.use('/css', express.static(__dirname + '/css'));



app.use("/favicon.ico",function(req,res){
});

// 공통 로직
// 메뉴 정보
app.use((req,res,next)=>{
    var mainCat = req.originalUrl.split('/')[1];
    console.log(mainCat);
    fs.readdir('views/category', 'utf8', (err, categoryList) => {
        res.locals.categoryList = categoryList;
        fs.stat(`views/category/${mainCat}/subCategory.ejs`,(err)=>{
            if(!err){
                res.locals.subCategory = `category/${mainCat}/subCategory.ejs`;
            }
            next();
        });
    });
});




// router
const memoRouter = require(`${__dirname}/routes/memoRouter.js`)(app);
app.use('/memo', memoRouter);

const canvasRouter = require(`${__dirname}/routes/canvasRouter.js`)(app);
app.use('/canvas', canvasRouter);

const gameRouter = require(`${__dirname}/routes/gameRouter.js`)(app);
app.use('/game', gameRouter);

const authRouter = require(`${__dirname}/routes/authRouter.js`)(app);
app.use('/auth', authRouter);



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