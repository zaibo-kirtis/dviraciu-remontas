insert into `order` (comment, urgent, date_created, date_modified, bike_id, service_id, order_state_id)
values ('{comment}', {urgent}, NOW(), NOW(), {bike}, {service}, {orderState});

select LAST_INSERT_ID() as orderId;