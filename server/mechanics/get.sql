select
    m.first_name as firstName,
    m.last_name as lastName,
    m.work_hours_count as workHours,
    m.specialization as specialization,
    m.date_hired as dateHired,
    m.phone as phone,
    m.email as email,
    m.user_id as userId,
    m.service_id as
from `user` us
    join user us on us.mechanic_id = m.id
where m.id = {id};