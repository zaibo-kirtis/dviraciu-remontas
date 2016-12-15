select
    count(orders.id) as orderCount,
    albums.title as album
from
    orders
        join users on orders.fk_Userid = users.id
        join albums on orders.fk_Albumid = albums.id
    [where]
group by albums.id
order by orderCount desc