const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');


//  function
function templateMemoList(memoList){
    var list =`<ul>`;
    memoList.forEach(element => {
        list += `<li><a href="/update?id=${element}">${element}</a></li>`;
    });
    return list+`</ul>`;
}
function templateList(categoryList){
    var list =`<ul>
        <li><a href="/">HOME</a></li>`;
    categoryList.forEach(element => {
        list += `<li><a href="/${element}">${element}</a></li>`;
    });
    return list+`</ul>`;
}
function templateHTML(title,categoryList,body,controll){
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>HOME</title>
        </head>
        <body>
            <h2>Start Project</h2>
            <h4>${title}</h4>
            ${categoryList}
            ${controll}
            <a href="/create">create</a>
            <a href="/update">update</a>
            <a href="/list">list</a>
            <p>${body}<p>
        </body>
        </html>`;
}

var server = http.createServer((req,res) => {
    
    var _url = req.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    var title = '';
    if(queryData.id){
        title = queryData.id;
    }
    if(_url == '/favicon.ico'){
        res.writeHead(404);
        res.end();
    }else{
        // 리스트 읽기
        fs.readdir('./category', 'utf8', (err, listData) => {   
            var body = "";     
            var list = templateList(listData);

            // main
            if(pathname == '/'){
                if(queryData.id == undefined){
                    body = templateHTML(title,list,"","");
                    res.writeHead(200);
                    res.end(body);
                }else{
                    body = templateHTML(title,list,queryData.id,"");
                    res.writeHead(200);
                    res.end(body);
                }

            }
            // create form
            else if(pathname == '/create'){
                fs.readFile('../html/memoForm.html', 'utf8', (err, memoForm) => {
                    body = templateHTML(title,list,memoForm,"");
                    // write
                    res.writeHead(200);
                    res.end(body);
                });
            }
            // create action
            else if(pathname == '/createMemo'){
                var dataStr = '';
                req.on('data',function(data){
                    dataStr += data;
                });
                
                req.on('end',function(){
                    var post = qs.parse(dataStr);
                    var title = post.title;
                    var memo = post.memo;

                    // write
                    fs.writeFile(`../data/${title}`,memo,'utf8',function(err){
                        res.writeHead(302, {Location: `/?id=${title}`});
                        res.end();
                    });
                });
            }
            // update form
            else if(pathname == '/update'){
                fs.readFile(`../data/${queryData.id}`, 'utf8', (err, memoData) => {
                    var title = queryData.id;
                    var memo = memoData;
                    body = templateHTML(title,list,
                        `
                            <form action="/updateMemo" method="post">
                                <table>
                                    <div>
                                        <input type="hidden" name="id" placeholder="title" value="${queryData.id}">
                                    </div>
                                    <span>title</span>
                                    <div>
                                        <input type="text" name="title" placeholder="title" value="${queryData.id}">
                                    </div>
                                    <span>memo</span>
                                    <div>
                                        <textarea name="memo" cols="30" rows="10">${memoData}</textarea>
                                    </div>
                                    <div>
                                    <button type="submit" id="up_memo">수정</button>
                                    </div>
                                </table>
                            </form>
                            <form action="/deleteMemo" method="post">
                                <input type="hidden" name="id" placeholder="title" value="${queryData.id}">
                                <button type="submit" id="del_memo">삭제</button>
                            </form>
                        `,"");
                    // write
                    res.writeHead(200);
                    res.end(body);
                });
            }
            // update action
            else if(pathname == '/updateMemo'){
                var dataStr = '';
                req.on('data',function(data){
                    dataStr += data;
                });
                
                req.on('end',function(){
                    var post = qs.parse(dataStr);
                    var id = post.id;
                    var title = post.title;
                    var memo = post.memo;

                    // update
                    fs.rename(`../data/${id}`,`../data/${title}`,function(error){
                        fs.writeFile(`../data/${title}`,memo,'utf8',function(err){
                            res.writeHead(302, {Location: `/?id=${title}`});
                            res.end();
                        });
                    });
                });
            }
            // list form
            else if(pathname == '/list'){
                fs.readdir('../data', 'utf8', (err, memoListData) => {
                    var memoList = templateMemoList(memoListData);
                    body = templateHTML(title,list,memoList,"");
                    // write
                    res.writeHead(200);
                    res.end(body);
                });
            }
            // delete action
            else if(pathname == '/deleteMemo'){
                var dataStr = '';
                req.on('data',function(data){
                    dataStr += data;
                });
                
                req.on('end',function(){
                    var post = qs.parse(dataStr);
                    var id = post.id;

                    // delete
                    fs.unlink(`../data/${id}`,(err) =>{
                        res.writeHead(302, {Location: `/`});
                        res.end();
                    });
                });
            }
            else{
                body = templateHTML(title,list,`어서오시게 젊은이 nodeJS를 배우러 오셨나?\n오늘은 폼의 데이터를 받아보시게`,"");
                // write
                res.writeHead(200);
                res.end(body);
            }
        
        });
    }



    // console.log
    // console.log(pathname);
    // console.log(url.parse(req.url, true).protocol);
    // console.log(queryData);

});

// booting
var port = 8080;
server.listen(port);

// support
console.log('Server running at http://127.0.0.1:'+port+'/');