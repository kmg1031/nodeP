module.exports = function(app){
    const fs = require('fs');
    const express = require('express');
    const bodyParser = require('body-parser');

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    var router = express.Router();

    router.use((req,res,next)=>{
        console.log('canvas');
        res.locals.subCategory = 'subCategory.ejs';
        res.locals.sectionPath = 'home.ejs';
        res.locals.canvasSetting = 'canvasSetting.js';
        next();
    });

    router.use('/canvas1',(req,res)=>{
        res.locals.canvasJSPath = 'canvas1.js';
        res.render('category/canvas/canvasMain.ejs',{});
    });
    router.use('/canvas2',(req,res)=>{
        res.locals.canvasJSPath = 'canvas2.js';
        res.render('category/canvas/canvasMain.ejs',{});
    });


    router.use('/',(req,res)=>{
        res.render('category/canvas/canvasMain.ejs',{});
    });


    return router;
}