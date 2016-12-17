insert into `part` (
    id,
    name,
    manufacturer,
    price,
    description,
    warranty_until
) values (
    '{id}',
    '{name}',
    '{manufacturer}',
    {price},
    '{description}',
    '{warrantyUntil}'
) on duplicate key update
    name = values(name),
    manufacturer = values(manufacturer),
    price = values(price),
    description = values(description),
    warranty_until = values(warranty_until)
