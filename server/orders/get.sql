select
    `order`.id as id,
    bike_id as bike,
    service_id as service,
    urgent as urgent,
    comment as comment
from `order` where `order`.id = {id};

select
    `task`.id as id
from `task`
join `task_order` on `task`.id = `task_order`.task_id
where `task_order`.order_id = {id};