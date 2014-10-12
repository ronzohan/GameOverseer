create table league (
     league_id serial primary key,
     managerid_fk serial references manager (Manager_id),
     name text,
     sport_type text,
     fixture_type text,
     results int[],
     teams text[],
     participants text[],
     locked int
);
 
--create language plpgsql;
-- controller
create or replace function setleague(p_managerid_fk int,p_name text,p_sport_type text, p_fixture_type text) 
    returns text as
$$
  declare     
     v_id int;
  begin
      select into v_id league_id  from league 
         where managerid_fk = p_managerid_fk and name = p_name and sport_type = p_sport_type and fixture_type = p_fixture_type;
         
      if v_id isnull then
          insert into league(managerid_fk,name, sport_type,fixture_type) values
             (p_managerid_fk, p_name, p_sport_type,p_fixture_type);
          return 'Successfully Created';	
      else
           update League
           set name = p_name,sport_type = p_sport_type,fixture_type = p_fixture_type
             where managerid_fk = p_managerid_fk and league_id = v_id;
			  return 'Successfull Updated';
      end if;   
         
    
  end;
$$
  language 'plpgsql'; 

--HOW TO USE:
--SELECT setleague(1,'Bundesliga','Football','Double Elimination');

--view
create or replace function get_league_perid(in int, out text, out text, out text) 
returns setof record as
$$ 
     select  name,sport_type,fixture_type from league
     where league_id = $1;
     
$$
language 'sql'; 
--HOW TO USE:
--select * from get_league_perid(1);

create or replace function get_league_by_manager(in int,out int, out text,out text,out text) 
returns setof record as
--if only 1 out, change setof records to setof <datatype>
$$ 
     select league_id,name, sport_type,fixture_type from league
     where managerid_fk = $1;
     
$$
 language 'sql';
--HOW TO USE:
--select * from get_league_by_manager(1);

--view
create or replace function 
    get_league_bracket_info(in int, out text,out int[],out text[],out text[],out int) 
returns setof record as
 
$$ 
     select  name,results,teams,participants,locked from league
     where league_id = $1;
     
$$
language 'sql';
--HOW TO USE:
--select * from get_league_bracket_info(1)

--view
create or replace function 
    get_league_byManagerLeagueID(in int, in int,out int[],out text[],out text[])
returns setof record as
 
$$ 
     select  results,teams,participants from league
     where league_id = $1;
     
$$
language 'sql';


-- controller
create or replace function deleteLeague(p_league_id int,p_managerid_fk int) 
    returns text as
$$
  declare     
     v_id int;
  begin
      select into v_id league_id  from league 
         where managerid_fk = p_managerid_fk and league_id = p_league_id;
         
      if v_id isnull then
          return 'Failed to delete';	
      else
      	     delete from league 
             where managerid_fk = p_managerid_fk and league_id = v_id;
			  return 'Successfully Deleted!';
      end if;   
         
    
  end;
$$
  language 'plpgsql'; 
  

create or replace function addTeamsInLeague(p_league_id int,p_managerid_fk int,p_participant_team text) 
    returns text as
$$
  declare     
     v_id int;
  begin
      select into v_id league_id from league 
         where managerid_fk = p_managerid_fk and league_id = p_league_id;
         
      if v_id isnull then
		return 'Failed';	
      else
        update League
           set participants = participants || p_participant_team
             where managerid_fk = p_managerid_fk and league_id = v_id;
        return 'Success';
      end if;  
       
    
  end;
$$
  language 'plpgsql';

create or replace function deleteTeamsInLeague(p_league_id int,p_managerid_fk int,p_participant_team text) 
    returns text as
$$
  declare     
     v_id int;
  begin
      select into v_id league_id from league 
         where managerid_fk = p_managerid_fk and league_id = p_league_id;
         
      if v_id isnull then
		return 'Failed';	
      else 
        update league
           set participants = array_erase(participants,p_participant_team)
             where managerid_fk = p_managerid_fk and league_id = v_id;
        return 'Success';
      end if;  
       
    
  end;
$$
  language 'plpgsql';
  
CREATE OR REPLACE FUNCTION array_erase(anyarray, anyelement) 
RETURNS anyarray AS $$
  SELECT ARRAY(SELECT v FROM unnest($1) g(v) WHERE v <> $2)
$$ LANGUAGE sql;

--HTU: select array_erase(array[1,2,3,2,5], 2);
   create or replace function
   get_leaguename(in text, out text)
returns text as
$$
	select name from league
	where LOWER(name)= $1;
    
$$
  language 'sql';

-- HOW TO USE:
-- select * from get_leaguename(name)


create or replace function lockleague(p_league_id int,p_managerid_fk int,p_userid int) 
    returns text as
$$
  declare     
     v_id int;
  begin
      
      select into v_id league_id
		from league inner join users on users.userid=$3 
		where league_id = $1 and managerid_fk =$2;
         
      if v_id isnull then
		return 'Failed';	
      else 
		update league set locked = 1 where league_id = $1;
		return 'Success';
      end if;  
  end;
$$
  language 'plpgsql';
 
-- HOW TO USE:
-- select * from lockleague(1,1,1) 

create or replace function setbracketinfo(p_league_id int,p_managerid_fk int,p_userid int,p_results int[], p_teams text[]) 
    returns text as
$$
  declare     
     v_id int;
  begin
      
      select into v_id league_id
		from league inner join users on users.userid=$3 
		where league_id = $1 and managerid_fk =$2;
         
            
      if v_id isnull then
		return 'Failed';	
      else 
		update league set results = p_results,teams=p_teams where league_id = $1;
		return 'Success';
      end if;  
  end;
$$
  language 'plpgsql';

-- HOW TO USE:
-- select * from setbracketinfo(1,1,1,*,*) 

 create or replace function setbracketinforesults(p_league_id int,p_managerid_fk int,p_results int[]) 
    returns text as
$$
  declare     
     v_id int;
  begin
      
      select into v_id league_id from league
    where league_id = $1 and managerid_fk =$2;
         
            
      if v_id isnull then
        return 'Failed';  
      else 
        update league set results = p_results where league_id = $1;
    return 'Success';
      end if;  
  end;
$$
  language 'plpgsql';
