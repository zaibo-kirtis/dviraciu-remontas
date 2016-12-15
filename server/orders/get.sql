select
    id,
    title,
    year,
    price,
    exclusive,
    orderArt,
    type,
    fk_RecordLabelid as recordLabel,
    fk_Artistid as artist,
    fk_Discountid as discount
from orders where id = {id};