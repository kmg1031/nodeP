
# table auth
# seq int auto_increment
# auth1 int

use mysite;

drop procedure if exists authInsert2;

show procedure status where db='mysite';

call authInsert(1,5);
call authInsert2(0,2);

update auth set auth1 = authInsert2(auth1,index) where seq = pId;
# 모든 row insert
DELIMITER //
drop procedure if exists authInsertAll;
create procedure authInsertAll(in pIndex int)
begin
    update auth set auth1 = (auth1 | (1 << pIndex));
	select * from auth;
end//
DELIMITER ;


# 해당 seq 하나만 insert
DELIMITER //
drop procedure if exists authInsert;
create procedure authInsert(in pId int, in pIndex int)
begin
    update auth set auth1 = (auth1 | (1 << pIndex)) where seq = pId;
	select * from auth;
end//
DELIMITER ;


# 리턴값 반환해서 update 해준느거 안되는듯 함수로 하자
DELIMITER //
drop procedure if exists authInsert2;
create procedure authInsert2(in pAuth int, in pIndex int)
begin
	select pAuth | (1 << pIndex);
end//
DELIMITER ;



