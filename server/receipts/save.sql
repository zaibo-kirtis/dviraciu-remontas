set @partsPrice = (select sum(ifnull(price, 0))
from part_order
join part on part.id = part_order.part_id
where order_id = {orderId});

set @tasksPrice = (select sum(ifnull(price, 0))
from task_order
join task on task.id = task_order.task_id
where order_id = {orderId});

set @totalPrice = ifnull(@tasksPrice, 0) + ifnull(@partsPrice, 0);

set @client_id = (select client_id
from `order`
join `bike` on `order`.bike_id = `bike`.id
where `order`.id = {orderId}
group by client_id);

update `job` set `end` = NOW() where order_id = {orderId};

set @date_to_pay = DATE_ADD(NOW(), INTERVAL 30 DAY);

insert into receipt (id, client_id, comment, date_created, date_to_be_paid, order_id, receipt_state_id, sum)
values({id}, @client_id, {comment}, NOW(), @date_to_pay, {orderId}, 1, @totalPrice) on duplicate key update
id = last_insert_id(id),
client_id = values(client_id),
comment = values(comment),
date_created = values(date_created),
date_to_be_paid = values(date_to_be_paid),
order_id = values(order_id),
receipt_state_id = values(receipt_state_id ),
sum = values(sum);

select last_insert_id();