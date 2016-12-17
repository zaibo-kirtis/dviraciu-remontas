insert into `user` (email, password, user_group_id)
values ('{email}', '{password}', 4);

set @user_id = LAST_INSERT_ID();

insert into `client` (first_name, last_name, email, phone, address, age, date_registered, sex_id, user_id)
values ('{firstName}', '{lastName}', '{email}', '{phone}', '{address}', {age}, CURDATE(), {sex}, @user_id);