insert into part_order (part_id, order_id)
values({partId}, {orderId}) on duplicate key update
part_id = values(part_id),
order_id = values(order_id);