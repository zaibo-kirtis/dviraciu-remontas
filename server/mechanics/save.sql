insert into `mechanic` (
    id,
    first_name,
    last_name,
    work_hours_count,
    specialization,
    date_hired,
    phone,
    birthdate,
    date_modified,
    service_id,
    sex_id
) values (
    '{id}',
    '{firstName}',
    '{lastName}',
    '{workHours}',
    '{specialization}',
    '{dateHired}',
    '{phone}',
    '{birthdate}',
    '{dateModified}',
    '{service}',
    '{sex}'
) on duplicate key update
    first_name = values(first_name),
    last_name = values(last_name),
    work_hours_count = values(work_hours_count),
    specialization = values(specialization),
    phone = values(phone),
    birthdate = values(birthdate),
    date_modified = values(date_modified),
    service_id = values(service_id),
    sex_id = values(sex_id);