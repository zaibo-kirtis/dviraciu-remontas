insert into `bike` (
    id,
    frame_number,
    brand,
    model,
    frame_type_id,
    wheel_radius,
    color,
    description,
    client_id
) values (
    '{id}',
    {frameNumber},
    '{brand}',
    '{model}',
    {frameType},
    {wheelRadius},
    '{color}',
    '{description}',
    {clientId}
) on duplicate key update
    frame_number = values(frame_number),
    brand = values(brand),
    model = values(model),
    frame_type_id = values(frame_type_id),
    wheel_radius = values(wheel_radius),
    color = values(color),
    description = values(description),
    client_id = values(client_id);