insert into `mechanic` (
    first_name,
    last_name,
    work_hours_count,
    specialization,
    date_hired,
    phone,
    email,
    user_id,
    service_id.
    wage_id
) values (
    '{firstName}',
    '{lastName}',
    '{workHours}',
    '{specialization}',
    '{dateHired}',
    '{phone}',
    '{email}',
    '',
    '',
    '1'
) on duplicate key update
    frame_number = values(frame_number),
    brand = values(brand),
    model = values(model),
    frame_type_id = values(frame_type_id),
    wheel_radius = values(wheel_radius),
    color = values(color),
    description = values(description);