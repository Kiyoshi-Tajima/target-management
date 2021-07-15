drop table users;
create table users(
  id bigint(20) primary key not null auto_increment,
  login_id varchar(20) not null unique,
  password varchar(20) not null,
  user_name varchar(128) not null,
  email varchar(128) default null,
  authority varchar(20) not null
);
insert into users(login_id, password, user_name, email, authority)
values('hoge', 'hoge', 'ホゲ 太郎', 'hoge@hoge.co.jp', 'administrator');
