module.exports = function(app){
    const fs = require('fs');
    const express = require('express');
    const bodyParser = require('body-parser');

    const memoController = require('/NodeJS/lib/memoController.js');

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    var router = express.Router();

    router.use(function(req,res,next){
        res.locals.subCategory = 'category/memo/subCategory.ejs';
        next();
    });

    
    // create form
    router.use('/create', function(req,res){
        res.render('home',{
            mode : "add",
            sectionPath : 'category/memo/memoForm.ejs'
        });
    });
    // create action
    router.use('/createMemo', function(req,res){
        memoController.create(req,res);
    });
    // update form
    router.use('/update/:no', function(req,res){
        memoController.oneSelect(req,res);
    });
    // update action
    router.use('/updateMemo', function(req,res){
        memoController.update(req,res);
    });
    // list form
    router.use('/list', function(req,res){
        memoController.select(req,res);
    });
    // delete action
    router.use('/deleteMemo', function(req,res){
        memoController.delete(req,res);
    });

    // memo home form
    router.use('/', function(req,res){
        res.render('home',{});
    });

    return router;
}