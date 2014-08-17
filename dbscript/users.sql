
CREATE EXTENSION pgcrypto;
CREATE TABLE users(
	userid int primary key,
	username text,
	password text,
	address text,
	contactno text
);

 
create or replace function
   changeUserAddress(p_username text, p_password text,p_address text)
     returns text as
$$
   declare
      originalpassword1 text;
      userpassword1 text;
	  contactno1 text;
	  userid1 int;
	  
   begin
      select into userpassword1 password from users where username = p_username; 
	  select into contactno1 contactno from users where username = p_username;
      select into userid1 userid contactno from users where username = p_username;  	  
	  
	   originalpassword1 = userpassword1;
	   userpassword1 = crypt(p_password,userpassword1);
      if originalpassword1 = userpassword1 then
          update users
			set   address = p_address
			--this gen_salt generates a new random salt string
			-- crypt() does the hashing
			where username = p_username;
     else
         return 'Your password did not match';
      end if;
	  return 'change successful';
  end;
$$
language 'plpgsql';
-- HOW TO USE :
-- SELECT changeUserAddress(p_username text, p_password text,p_address text); 

create or replace function 
   login(p_usernameinput text, p_passwordinput text)
     returns text as
   -- On progress: this function only checks if your username and password matches, if then your user exits on the database
   
$$
  declare 
	 originalpassword text;
	 passwordhasher text;
	 originalpassword1 text; -- for the meantime original password
  begin
  -- to store password to original password
     select into originalpassword password from users
		where username = p_usernameinput;  
  -- to store original password to original password1
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
   setuser(p_userid int,p_username text, p_password text,p_address text,p_contactno text)
     returns text as
$$
   declare
      originalpassword text;
      userid1 int;
   begin
      select into userid1 userid from users
         where userid = p_userid;
	  
      if userid1 isnull then
         insert into users(userid,username,password,address,contactno) values
            (p_userid,p_username,crypt(p_password, gen_salt('bf')),p_address,p_contactno);
     else
          update users
			set userid = p_userid,username = p_username, password = crypt(p_password, gen_salt('bf')),address = p_addres, contactno = p_contactno
			--this gen_salt generates a new random salt string
			-- crypt() does the hashing
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
   get_users_perid(in int, out int, out text,out text,out text)
returns setof record as
$$
	select userid,username,address,contactno from users
	where userid = $1;

$$
  language 'sql';

-- HOW TO USE:
-- SELECT get_users_perid(userid);
