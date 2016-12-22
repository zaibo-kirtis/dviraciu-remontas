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
);

set @wageid = LAST_INSERT_ID();

update `mechanic`
set date_last_payed = NOW()
where id = {id};

insert into `advance_payment` (sum, date, comment, wage_id)
values ({sum}, NOW(), '{comment}', @wageid);
