select
    b.id as id,
    b.name as name,
    b.manufacturer as manufacturer,
    b.price as price,
    b.description as description,
    b.warranty_for as warrantyFor
from `part` b
where b.id = {id};