module.exports = {
    select : (bin, index) => {
        return result = (bin >> index-1) % 2;
    },
    insert : (bin,index) => {
        return  bin | (1 << index-1);
    },
    delete2 : (bin,index) => {
        var result;
        var t = 1 << index-1;
        result = bin & (~t);
        return result;
    },
    binToArray : (bin) => {
        var result = new Array();
        while(bin >= 1 ){
            result.push(bin%2);
            bin = parseInt(bin/2);
        }
        return result;
    },
    arrayToBin : (arr) => {
        var result=0;
        for(var i=0,j=1;i<arr.length;i++){
            result += arr[i]*j;
            j*=2;
        }
        return result;
    },
}



