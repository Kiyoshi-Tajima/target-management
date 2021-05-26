drop table users;
create table users(
  user_id bigint(20) primary key not null,
  login_id varchar(20) not null,
  password varchar(20) not null,
  user_name varchar(128) not null,
  email varchar(128) default null
);
insert into users(user_id, login_id, password, user_name, email)
values(1, 'hoge', 'hoge', 'ホゲ 太郎', 'hoge@hoge.co.jp');
