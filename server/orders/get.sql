select
    `order`.id as id,
    bike_id as bike,
    service_id as service,
    urgent as urgent,
    order_state_id as orderStateId,
    comment as comment
from `order` where `order`.id = {id};

select
    `task`.id as id
from `task`
join `task_order` on `task`.id = `task_order`.task_id
where `task_order`.order_id = {id};

select
    `part`.id as id
from `part`
join `part_order` on `part`.id = `part_order`.part_id
where `part_order`.order_id = {id};