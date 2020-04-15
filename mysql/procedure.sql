use mysite;

show tables;


drop procedure if exists GetAllProducts;

show procedure status;

set @result = 0;
DELIMITER //
 create procedure testPro1(
	in pid int,
	in pstr varchar(255),
	in pnum int)
begin
	DECLARE x int(11) default 0;
    declare y int default 1;
    select x;
end //

DELIMITER ;


call testPro1(2);



#out @result int
#	
	 #   set x = seq;
	 #   ;

#
   # set pdump = 10;
#	


create table test1(
	id int auto_increment,
    str varchar(255) ,
    num int ,
    primary key(id)
)
