SELECT
sum,
work_hours,
deductibles,
pvm,
comment,
penalty,
date_confirmed,
accountant_id,
mechanic_id,
mechanic.first_name as first_name,
mechanic.last_name as last_name
FROM `wage`
join mechanic on wage.mechanic_id = mechanic.id
WHERE date_confirmed > '{from}' AND date_confirmed < '{to}'