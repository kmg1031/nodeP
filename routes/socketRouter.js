module.exports = function(app){
    const express = require('express');
    const bodyParser = require('body-parser');

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    var router = express.Router();

    router.use(function(req,res,next){
        res.locals.sectionPath = 'category/socket/index.ejs';
        next();
    });

    router.use('/test', function(req,res){
        res.render('home',{
            sectionPath : 'category/socket/test.ejs'
        });
    });






    //
    return router;
}


