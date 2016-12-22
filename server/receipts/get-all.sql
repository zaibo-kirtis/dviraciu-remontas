select
    receipt.sum as sum,
    receipt.date_created as date_created,
    receipt.date_to_be_paid as date_to_be_paid,
    receipt.comment as comment,
    receipt.order_id as order_id,
    rs.id as receipt_state,
    ord.id as order_id,
    client.first_name as first_name,
    client.last_name as last_name
from receipt
    join receipt_state rs on receipt.receipt_state_id = rs.id
    join client on receipt.client_id = client.id
    join `order` ord on receipt.order_id = ord.id