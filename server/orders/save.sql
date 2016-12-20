insert into `order` (id, comment, urgent, date_created, date_modified, bike_id, service_id, order_state_id)
values ({id}, '{comment}', {urgent}, NOW(), NOW(), {bike}, {service}, {orderState}) on duplicate key update
    comment = values(comment),
    urgent = values(urgent),
    date_modified = values(date_modified),
    bike_id = values(bike_id),
    service_id = values(service_id),
    order_state_id = values(order_state_id);

select LAST_INSERT_ID() as orderId;