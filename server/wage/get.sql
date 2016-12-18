SELECT
work_hours_count * 6 as sum,
work_hours_count * 6 * 0.1 as deductibles,
work_hours_count * 6 * 0.27 as pvm,
first_name,
last_name,
date_last_payed as date_last_payed,
work_hours_count as work_hours,
curdate() as date,
id
FROM `mechanic`
where mechanic.id = {id};