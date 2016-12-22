SELECT
`start`,
`end`,
j.order_id as orderId,
r.sum as cost,
m.first_name + ' ' + m.last_name as mechanic
from `job` j
join mechanic m on m.id = j.mechanic_id
join receipt r on r.order_id = j.order_id
WHERE start > '{from}' AND start < '{to}' and m.id = {mechanicId}
and `start` is not null
and `end` is not null;