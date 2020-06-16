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
		console.log('user');
		// res.locals.sectionPath = 'userList.ejs';
		next();
	});

	// 사용자 추가 페이지
	router.use('/join', function(req,res,next){
		res.render('category/user/userMain',{
			sectionPath : 'userJoin.ejs'
		});
	});

	// 사용자 추가
	router.use('/userCreate', function(req,res){
		var userId = req.body.userId;
		var userPw = req.body.userPw;
		var userName = req.body.userName;

		conn.query(`insert into member(seq, userId, userPw, userName) value(default,'${userId}','${userPw}','${userName}')`,function(err,row){
			if(err) throw err;
			console.log(row);
			res.json(row);
		});
	});

	// 사용자 목록
	router.use('/userList', function(req,res){
		conn.query(`select seq, userId, userName from member`,function(err,row){
		    if(err) throw err;
			res.render('category/user/userMain',{
				sectionPath : 'userList.ejs',
				userList : row
			});
		});
	});

	// 로그인 기록
	router.use('/loginLog', function(req,res){
		conn.query(`select * from login_log order by loginTime desc`,function(err,row){
		    if(err) throw err;
			res.render('category/user/userMain',{
				sectionPath : 'loginLog.ejs',
				loginLogList : row
			});
		});
	});


	// 데모
	router.use('/demo', function(req,res,next){
		res.locals.sectionPath = 'demo.ejs';
		next();
	});



	
	// 삭제
	router.use('/delete', function(req,res){
		// var seq = req.query.seq;
		// conn.query(`select * from auth where seq=${seq}`,function(err,row){
		//     if(err) throw err;
		//     var auth = row[0].auth1;
		//     var index = req.query.index;
		//     var result = bin.binDelete(auth,index);
		//     conn.query(`update auth set auth1 = ${result} where seq=1`,function(err,row){
		//         if(err) throw err;
		//         res.render('home',{});
		//     });
		// });
	});
	
	// router.use('/create', function(req,res){
		// var seq = req.query.seq;
		// conn.query(`insert into auth value(${seq},0)`,function(err,row){
		//     if(err) throw err;
		//     res.render('home',{});
		// });
	// });
	// 검색
	router.use('/select', function(req,res){
		// // var seq = req.query.seq;
		// conn.query(`select * from auth`,function(err,row){
		//     if(err) throw err;
		//     res.render('home',{
		//         result : row
		//     });
		// });
	});


	// home form
	router.use('/', function(req,res){
		conn.query(`select seq, userId, userName from member`,function(err,row){
			if(err) throw err;
			res.render('category/user/userMain',{
				sectionPath : 'userList.ejs',
				userList : row
			});
		});
	});

	return router;

}