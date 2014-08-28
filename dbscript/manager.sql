CREATE TABLE Manager(
    Manager_id serial primary key,
    userid_fk serial references users (userid),
    first_name text,
    last_name text,
    address text,
    contact_no int
    );

create or replace 
    function setmanager(p_userid int,p_first_name text,p_last_name text,p_address text, p_contact_no int) 
    returns text as
$$
  declare
     v_manager_id int;
  begin
      select into  v_manager_id manager_id from Manager 
         where userid_fk = p_userid;
         
      if v_manager_id isnull then
          insert into Manager(userid_fk,first_name,last_name,address,contact_no) values
             (p_userid,p_first_name,p_last_name, p_address, p_contact_no);
      else
          update Manager
          set first_name = p_first_name,last_name = p_last_name,address = p_address,contact_no = p_contact_no
          where manager_id = p_manager_id;
      end if;   
         
      return 'OK';
  end;
  $$
  language 'plpgsql';

--SELECT setmanager(1, 'ron','magno','iligan city',1234);

create or replace function 
    get_Manager_per_id(in int,out text,out text,out text, out int) 
returns record as
$$ 
     select first_name,last_name, address, contact_no from Manager
     where manager_id = $1;
     
$$
 language 'sql';

--select * from  get_Manager_per_id(1);
