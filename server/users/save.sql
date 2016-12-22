insert into `user` (
    id,
    email,
    client_id,
    admin_id,
    mechanic_id,
    accountant_id
) values (
    '{id}',
    '{email}',
    '{clientId}',
    '{adminId}',
    '{mechanicId}',
    '{accountantId}'
) on duplicate key update
    email = values(email),
    client_id = values(client_id),
    admin_id = values(admin_id),
    mechanic_id = values(mechanic_id),
    accountant_id = values(accountant_id)
