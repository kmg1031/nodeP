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
        console.log(req.originalUrl);
        console.log('login2');
        next();
    });

    // ajax
    router.use('/signUp',function(req,res){
        var userId = req.body.userId;
        var userPw = req.body.userPw;
        // user check
        conn.query(`select * from member where userId='${userId}'`,function(err,row){
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }
            if(row.length == 1){
                // 비번 체크
                if(row[0].userPw == userPw){
                    // 로그인 성공
                    // 로그인 로그 입력
                    conn.query(`insert into login_log(seq, userId, loginTime) values(default,'${userId}',default)`,function(err,row){
                        if(err){
                            console.log(err);
                            return res.status(500).send(err);
                        }
                        console.log('login log insert');
                        console.log(row);

                        return res.send({'result' : 'success'});
                    });
                }else{
                    // 비밀번호가 틀립니다.
                    return res.send({'result' : 'fail', 'code' : 'pwerr'});
                }
            }else{
                // 존재하지 않는 회원입니다.
                return res.send({'result' : 'fail', 'code' : 'usernull'});
            }
        });
    })

    

    // // 추가
    // router.use('/insert', function(req,res){
    //     var seq = req.query.seq;
    //     conn.query(`select * from auth where seq=${seq}`,function(err,row){
    //         if(err) throw err;
    //         var auth = row[0].auth1;
    //         var index = req.query.index;
    //         var result = bin.binInsert(auth,index);
    //         conn.query(`update auth set auth1 = ${result} where seq=1`,function(err,row){
    //             if(err) throw err;
    //             res.render('home',{});
    //         });
    //     });
    // });
    // // 삭제
    // router.use('/delete', function(req,res){
    //     var seq = req.query.seq;
    //     conn.query(`select * from auth where seq=${seq}`,function(err,row){
    //         if(err) throw err;
    //         var auth = row[0].auth1;
    //         var index = req.query.index;
    //         var result = bin.binDelete(auth,index);
    //         conn.query(`update auth set auth1 = ${result} where seq=1`,function(err,row){
    //             if(err) throw err;
    //             res.render('home',{});
    //         });
    //     });
    // });
    // // 검색
    // router.use('/create', function(req,res){
    //     var seq = req.query.seq;
    //     conn.query(`insert into auth value(${seq},0)`,function(err,row){
    //         if(err) throw err;
    //         res.render('home',{});
    //     });
    // });

    // router.use('/select', function(req,res){
    //     // var seq = req.query.seq;
    //     conn.query(`select * from auth`,function(err,row){
    //         if(err) throw err;
    //         res.render('home',{
    //             result : row
    //         });
    //     });
    // });


    // home form
    router.use('/', function(req,res){
        res.locals.sectionPath = 'login.ejs';
        res.render('home',{});
    });

    return router;

}