select
    b.id as id,
    b.frame_number as frameNumber,
    b.brand as brand,
    b.model as model,
    ft.name as frameType,
    b.wheel_radius as wheelRadius,
    b.color as color,
    b.description as description
from `bike` b
    join frame_type ft on b.frame_type_id = ft.id
    where b.client_id = {user_id}