select
    s.name as name,
    s.address as address,
    s.working_hours_start as workStartTime,
    s.working_hours_end as workStopTime,
    s.email as email,
    s.phone as phone,
    ct.id as city,
    s.id as id
from `service` s
    join city ct on s.city_id = ct.id
where s.id = {id};