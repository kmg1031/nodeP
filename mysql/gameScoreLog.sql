use mysite;

create table gameScoreLog(
	seq int auto_increment,
    game_seq int not null default 0 comment '게임 카테고리',
    user_seq int default 1,
    state int not null default 0
    score1 int default 0,
    score1Sup varchar(20) comment '스코어 단위, 설명',
    
    primary key(seq)
)default character set=utf8;




