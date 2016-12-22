select
    o.id as id,
    o.urgent as urgent,
    o.date_modified as dateModified,
    o.date_created as dateCreated,
    s.name as service,
	b.brand as brand,
	b.model as model,
    b.id as serviceId,
    b.frame_number as frameNumber,
    os.id as orderStateId,
    os.name as orderState,
    r.id as receiptId
from `order` o
    join service s on o.service_id = s.id
	join mechanic m on m.service_id = o.service_id
    join bike b on o.bike_id = b.id
    join order_state os on o.order_state_id = os.id
    left join receipt r on r.order_id = o.id
    where m.id = {mechanic_id} or b.client_id = {user_id}
    group by o.id
order by os.id asc
