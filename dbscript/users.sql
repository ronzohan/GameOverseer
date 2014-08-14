
CREATE TABLE users(

    userid int primary key,
    username text,
    password text

); 


create or replace  
     function setuser(p_userid int,p_username text, p_password text)
     returns text as

$$
  declare
     v_use int;
  begin
     select into v_use userid from users
		where userid = p_userid; 
     if v_use isnull then
		insert into users(userid,username,password) values
           (p_userid,p_username,crypt(p_password, gen_salt('bf')));
	else
        update users
          set userid = p_userid,username = p_username, password = crypt(p_password, gen_salt('bf'))
          where username = p_username;
     end if;

     return 'OK';
  end;
$$
  language 'plpgsql';
-- HOW TO USE :
-- SELECT setuser(userid,'yourUsername','yourPassword');

--view
create or replace function
   get_users_perid(in int, out int, out text)
returns setof record as
$$
	select userid,username from users
	where userid = $1;

$$
  language 'sql';

-- HOW TO USE:
-- select * from get_user_perid(userid)

         