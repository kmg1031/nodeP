module.exports = {
    binSelect : (bin, index) => {
        return result = (bin >> index) % 2;
    },
    binInsert : (bin,index) => {
        return bin | (1 << index);
    },
    binDelete : (bin,index) => {
        return bin & (~(1 << index));
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