insert into `payment` (
    id,
    sum,
    date,
    comment,
    receipt_id
) values (
    {id},
    {sum},
    NOW(),
    '{comment}',
    {receipt_id}
) on duplicate key update
    id = last_insert_id(id),
    sum = values(sum),
    date = NOW(),
    comment = values(comment),
    receipt_id = values(receipt_id);

set @sum = (select sum from receipt where id = {receipt_id}) - (select sum(sum) from payment where receipt_id = {receipt_id});

set @state = (select if(@sum > 0, 1, 2));

update receipt set receipt_state_id = @state where id = {receipt_id};

