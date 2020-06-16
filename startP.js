
const fs = require('fs');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

var app = express();

var socketIo = require('socket.io');
var socketEvent = require(__dirname + '/js/io.js');

// var server = http.createServer(app);
// var io = require(__dirname + '/js/io.js')(server);

app.use(express.static('/views/'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/node_modules'));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


app.use("/favicon.ico",function(req,res){
});

// 공통 로직
// 메뉴 정보
app.use((req,res,next)=>{

    console.log(req.originalUrl);
    
    var mainCat = req.originalUrl.split('/')[1];
    console.log(' url : '+mainCat);
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



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// router
const userRouter = require(`${__dirname}/routes/userRouter.js`)(app);
app.use('/user', userRouter);

const loginRouter = require(`${__dirname}/routes/loginRouter.js`)(app);
app.use('/login', loginRouter);

const memoRouter = require(`${__dirname}/routes/memoRouter.js`)(app);
app.use('/memo', memoRouter);

const canvasRouter = require(`${__dirname}/routes/canvasRouter.js`)(app);
app.use('/canvas', canvasRouter);

const gameRouter = require(`${__dirname}/routes/gameRouter.js`)(app);
app.use('/game', gameRouter);

const authRouter = require(`${__dirname}/routes/authRouter.js`)(app);
app.use('/auth', authRouter);

const apiRouter = require(`${__dirname}/routes/apiRouter.js`)(app);
app.use('/api', apiRouter);

const socketRouter = require(`${__dirname}/routes/socketRouter.js`)(app);
app.use('/socket', socketRouter);

const crawlingRouter = require(`${__dirname}/routes/crawlingRouter.js`)(app);
app.use('/crawling', crawlingRouter);


app.use("/",function(req,res){
    res.render('home',{});
});








// booting
var port = 8080;
// server.listen(port);

var server = app.listen(port, function(){
    console.log('connect');
});

var io = socketIo(server);
socketEvent(io);


// var socketIo = require('socket.io');
// var socketEvent = require(__dirname + '/js/io.js');


// support
console.log('Server running at http://127.0.0.1:'+port+'/');