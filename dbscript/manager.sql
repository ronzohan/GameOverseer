CREATE TABLE Manager(
    Manager_id serial primary key,
    userid_fk serial references users (userid),
    first_name text,
    last_name text,
    address text,
    contact_no text,
	email text,
    tempManager int,
	tempManLeague text,
	gatePass text
    );

	
create or replace 
    function removeAuthority(p_manager_id int) 
    returns text as
$$
  declare
     v_manager_id int;
  begin
      select into  v_manager_id manager_id from Manager 
         where manager_id = p_manager_id;
         
      if v_manager_id isnull then
          return  'None';
      else
          update Manager
          set tempManager = null, gatePass = null, tempManLeague = null
          where manager_id = p_manager_id;
      end if;   
         
      return 'OK';
  end;
  $$
  language 'plpgsql';

--SELECT removeAuthority(1);
	
create or replace 
    function setAuthority(p_manager_id int, p_tempManager int, p_gatePass text, p_tempManLeague int) 
    returns text as
$$
  declare
     v_manager_id int;
  begin
      select into  v_manager_id manager_id from Manager 
         where manager_id = p_manager_id;
         
      if v_manager_id isnull then
          insert into Manager(tempManager, gatePass, tempManLeague) values
             (p_tempManager, p_gatePass, p_tempManLeague);
      else
          update Manager
          set tempManager = p_tempManager, gatePass = p_gatePass, tempManLeague = p_tempManLeague
          where manager_id = p_manager_id;
      end if;   
         
      return 'OK';
  end;
  $$
  language 'plpgsql';

--SELECT setAuthority(1, 2,'12345', 1);

	
create or replace 
    function checkemail(p_email text) 
    returns text as
$$
  declare
     v_manager_id int;
  begin
      select into  v_manager_id manager_id from Manager 
         where email = p_email;
         
      if v_manager_id isnull then
          return 'true';
      else
           return 'false';
      end if;   
         
      return 'OK';
  end;
  $$
  language 'plpgsql';

--SELECT checkemail(ron@yolo.com);

	
create or replace 
    function setmanager(p_userid int,p_first_name text,p_last_name text,p_address text, p_contact_no text,p_email text) 
    returns text as
$$
  declare
     v_manager_id int;
  begin
      select into  v_manager_id manager_id from Manager 
         where userid_fk = p_userid;
         
      if v_manager_id isnull then
          insert into Manager(userid_fk,first_name,last_name,address,contact_no,email) values
             (p_userid,p_first_name,p_last_name, p_address, p_contact_no, p_email);
      else
          update Manager
          set first_name = p_first_name,last_name = p_last_name,address = p_address,contact_no = p_contact_no, email = p_email
          where userid_fk = p_userid;
      end if;   
         
      return 'OK';
  end;
  $$
  language 'plpgsql';

--SELECT setmanager(1, 'ron','magno','iligan city',1234,ron@yolo.com);

 

create or replace function 
    get_Manager_per_id(in int,out text,out text,out text, out text,out text) 
returns record as
$$ 
     select first_name,last_name, address, contact_no,email from Manager
     where manager_id = $1;
     
$$
 language 'sql';

--select * from  get_Manager_per_id(1);



create or replace function
   getManagerPerUserId(in int, out int)
returns int as
$$
	select manager_id from manager
	where userid_fk = $1
    
$$
  language 'sql';

-- HOW TO USE:
-- select * from getManagerPerUserId(1)


create or replace function
   getmanager(in int)
returns text as
$$
	select first_name,last_name from manager
	where tempManager = $1
    
	 return first_name + " "+lastname;
$$
  language 'plpgsql';

-- HOW TO USE:
-- select getmanager(1)
