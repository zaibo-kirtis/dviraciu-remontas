select
    wage.sum as sum,
    wage.work_hours as work_hours,
    wage.deductibles as deductibles,
    wage.pvm as pvm,
    wage.comment as comment,
    wage.penalty as penalty,
    wage.date_confirmed as date_confirmed,
    acc.first_name as acc_first_name,
    acc.last_name as acc_last_name,
    mech.first_name as mech_first_name,
    mech.last_name as mech_last_name
from wage
    join accountant acc on wage.accountant_id = acc.id
    join mechanic mech on wage.mechanic_id = mech.id
where wage.id = {id};