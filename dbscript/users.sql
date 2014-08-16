

CREATE EXTENSION pgcrypto;
CREATE TABLE users(
	userid int primary key,
	username text,
	password text
);


create or replace function 
   login(p_usernameinput text, p_passwordinput text)
     returns text as

$$
  declare 
	 originalpassword text;
	 passwordhasher text;
	 originalpassword1 text;
  begin
     select into originalpassword password from users
		where username = p_usernameinput;  
	 originalpassword1 = originalpassword;
	 originalpassword= crypt(p_passwordinput, originalpassword);
     if originalpassword1 = originalpassword then
		 return 'User Exist in the database, You are able to login';
		 
	else
        return 'Your password did not match';
     end if;

     return 'OK';
  end;
$$
  language 'plpgsql';
-- HOW TO USE :
-- SELECT login('yourUsername','yourPassword');


create or replace function
   setuser(p_userid int,p_username text, p_password text)
     returns text as
$$
   declare
      userid1 int;
   begin
      select into userid1 userid from users
         where userid = p_userid;
	  
      if userid1 isnull then
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
