insert into `task` (
    id,
    name,
    price,
    description
) values (
    '{id}',
    '{name}',
    '{price}',
    '{description}'
) on duplicate key update
    name = values(name),
    price = values(price),
    description = values(description)
