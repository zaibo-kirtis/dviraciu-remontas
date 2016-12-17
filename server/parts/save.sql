insert into `part` (
    name,
    manufacturer,
    price,
    description,
    warranty_until
) values (
    '{name}',
    '{manufacturer}',
    {price},
    '{description}',
    '{warranty_until}'
) on duplicate key update
    name = values(name),
    manufacturer = values(manufacturer),
    price = values(price),
    description = values(description),
    warranty_until = values(warranty_until)
