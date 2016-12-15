select
    b.frame_number as frameNumber,
    b.brand as brand,
    b.model as model,
    ft.name as frameType,
    b.wheel_radius as wheelRadius,
    b.color as color,
    b.description as description
from `user` b
    join frame_type ft on b.frame_type_id = ft.id