select
    count(orders.id) as orderCount,
    users.email as user
from
    orders
        join users on orders.fk_Userid = users.id
        join albums on orders.fk_Albumid = albums.id
    [where]
group by users.id
order by orderCount desc