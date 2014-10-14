create table events(
    e_id serial primary key,
    teamname1 text,
    teamname2  text,
    leagueID_FK serial references league (league_id),
    eDate date,
    eLocation text,
    eTime_start time,
    eTime_end time,
    scoret1 int,
	scoret2 int
);


--HOW TO USE:
-- SELECT loadCEvents(1);

create or replace function loadCEvents(in int, out date, out text, 
									   out time, 
									   out time, 
									   out int, out int,out text,out text) 
	returns setof record as

$$ 
    select eDate, eLocation, eTime_start, eTime_end, scoret1, scoret2,teamname1,teamname2 from events
				where e_id = $1;
$$
 
	language 'sql';


--HOW TO USE:
-- SELECT setFixE('Norwich','Chelsea',2,'December 5, 2014', 'Iligan City', '08:00 AM', '04:00 PM');

create or replace function setFixE(p_teamname1 text, p_teamname2 text, 
								   p_leagueID_FK int, p_eDate date, 
								   p_eLocation text, p_eTime_start time, 
								   p_eTime_end time) 
returns text as

$$
declare
  v_e_id int; 
  v_temp_id int;
begin
  select into v_e_id e_id from events
	where teamname1 = p_teamname1 and teamname2 = p_teamname2 and leagueID_FK = p_leagueID_FK;
  
   insert into events(teamname1, teamname2, leagueID_FK, eDate, 
					eLocation, eTime_start, eTime_end) 
					values
					(p_teamname1, p_teamname2, p_leagueID_FK, 
					p_eDate, p_eLocation, p_eTime_start, p_eTime_end)
  returning e_id into v_temp_id;
  
  return v_temp_id;
  end;
$$

    language 'plpgsql';
    
	
--HOW TO USE:
-- SELECT setScoreT1(1, 98);

create or replace function setScoreT1(p_e_id int, p_scoret1 int) 
returns text as

$$
declare
  v_e_id int; 

begin
  select into v_e_id e_id from events
	where e_id = p_e_id;  
	
	update events
		set scoret1 = p_scoret1
		where e_id = p_e_id;
	

	return 'OK';
  
  end;
$$
    language 'plpgsql';	

	
--HOW TO USE:
-- SELECT setScoreT2(1, 98);

create or replace function setScoreT2(p_e_id int, p_scoret2 int) 
returns text as

$$
declare
  v_e_id int; 

begin
  select into v_e_id e_id from events
	where e_id = p_e_id;  
	
	update events
		set scoret2 = p_scoret2
		where e_id = p_e_id;
	
 

	return 'OK';
  
  end;
$$
    language 'plpgsql';	
	
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
-- SELECT getStart(1);

create or replace function getStart(in int, out date, out time) 
	returns record as

$$ 
    select eDate, eTime_start from events
				where e_id = $1;
$$
 
	language 'sql';
	
--HOW TO USE:
-- SELECT ReSchedE(1, 'September 13, 2014','Cagayan','06:00 AM','03:00 PM');

create or replace function ReSchedE(p_e_id int, p_eDate date, p_eLocation text, 
									p_eTime_start time, 
									p_eTime_end time) 
returns text as

$$
declare
  v_e_id int; 

begin
  select into v_e_id e_id from events
	where e_id = p_e_id;
  
  update events
	set eDate = p_eDate,eLocation = p_eLocation,
		eTime_start = p_eTime_start, eTime_end = p_eTime_end
        where 
		e_id = p_e_id ;
	    
    return 'OK';
end;
$$

    language 'plpgsql';
	


create or replace function getEventWithLeagueID(in int,out int,out text,out text,out date,
													out text,out time,out time,out text) 
		returns record as

	$$ 
	SELECT leagueid_fk,teamname1,teamname2,
	edate,eLocation,eTime_start,eTime_end,league.name
FROM events INNER JOIN league ON events.leagueid_fk = league.league_id WHERE e_id = $1
	$$
	 
		language 'sql';
		