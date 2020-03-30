module.exports = {
    MemoList : function (memoList){
        var list =`<ul>`;
        memoList.forEach(element => {
            list += `<li><a href="/update?id=${element}">${element}</a></li>`;
        });
        return list+`</ul>`;
    },
    List : function(categoryList){
        var list =``;
        categoryList.forEach(element => {
            list += `<li><a href="/${element}">${element}</a></li>`;
        });
        return list;
    },
    HTML : function(title,categoryList,body,controll){
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${title}</title>
            </head>
            <link rel="stylesheet" href="css/main.css" type="text/css">
            <body>
                <header>
                    <div id="title">
                        <h1><a href="/">HEADERRRRRRRRRRR</a></h1>
                    </div>
                    <nav>
                        <div id="category">
                            <ul>
                                ${categoryList}
                            </ul>
                        </div>
                    </nav>
                </header>
                ${controll}
                <a href="/fileCheck">fileCheck</a>
                <a href="/r1/create">create</a>
                <a href="/r1/list">list</a>
                <p>${body}<p>
                <link rel="import" href="/html/section.html">
                <link rel="import" href="/html/footer.html">
            </body>
            </html>`;
    },
    updateForm : (queryData,memoData) => {
        return `
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
        `
    ;}
}