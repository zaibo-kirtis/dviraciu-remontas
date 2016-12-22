select
    ac.first_name as firstName,
    ac.last_name as lastName,
    ac.specialization as specialization,
    ac.id as id,
    ac.phone as phone,
    ac.birthdate as birthdate,
    ac.date_modified as modified,
    ac.date_hired as dateHired,
    sx.id as sex,
    us.email as email
from user us
    join accountant ac on us.accountant_id = ac.id
        join sex sx on sx.id = ac.sex_id
