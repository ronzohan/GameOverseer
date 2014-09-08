
CREATE EXTENSION pgcrypto;
CREATE TABLE users(
	userid serial primary key,
	username text unique,
	password text,
	fullname text,
	email text,
	contactno text,
	address text
);

 

create or replace function 
   login(p_usernameinput text, p_passwordinput text)
     returns text as
   -- On progress: this function only checks if your username and password matches, if then your user exits on the database
   
$$
  declare 
	 originalpassword text;
	 passwordhasher text;
	 v_userid int;
	 originalpassword1 text; -- for the meantime original password
  begin
  -- to store password to original password
     select into originalpassword password from users
		where username = p_usernameinput;  
  -- to store original password to original password1
	 originalpassword1 = originalpassword;
	 originalpassword= crypt(p_passwordinput, originalpassword); 
     select into v_userid userid from users where username = p_usernameinput;
     if originalpassword1 = originalpassword then
		 return 'OK';
		 
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
   setuser(p_username text, p_password text,p_fullname text,p_email text ,p_contactno text ,p_address text)
     returns text as
$$
   declare
      userid1 int;
   begin
      select into userid1 userid from users
         where username = p_username;
	  
      if userid1 isnull then
         insert into users(username,password,fullname,email,contactno,address) values
            (p_username,crypt(p_password, gen_salt('bf')),p_fullname,p_email,p_contactno,p_address);
     else
          update users
			set username = p_username, password = crypt(p_password, gen_salt('bf')) , 
			fullname= p_fullname, email = p_email, contactno = p_contactno, address = p_address
			--this gen_salt generates a new random salt string
			-- crypt() does the hashing
			where username = p_username;
      end if;
	  return 'OK';
  end;
$$
language 'plpgsql';
-- HOW TO USE :
-- SELECT setuser('p_username' , 'p_password','p_fullname' ,'p_email ','p_contactno ' ,'p_address ')

--view
create or replace function
   get_users_perid(in int, out int, out text, out text, out text, out text, out text)
returns setof record as
$$
	select userid,username,fullname,email,contactno,address from users
	where userid = $1;

$$
  language 'sql';

-- HOW TO USE:
-- select * from get_users_perid(userid)
