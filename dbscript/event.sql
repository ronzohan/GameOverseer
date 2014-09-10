create table events(
    e_id serial primary key,
    teamID1_FK serial references team (team_id),
    teamID2_FK serial references team (team_id),
    leagueID_FK serial references league (league_id),
    eDate date,
    eLocation text,
    eTime_start time with time zone,
    eTime_end time with time zone,
    scoret1 int,
	scoret2 int
);


--HOW TO USE:
-- SELECT loadCEvents(1);

create or replace function loadCEvents(in int, out date, out text, 
									   out time with time zone, 
									   out time with time zone, 
									   out int, out int) 
	returns setof record as

$$ 
    select eDate, eLocation, eTime_start, eTime_end, scoret1, scoret2 from events
				where e_id = $1;
$$
 
	language 'sql';


--HOW TO USE:
-- SELECT setFixE(1,1,1,'December 5, 2014', 'Iligan City', '08:00 AM', '04:00 PM');

create or replace function setFixE(p_teamID1_FK int, p_teamID2_FK int, 
								   p_leagueID_FK int, p_eDate date, 
								   p_eLocation text, p_eTime_start time with time zone, 
								   p_eTime_end time with time zone) 
returns text as

$$
declare
  v_e_id int; 

begin
  select into v_e_id e_id from events
	where teamID1_FK = p_teamID1_FK and teamID2_FK = p_teamID2_FK and leagueID_FK = p_leagueID_FK;
  
  insert into events(teamID1_FK, teamID2_FK, leagueID_FK, eDate, 
					eLocation, eTime_start, eTime_end) 
					values
					(p_teamID1_FK, p_teamID2_FK, p_leagueID_FK, 
					p_eDate, p_eLocation, p_eTime_start, p_eTime_end);
  return 'OK';
  end;
$$

    language 'plpgsql';
    
	
--HOW TO USE:
-- SELECT setScore(1, 98, 100);

create or replace function setScore(p_e_id int, p_scoret1 int, 
										p_scoret2 int) 
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
		set scoret1 = p_scoret1, scoret2 = p_scoret2 
		where e_id = p_e_id;
	
  end if;

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
-- SELECT getScore(1);

create or replace function getStart(in int, out date, out time with time zone) 
	returns record as

$$ 
    select eDate, eTime_start from events
				where e_id = $1;
$$
 
	language 'sql';
	
--HOW TO USE:
-- SELECT ReSchedE(1, 'September 13, 2014','Cagayan','06:00 AM','03:00 PM');

create or replace function ReSchedE(p_e_id int, p_teamID1_FK int, 
									p_teamID2_FK int, p_leagueID1_FK int,
									p_eDate date, p_eLocation text, 
									p_eTime_start time with time zone, 
									p_eTime_end time with time zone) 
returns text as

$$
declare
  v_e_id int; 

begin
  select into v_e_id e_id from events
	where e_id = p_e_id and teamID1_FK = p_teamID1_FK 
						and teamID2_FK = p_teamID2_FK 
						and leagueID_FK = p_leagueID_FK;
  
  update events
	set teamID1_FK = p_teamID1_FK, teamID2_FK = p_teamID2_FK, 
		leagueID_FK = p_leagueID_FK, eDate = p_eDate,eLocation = p_eLocation,
		eTime_start = p_eTime_start, eTime_end = p_eTime_end
        where 
		e_id = p_e_id and teamID1_FK = p_teamID1_FK 
		and teamID2_FK = p_teamID2_FK and leagueID_FK = p_leagueID_FK;
	    
    return 'OK';
end;
$$

    language 'plpgsql';
