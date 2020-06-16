const fs = require('fs');
const moment = require('moment'); //시간 모듈
const conn = require(`${__dirname}/connect`);

var table = 'memo';

module.exports = {
    setScore : (obj)=>{

        var query = `
            insert into gameScoreLog(${Object.keys(obj).join(',')})
            values (${Object.values(obj).join(',')});
        `;
        console.log(query);
        // conn.query(query,function(err,rows){});
    },
    select :  (req,res) =>{
        conn.query(`select * from memo`,function(err,rows){
            if(err) throw err;
            console.log('select success');
            res.render('home',{
                memoListData : rows,
                sectionPath : "category/memo/memoList.ejs",
            })
        });
    },


}
