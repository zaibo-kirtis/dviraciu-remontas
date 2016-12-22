SELECT
work_hours,
deductibles,
pvm,
comment,
penalty,
date_confirmed,
accountant_id,
mechanic_id
FROM `wage`
WHERE date_confirmed > '{from}' AND date_confirmed < '{to}'