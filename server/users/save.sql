insert into `user` (
    frame_number,
    brand,
    model,
    frame_type_id,
    wheel_radius,
    color,
    description
) values (
    {frameNumber},
    '{brand}',
    '{model}',
    {frameType},
    {wheelRadius},
    '{color}',
    '{description}'
) on duplicate key update
    frame_number = values(frame_number),
    brand = values(brand),
    model = values(model),
    frame_type_id = values(frame_type_id),
    wheel_radius = values(wheel_radius),
    color = values(color),
    description = values(description);