use mysite;

show procedure status;

call insertDummyAuth(1);




delimiter //
drop procedure if exists insertDummyAuth//
create procedure insertDummyAuth(pCount int)
begin
	DECLARE curCount int default 0;

	while curCount < pCount do
		set curCount = curCount + 1;
		insert auth value(default,Rand(10));
	end while;
    
	select * from auth;
end//
delimiter ;

