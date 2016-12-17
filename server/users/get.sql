select
    email,
    password,
    admin_id as adminId,
    client_id as clientId,
    mechanic_id as mechanicId,
    accountant_id as accountantId
from `user`
    where email = '{email}';