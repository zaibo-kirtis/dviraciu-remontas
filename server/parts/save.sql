insert into `part` (
    id,
    name,
    manufacturer,
    price,
    description,
    warranty_for
) values (
    '{id}',
    '{name}',
    '{manufacturer}',
    {price},
    '{description}',
    '{warrantyFor}'
) on duplicate key update
    name = values(name),
    manufacturer = values(manufacturer),
    price = values(price),
    description = values(description),
    warranty_for = values(warranty_for)
