module.exports = function(app){
    const fs = require('fs');
    const express = require('express');
    const bodyParser = require('body-parser');

    const memoController = require('/NodeJS/lib/memoController.js');

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    var router = express.Router();

    // create form
    router.use('/create', function(req,res){
        res.render('memoForm',{mode : "add"});
    });
    // create action
    router.use('/createMemo', function(req,res){
        memoController.create(req,res);
    });
    // update form
    router.use('/update/:title', function(req,res){
        var memo = fs.readFileSync(`data/${req.params.title}`,'utf8');
        res.render('memoForm',{
            mode : "edit",
            title : req.params.title,
            memo : memo
        });
    });
    // update action
    router.use('/updateMemo', function(req,res){
        memoController.update(req,res);
    });
    // list form
    router.use('/list', function(req,res){
        fs.readdir('data', 'utf8', (err, memoListData) => {
            console.log(memoListData);
           res.render('home',{
                memoListData : memoListData
           })
        });
    });
    // delete action
    router.use('/deleteMemo', function(req,res){
        memoController.delete(req,res);
    });
    return router;
}