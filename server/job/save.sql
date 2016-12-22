insert into `job` (id, start, order_id, mechanic_id)
values({id}, NOW(), {orderId}, {mechanicId}) on duplicate key update
start = values(start),
order_id = values(order_id),
mechanic_id = values(mechanic_id);
