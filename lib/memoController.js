const fs = require('fs');
const moment = require('moment');

module.exports = {
    create : (req,res) =>{
        var time = moment().format('YYYY-MM-DD HH:mm:ss');

        var title = req.body.title;
        var memo = req.body.memo;
        var contents = 
            `memo:${memo},time:${time}`;
        // write
        console.log(title);
        console.log(memo);
        console.log(contents);
        fs.writeFile(`data/${title}`,contents,'utf8',function(err){
            res.writeHead(302, {Location: `/`});
            res.end();
        });
    },
    update : (req,res) =>{
        var id = req.body.id;
        var title = req.body.title;
        var memo = req.body.memo;
        // update
        fs.rename(`data/${id}`,`data/${title}`,function(error){
            fs.writeFile(`data/${title}`,memo,'utf8',function(err){
                res.writeHead(302, {Location: `/`});
                res.end();
            });
        });
    },
    delete : (req,res) =>{
        var title = req.body.title;
        // delete
        fs.unlink(`data/${title}`,(err) =>{
            res.writeHead(302, {Location: `/`});
            res.end();
        });
    }
}