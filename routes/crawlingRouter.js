module.exports = function(app){
    const fs = require('fs');
    const express = require('express');
    const bodyParser = require('body-parser');

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    var router = express.Router();

    router.use((req,res,next)=>{
        console.log('crawling');
        res.locals.subCategory = 'subCategory.ejs';
        res.locals.sectionPath = 'home.ejs';
        next();
    });

    router.use('/',(req,res)=>{
        // res.locals.canvasJSPath = 'canvas1.js';
        res.render('category/crawling/crawlingMain.ejs',{});
    });



    router.use('/',(req,res)=>{
        res.render('category/crawling/crawlingMain.ejs',{});
    });


    return router;
}