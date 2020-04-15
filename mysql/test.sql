use mysite;

show function status;

show procedure status;

set SQL_SAFE_UPDATES = 0;

## 함수로 업데이트 해주는것과 쿼리문 자체를 바꿔주는 것  속도 확인
## 사용 테이블  auth(seq int, auth1 int)
## 사용 함수 testFun1(fAuth int, fIndex int)


####################  함수 >> 0.45    직접입력 >> 0.2
####################  함수는 실행시키는 시간 때문에 더 느린듯


## 더미데이터 생성
call insertDummyAuth(10000);
select count(*) from auth;

## 함수binDelete
update auth set auth1 = testFun1(auth1,3);
update auth set auth1 = binDelete(auth1,3);


## 직접쿼리
update auth set auth1 = auth1 | (1 << 4);
update auth set auth1 = auth1 & (~(1 << 4));