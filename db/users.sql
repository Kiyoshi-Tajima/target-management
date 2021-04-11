drop table users;
create table users(
  user_id varchar(20) primary key not null,
  password varchar(20) not null
);
insert into users values('hoge', 'hoge');
