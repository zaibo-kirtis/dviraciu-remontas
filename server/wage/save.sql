insert into `wage` (
    sum,
    work_hours,
    deductibles,
    pvm,
    comment,
    penalty,
    date_confirmed,
    accountant_id,
    mechanic_id
) values (
    {sum},
    {work_hours},
    {deductibles},
    {pvm},
    '{comment}',
    {penalty},
    '{date}',
    {accountant_id},
    {id}
) on duplicate key update
    sum = values(sum),
    work_hours = values(work_hours),
    deductibles = values(deductibles),
    pvm = values(pvm),
    comment = values(comment),
    penalty = values(penalty),
    date_confirmed = values(date_confirmed),
    accountant_id = values(accountant_id),
    mechanic_id = values(mechanic_id);

UPDATE `mechanic`
SET date_last_payed = curdate()
WHERE id = {id};