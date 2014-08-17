create table events(
    e_id int primary key,
    eDate text,
    eLocation text,
    eTime_s time,
	eTime_e time,
    scoret1 int,
	scoret2 int
);

--HOW TO USE:
-- SELECT loadCEvents(1);

create or replace function loadCEvents(in int, out text, out text, out time, out time, out int, out int) 

	returns setof record as

$$ 
     
	select eDate, eLocation, eTime_s, eTime_e, scoret1, scoret2 from events
    
                where e_id = $1;
    

$$
 
language 'sql';

--HOW TO USE:
-- SELECT setFixE(1, 'December 5, 2014', 'Iligan City', '08:00 AM', '04:00 PM');

create or replace function setFixE(p_e_id int,
	p_eDate text, p_eLocation text, 
	p_eTime_s time, p_eTime_e time) 
returns text as
$$
declare
  v_e_id int; 
begin
  select into v_e_id e_id from events
	where e_id = p_e_id;
  
  insert into events(e_id, eDate, 
	eLocation, eTime_s, eTime_e) values
	(p_e_id, p_eDate, p_eLocation, p_eTime_s, p_eTime_e);
      
    return 'OK';
  end;
$$
    language plpgsql;
    
	
--HOW TO USE:
-- SELECT setScore(1, 98, 100);

create or replace function setScore(p_e_id int,
	p_scoret1 int, p_scoret2 int) 
returns text as
$$
declare
  v_e_id int; 
begin
  select into v_e_id e_id from events
	where e_id = p_e_id;
  if v_e_id isnull then
	insert into events(scoret1, scoret2) values
	(p_scoret1, p_scoret2);
  else
	update events

	set scoret1 = p_scoret1, scoret2 = p_scoret2 where e_id = p_e_id;
	
	    
  end if;
    return 'OK';
  end;
$$
    language plpgsql;	
	
--HOW TO USE:
-- SELECT getScore(1);

create or replace function getScore(in int, out int, out int) 

	returns record as

$$ 
     
	select scoret1, scoret2 from events
    
                where e_id = $1;
    

$$
 
language 'sql';

--HOW TO USE:
-- SELECT ReSchedE(1, 'September 13, 2014','Cagayan','06:00 AM','03:00 PM');

create or replace function ReSchedE(p_e_id int,
	p_eDate text, p_eLocation text, 
	p_eTime_s time, p_eTime_e time) 
returns text as
$$
declare
  v_e_id int; 
begin
  select into v_e_id e_id from events
	where e_id = p_e_id;
  
  update events
	set eDate = p_eDate,eLocation = p_eLocation,eTime_s = p_eTime_s, eTime_e = p_eTime_e
          where e_id = p_e_id;
	    
    return 'OK';
  end;
$$
    language 'plpgsql';
