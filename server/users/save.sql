insert into `user` (
    id,
    email,
    client_id,
    admin_id,
    mechanic_id,
    accountant_id,
    password,
    date_registered
) values (
    '{id}',
    '{email}',
    '{clientId}',
    '{adminId}',
    '{mechanicId}',
    '{accountantId}',
    '{password}',
    NOW()
    ) on duplicate key update
    email = values(email),
    client_id = values(client_id),
    admin_id = values(admin_id),
    mechanic_id = values(mechanic_id),
    accountant_id = values(accountant_id),
    password = values(password)
