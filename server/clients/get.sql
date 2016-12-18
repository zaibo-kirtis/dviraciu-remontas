select
    c.first_name as firstName,
    c.last_name as lastName,
    c.address as address,
    c.id as id,
    c.phone as phone,
    c.birthdate as birthdate,
    c.date_modified as modified,
    c.date_registered as dateRegistered,
    sx.id as sex,
    us.email as email
from user us
    join client c on us.client_id = c.id
        join sex sx on sx.id = c.sex_id
where c.id = {id};