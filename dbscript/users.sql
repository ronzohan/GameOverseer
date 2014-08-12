
CREATE TABLE users(

    user_id int primary key,
    username text,
    password text

); 


create or replace  
     function setuser(p_username text, p_password text)
     returns text as

$$
  declare
     v_use int;
  begin
     select into v_use username from users
        where username = p_username;

     if v_use isnull then
        insert into users(username,password) values
           (p_username, md5('blah-blah-' + p_password ));
     else
        update users
          set username = p_username, password = md5('blah-blah-' + p_password)
          where username = p_username;
     end if;

     return 'OK';
  end;
$$
  language 'plpgsql';
-- HOW TO USE :
-- SELECT setuser('yourUsername','yourPassword');

--view
create or replace function
   get_users_perid(in int, out text, out text)
returns setof record as
$$
	select username,password from users
	where user_id = $1;

$$
  language 'sql';

-- HOW TO USE:
-- select * from get_user_perid(1);

         
