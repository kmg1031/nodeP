const fs = require('fs');
const moment = require('moment'); //시간 모듈
const conn = require(`${__dirname}/connect`);

var table = 'memo';

module.exports = {
    oneSelect :  (req,res) =>{
        var no = req.params.no;
        conn.query(`select * from memo where no=${no}`,function(err,rows){
            if(err) throw err;
            console.log('oneSelect success');
            res.render('home',{
                mode : "edit",
                no : rows[0].no,
                id : rows[0].id,
                title : rows[0].title,
                memo : rows[0].memo,
                time : rows[0].createtime,
                sectionPath : 'category/memo/memoForm.ejs'
            });
        });
    },
    select :  (req,res) =>{
        conn.query(`select * from memo`,function(err,rows){
            if(err) throw err;
            console.log('select success');
            res.render('home',{
                memoListData : rows
            })
        });
    },
    create : (req,res) =>{
        var id = 'master';
        var title = req.body.title;
        var memo = req.body.memo;
        // write
        conn.query(`insert into ${table} value(default,'${id}','${title}','${memo}',default)`,function(err,rows){
            if(err) throw err;
            else console.log('insert success');
            res.writeHead(302, {Location: `/memo`});
            res.end();
        });
    },
    update : (req,res) =>{
        var no = req.body.no;
        var title = req.body.title;
        var memo = req.body.memo;
        // update
        conn.query(`update ${table} set title = '${title}', memo = '${memo}' WHERE no = ${no}`,function(err,rows){
            if(err) throw err;
            else console.log('update success');
            res.writeHead(302, {Location: `/memo`});
            res.end();
        });
    },
    delete : (req,res) =>{
        var no = req.body.no;
        // delete
        conn.query(`DELETE FROM memo WHERE no = ${no}`,function(err,rows){
            if(err) throw err;
            else console.log('delete success');
            res.writeHead(302, {Location: `/memo`});
            res.end();
        });
    }
}