insert into `client` (first_name, last_name, phone, address, date_registered, birthdate, date_modified, sex_id)
values ('{firstName}', '{lastName}', '{phone}', '{address}', NOW(), '{birthdate}', NOW(), {sex});

set @client_id = LAST_INSERT_ID();

insert into `user` (username, email, password, date_registered, client_id)
values ('{username}', '{email}', '{password}', NOW(), @client_id);