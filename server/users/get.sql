select
    id,
    email,
    password,
    admin_id as adminId,
    client_id as clientId,
    mechanic_id as mechanicId,
    accountant_id as accountantId,
    date_registered as dateRegistered,
    last_logged_in as lastLoggedIn
from `user`
    where email = '{email}';