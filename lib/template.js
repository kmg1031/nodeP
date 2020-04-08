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
}