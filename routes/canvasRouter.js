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
        res.locals.sectionPath = 'category/canvas/canvasHome.ejs';
        next();
    });

    router.use('/',(req,res)=>{
        console.log('convasHome');
        res.locals.canvasJSPath = 'category/canvas/home.js';
        res.render('home',{});
    });


    return router;
}