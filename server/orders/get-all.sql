select
    o.id as id,
    b.brand as brand,
    b.model as model,
    o.urgent as urgent,
    o.date_modified as dateModified,
    o.date_created as dateCreated,
    s.name as service,
    b.id as serviceId,
    b.frame_number as frameNumber,
    os.id as orderStateId,
    os.name as orderState,
    r.id as receiptId
from `order` o
    join bike b on o.bike_id = b.id
    join service s on o.service_id = s.id
    join order_state os on o.order_state_id = os.id
    left join receipt r on r.order_id = o.id
    where b.client_id = {user_id}
order by os.id asc