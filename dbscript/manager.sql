CREATE TABLE Manager(
    Manager_id int primary key,
    manager_name text,
    address text,
    contact_no int
    );

create or replace 
    function setmanager(p_manager_id int, p_manager_name text, p_address text, p_contact_no int) 
    returns text as
$$
  declare
     v_manager_id int;
  begin
      select into v_manager_id manager from Manager 
         where manager_id = p_manager_id;
         
      if v_manager_id isnull then
          insert into Manager(manager_id, manager_name,address,contact_no) values
             (p_manager_id, p_manager_name, p_address, p_contact_no);
      else
          update Manager
          set manager_name = p_manager_name,address = p_address,contact_no = p_contact_no
          where manager_id = p_manager_id;
      end if;   
         
      return 'OK';
  end;
  $$
  language 'plpgsql';

--SELECT setmanager(1, 'ron','ronron',1234);

create or replace function 
    get_Manager_per_id(in int, out text, out text, out int) 
returns record as
$$ 
     select manager_name, address, contact_no from Manager
     where manager_id = $1;
     
$$
 language 'sql';

--select * from  get_Manager_per(1);
