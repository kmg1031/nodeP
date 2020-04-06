var express    = require('express');
var mysql      = require('mysql');
var dbconfig   = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();


app.set('port', process.env.PORT || 8080);

app.get('/', function(req,res){
    res.send('root');
});

app.get('/persons', function(req,res){
    connection.query('select * from myproject_member', function(err,rows){
        if(err) throw err;
        res.send(rows);
    });
});

app.listen(app.get('port'), function(){
    console.log('mysql');
});
