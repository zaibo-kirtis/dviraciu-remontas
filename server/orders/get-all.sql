select
    o.id as orderId,
    urgent as urgent,
    date_created as date,
    s.name as service,
    b.id as serviceId,
    b.frame_number as frameNumber,
    os.id as orderStateId,
    os.name as orderState
from `order` o
    join bike b on o.bike_id = b.id
    join service s on o.service_id = s.id
    join order_state os on o.order_state_id = os.id
order by os.id asc