# SET GLOBAL log_bin_trust_function_creators = 1;

show function status;



# 2진수 권한 제거
DELIMITER //
drop function if exists binDelete //
create function binDelete(fAuth int, fIndex int) returns int
begin
	return fAuth & (~(1 << fIndex));
end //
DELIMITER ;

# 2진수 권한 추가
DELIMITER //
drop function if exists testFun1 //
create function testFun1(fAuth int, fIndex int) returns int
begin
	return fAuth | (1 << fIndex);
end //
DELIMITER ;

select testFun1(2, 3);
