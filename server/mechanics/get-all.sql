select
    m.first_name as firstName,
    m.last_name as lastName,
    m.work_hours_count as workHours,
    m.specialization as specialization,
    m.date_hired as dateHired,
    m.phone as phone,
    us.email as email,
from `mechanic` m
    join user us on m.user_id = us.id