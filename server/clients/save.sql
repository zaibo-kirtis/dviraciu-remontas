insert into `client` (
    id,
    first_name,
    last_name,
    phone,
    birthdate,
    date_registered,
    date_modified,
    address,
    sex_id
) values (
    '{id}',
    '{firstName}',
    '{lastName}',
    '{phone}',
    '{birthdate}',
    NOW(),
    NOW(),
    '{address}',
    '{sex}'
) on duplicate key update
    first_name = values(first_name),
    last_name = values(last_name),
    phone = values(phone),
    address = values(address),
    birthdate = values(birthdate),
    date_modified = values(date_modified),
    sex_id = values(sex_id);