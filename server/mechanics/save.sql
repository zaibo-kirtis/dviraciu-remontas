insert into `mechanic` (
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
    '{firstName}',
    '{lastName}',
    '{workHours}',
    '{specialization}',
    '{dateHired}',
    '{phone}',
    '{birthdate}',
    'dateModified',
    'service',
    'sex'
) on duplicate key update
    frame_number = values(frame_number),
    brand = values(brand),
    model = values(model),
    frame_type_id = values(frame_type_id),
    wheel_radius = values(wheel_radius),
    color = values(color),
    description = values(description);