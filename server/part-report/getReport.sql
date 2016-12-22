SELECT
part.price,
part.name,
part.manufacturer,
part.description,
part.warranty_for as warrantyFor
FROM `order`
join part_order as po on po.order_id = id
join part as part on po.part_id = part.id
WHERE date_created > '{from}' AND date_created < '{to}'