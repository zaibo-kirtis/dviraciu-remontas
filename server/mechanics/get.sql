select
    m.first_name as firstName,
    m.id as id,
    m.last_name as lastName,
    m.work_hours_count as workHours,
    m.specialization as specialization,
    m.date_hired as dateHired,
    m.phone as phone,
    m.birthdate as birthdate,
    m.date_modified as modified,
    m.date_last_payed as dateLastPayed,
    sx.id as sex,
    sv.id as service,
    us.email as email
from user us
    join mechanic m on us.mechanic_id = m.id
    join sex sx on m.sex_id = sx.id
    join service sv on sv.id = m.service_id
where m.id = {id};