SELECT
work_hours_count * 6 as wage,
work_hours_count * 6 * 0.1 as deductibles,
work_hours_count * 6 * 0.27 as pvm,
first_name,
last_name,
work_hours_count,
curdate() as date,
id
FROM `mechanic`
