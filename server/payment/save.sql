insert into `payment` (
    sum,
    date,
    comment,
    receipt_id
) values (
    {sum},
    NOW(),
    '{comment}',
    {receipt_id}
) on duplicate key update
    sum = values(sum),
    date = NOW(),
    comment = values(comment),
    receipt_id = values(receipt_id);