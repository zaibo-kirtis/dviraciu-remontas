insert into `accountant` (
    id,
    first_name,
    last_name,
    specialization,
    phone,
    birthdate,
    date_hired,
    date_modified,
    sex_id
) values (
    '{id}',
    '{firstName}',
    '{lastName}',
    '{specialization}',
    '{phone}',
    '{birthdate}',
    '{dateHired}',
    NOW(),
    '{sex}'
) on duplicate key update
    first_name = values(first_name),
    last_name = values(last_name),
    phone = values(phone),
    specialization = values(specialization),
    birthdate = values(birthdate),
    date_hired = values(date_hired),
    date_modified = values(date_modified),
    sex_id = values(sex_id);