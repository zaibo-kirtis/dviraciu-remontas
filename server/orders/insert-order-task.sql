insert into task_order (task_id, order_id)
values({taskId}, {orderId}) on duplicate key update
task_id = values(task_id),
order_id = values(order_id);