



// 차트 막대 만들기
ChartObj.prototype.verticalBar = function(){
    
}
// 격자 선 생성
ChartObj.prototype.test = function(data){
    // i == 0 일때 외곽선   >> 실선 처리
    // 그외 기준선          >> 점선 처리

    // 격자선 생성 
    // 세로
    var countX = data.length;
    var dtX = this.scal.width / countX;
    for(var i = 0;i < countX; i++){
        var currentX = this.position.x + (dtX * i);

        var sPoint = new Position(currentX,this.position.y);
        var ePoint = new Position(currentX , this.position.y + this.scal.height);

        drowLine(sPoint, ePoint);
    }
    // 가로
    var countY = 10;
    var dtY = this.scal.height / countY;
    for(var i = 0;i < countY; i++){
        var currentY = this.position.y +(dtY * i);

        var sPoint = new Position(this.position.x , currentY);
        var ePoint = new Position(this.position.x + this.scal.width , currentY);

        drowLine(sPoint, ePoint);
    }


    // 데이터 봉 생성 일단 선부터
    var countX = data.length;
    var dtX = this.scal.width / countX;

    // y 최저점 , 최고점, 간격
    var max = data.getMax(); // 100%
    // var min = data.getMin(); // 0%
    var min = 0;

    
    var bottom = this.position.y;
    var sizeY = this.scal.height;
    var top = this.position.y + this.scal.height;

    for(var i = 0;i < countX; i++){
        var currentX = this.position.x + (dtX * i) + (dtX / 2);

        var sPoint = new Position(currentX , bottom);
        var ePoint = new Position(currentX , bottom + (sizeY * (data[i] / max)));

        // drowLine(sPoint, ePoint);
        drowBar(sPoint, ePoint, 30);
    }


}

var c = new ChartObj(100,70,cvs.width * 4 / 5,cvs.height * 4 / 5);

var data = [2,5,8,7,4,6,2,4,0,1];




c.test(data);

ctx.restore(); // 이전 저장 상태로 복귀



makeText('test',new Position(100,400),200);
