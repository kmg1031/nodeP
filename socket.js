
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.use(express.static('/views/'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    // res.sendFile('views/home.ejs');
    res.render('category/socket/test');
});

io.on('connection',function(socket){
    // var nsp = io.of('/my-namespace');

    // nsp.on('connection', function(socket){
    // console.log('someone connected');
    // });
    // nsp.emit('hi', 'everyone!');

    socket.on('login',function(data){
        console.log("login");

        socket.name = data.name;
        socket.userid = data.userid;

        io.emit('login', data.name );
    });

    socket.on('chat', function(data) {
        console.log('Message from %s: %s', socket.name, data.msg);
    
        var msg = {
          from: {
            name: socket.name,
            userid: socket.userid
          },
          msg: data.msg
        };
        socket.emit('chat', msg);
    });

    socket.on('forceDisconnect', function() {
        socket.disconnect();
    })

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + socket.name);
    });

});






server.listen(8080, function(){
    console.log('socket test');
});
