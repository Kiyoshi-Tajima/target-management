drop table items;
create table items(
  id bigint(20) primary key not null auto_increment,
  user_id bigint(20) default null,
  item_name varchar(256) not null,
  note text default null,
  created_at datetime default null,
  updated_at datetime default null,
  constraint fk_user
    foreign key (user_id) references users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);
insert into items values
(1, 1, 'ホゲ アイテム1', 'ホゲの持ち物その１', now(), now()),
(2, 1, 'ホゲ アイテム2', 'ホゲの持ち物その１', now(), now());
