create table league (
     league_id serial primary key,
     managerid_fk serial references manager (Manager_id),
     name text,
     sport_type text,
     fixture_type text,
);

--create language plpgsql;
-- controller
create or replace 
    function setleague(p_managerid_fk int,p_name text,p_sport_type text, p_fixture_type text) 
    returns text as
$$
  declare     
     v_id int;
  begin
      select into v_id id  from league 
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
create or replace function 
    get_league_perid(in int, out text, out text, out text) 
returns setof record as
$$ 

     select  name, sport_type,fixture_type from league
     where league_id = $1;
     
$$
--HOW TO USE:
--select * from get_league_perid(1);

--view
create or replace function 
    get_league_bracket_info(in int, out int[],out text[]) 
returns setof record as
 
$$ 
     select  results,teams from league
     where league_id = $1;
     
$$
create or replace function 
    get_league_by_manager(in int,out int, out text,out text,out text) 
returns setof record as
--if only 1 out, change setof records to setof <datatype>
$$ 
     select  league_id,name, sport_type,fixture_type from league
     where managerid_fk = $1;
     
$$
 language 'sql';
 --HOW TO USE:
--select * from get_league_by_manager(1);