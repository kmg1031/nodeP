// 캔버스
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');


ctx.save(); // 상태 저장

ctx.translate( 0, ctx.canvas.height );
ctx.scale( 1, -1 );

// ctx.save(); // 상태 저장
// ctx.restore(); // 이전 저장 상태로 복귀


// 쓸만한 것들
Array.prototype.getMax = function(){
    return this.reduce( function(pre, cur){ return pre > cur ? pre : cur;});
}
Array.prototype.getMin = function(){
    return this.reduce( function(pre, cur){ return pre > cur ? cur : pre;});
}




// 기본 프로퍼티 객체

function Vector(x,y){
    this.x = x;
    this.y = y;
    Vector.prototype.setVector = function(x,y){
        this.x = x;
        this.y = y;
    }
    Vector.prototype.getVector = function(){
        return  [ this.x, this.y ];
    }
}

function Position( x, y ){
    this.x = x;
    this.y = y;
    this.position = [ this.x, this.y ];

    Position.prototype.setPosition = function(x,y){
        this.x = x;
        this.y = y;
    }
    Position.prototype.getPosition = function(){
        return [ this.x, this.y ];
    }
}



// drow

// 선긋기
function drowLine(vectorFrom, vectorTo){
    ctx.beginPath();
    ctx.moveTo(vectorFrom.x,vectorFrom.y);
    ctx.lineTo(vectorTo.x,vectorTo.y);
    ctx.stroke();
}

// 세로 막대 그리기
function drowBar(vectorFrom, vectorTo, weight ){
    // ctx.fillRect(vectorFrom.x - (weight/2), vectorFrom.y, weight, vectorTo.y - vectorFrom.y); // 채워진 사각형
    ctx.strokeRect(vectorFrom.x - (weight/2), vectorFrom.y, weight, vectorTo.y - vectorFrom.y); // 비운 사각형
}
// 글자 삽입
function makeText(text, position, size){
    ctx.strokeText(text, position.x, position.y, size);
}






// 박스 객체 생성
function BoxObj(x, y, width, height){
    this.color = 'red';
    this.scal = {'width' : width, 'height' : height};
    this.position = {'x' : x, 'y' : y};
}
BoxObj.prototype.drowReck =function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.scal.width, this.scal.height);
}

BoxObj.prototype.setScal = function(width, height){
    this.scal = {'width' : width, 'height' : height};
}

BoxObj.prototype.setPosition = function(x,y){
    this.position = {'x' : x, 'y' : y};
}



// 차트 객체

function ChartObj(x, y, width, height){
    this.position = new Position( x, y );
    this.scal = {'width' : width, 'height' : height};

    this.type = 'stock' // 기본 막대형 enum형
    this.grid = {
        'row' : {
            len : 2,
            min : 0,
            max : 1
        },
        'column' : {
            len : 1,
            min : 0,
            max : 0
        }
    };
    
};

function O(){
    
}

