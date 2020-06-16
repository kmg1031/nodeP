module.exports = function(io){
    // var io = require('socket.io')(server);

    io.on('connection',function(socket){

        console.log('connect socket');

        socket.on('chat',function(msg){
            console.log(msg);
            socket.emit('chat', msg);
            // socket.broadcast.emit('other message',msg);

        });
    });

    return io;
}