create table events(
    e_id int primary key,
    eDate text,
    eLocation text,
    eTime text,
    scores int
);

--HOW TO USE:
-- SELECT loadCEvents(1);

create or replace function loadCEvents(in int, out text, out text, out text) 

	returns setof record as

$$ 
     
	select eDate, eLocation, eTime from events
    
                where e_id = $1;
    

$$
 
language 'sql';

--HOW TO USE:
-- SELECT setFixE(1, 'December 5, 2014', 'Iligan City', '9:00 - 5:00 pm');

create or replace function setFixE(p_e_id int,
	p_eDate text, p_eLocation text, 
	p_eTime text) 
returns text as
$$
declare
  v_e_id int; 
begin
  select into v_e_id e_id from events
	where e_id = p_e_id;
  if v_e_id isnull then
	insert into events(e_id, eDate, 
	eLocation, eTime) values
	(p_e_id, p_eDate, p_eLocation, p_eTime);
  else
	update events

	set eDate = p_eDate where e_id = p_e_id;
	
	update events
	set eDate = p_eLocation where e_id = p_e_id;
	
	update events
	set eTime = p_eTime where e_id = p_e_id;
	    
  end if;
    return 'OK';
  end;
$$
    language plpgsql;
	
--HOW TO USE:
-- SELECT setScore(1, 20);

create or replace function setScore(p_e_id int,
	p_score int) 
returns text as
$$
declare
  v_e_id int; 
begin
  select into v_e_id e_id from events
	where e_id = p_e_id;
  if v_e_id isnull then
	insert into events(scores) values
	(p_score);
  else
	update events

	set score = p_score where e_id = p_e_id;
	
	    
  end if;
    return 'OK';
  end;
$$
    language plpgsql;	
	
--HOW TO USE:
-- SELECT getobj1(1);

create or replace function getScore(in int, out int) 

	returns int as

$$ 
     
	select scores from events
    
                where e_id = $1;
    

$$
 
language 'sql';

create or replace function ReScedE(p_e_id int,
	p_eDate text, p_eLocation text, 
	p_eTime text) 
returns text as
$$
declare
  v_e_id int; 
begin
  select into v_e_id e_id from events
	where e_id = p_e_id;
  
    update events

	set eDate = p_eDate where e_id = p_e_id;
	
	update events
	set eDate = p_eLocation where e_id = p_e_id;
	
	update events
	set eTime = p_eTime where e_id = p_e_id;
	    
  end if;
    return 'OK';
  end;
$$
    language plpgsql;
