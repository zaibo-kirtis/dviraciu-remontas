select
    b.name as name,
    b.manufacturer as manufacturer,
    b.price as price,
    b.description as description,
    b.warranty_until as warrantyUntil
from `bike` b
where b.id = {id};