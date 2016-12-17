select
    payment.sum as sum,
    payment.date as date,
    payment.comment as comment,
    payment.receipt_id as receipt_id
from payment