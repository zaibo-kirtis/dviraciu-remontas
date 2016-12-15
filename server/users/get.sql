select
    email,
    user_group_id as userGroup,
    password
from `user`
    where email = '{username}';