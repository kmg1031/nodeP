module.exports = function(app){
    const express = require('express');
    const bodyParser = require('body-parser');
    const bin = require('../lib/binary');
    const conn = require('../lib/connect');

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    var router = express.Router();

    router.use(function(req,res,next){
        console.log('auth');
        res.locals.sectionPath = 'auth.ejs';
        next();
    });

    // 권한 관리
    router.use('/admin', function(req,res,next){
        res.locals.sectionPath = 'auth.ejs';
        next();
    });
    // 회원 가입
    router.use('/createMember', function(req,res,next){
        res.locals.sectionPath = 'createMember.ejs';
        next();
    });
     // 데모
     router.use('/demo', function(req,res,next){
        res.locals.sectionPath = 'demo.ejs';
        next();
    });



    // 추가
    router.use('/insert', function(req,res){
        var seq = req.query.seq;
        conn.query(`select * from auth where seq=${seq}`,function(err,row){
            if(err) throw err;
            var auth = row[0].auth1;
            var index = req.query.index;
            var result = bin.binInsert(auth,index);
            conn.query(`update auth set auth1 = ${result} where seq=1`,function(err,row){
                if(err) throw err;
                res.render('home',{});
            });
        });
    });
    // 삭제
    router.use('/delete', function(req,res){
        var seq = req.query.seq;
        conn.query(`select * from auth where seq=${seq}`,function(err,row){
            if(err) throw err;
            var auth = row[0].auth1;
            var index = req.query.index;
            var result = bin.binDelete(auth,index);
            conn.query(`update auth set auth1 = ${result} where seq=1`,function(err,row){
                if(err) throw err;
                res.render('home',{});
            });
        });
    });
    // 검색
    router.use('/create', function(req,res){
        var seq = req.query.seq;
        conn.query(`insert into auth value(${seq},0)`,function(err,row){
            if(err) throw err;
            res.render('home',{});
        });
    });

    router.use('/select', function(req,res){
        // var seq = req.query.seq;
        conn.query(`select * from auth`,function(err,row){
            if(err) throw err;
            res.render('home',{
                result : row
            });
        });
    });


    // home form
    router.use('/', function(req,res){
        res.render('category/auth/authMain',{});
    });

    return router;

}