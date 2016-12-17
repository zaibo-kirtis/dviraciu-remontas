insert into `service` (
    id,
    name,
    address,
    working_hours_start,
    working_hours_end,
    email,
    phone,
    city_id
) values (
    '{id}',
    '{name}',
    '{address}',
    '{workStartTime}',
    '{workStopTime}',
    '{email}',
    '{phone}',
    {city}
) on duplicate key update
    name = values(name),
    address = values(address),
    working_hours_start = values(workStartTime),
    working_hours_end = values(workStopTime),
    email = values(phone),
    phone = values(phone),
    city_id = values(city);