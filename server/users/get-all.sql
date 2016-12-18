select
    us.id as id,
    us.email as email,
    us.password as password,
    us.admin_id as adminId,
    us.client_id as clientId,
    us.mechanic_id as mechanicId,
    us.accountant_id as accountantId,
    us.date_registered as dateRegistered,
    us.last_logged_in as lastLoggedIn
from `user` us

