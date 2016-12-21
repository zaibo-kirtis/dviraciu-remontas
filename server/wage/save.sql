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

update `mechanic`
set date_last_payed = NOW()
where id = {id};

insert into `advance_payment` (sum, date, comment, wage_id)
values ({sum}, NOW(), '{comment}', {id});