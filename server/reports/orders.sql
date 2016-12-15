select
    users.email as user,
    albums.title as album,
    orders.price as price
from
    orders
        join users on orders.fk_Userid = users.id
        join albums on orders.fk_Albumid = albums.id
    [where]
order by album