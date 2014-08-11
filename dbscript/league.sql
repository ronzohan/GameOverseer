create table league (
     league_id int primary key,
     league_name text,
     sport_type text,
     fixture_type text
);

--create language plpgsql;
-- controller
create or replace 
    function setleague(p_league_id int, p_league_name text,p_sport_type text, p_fixture_type text) 
    returns text as
$$
  declare
     v_league_id int;
  begin
      select into v_league_id league_id from league 
         where league_id = p_league_id;
         
      if v_league_id isnull then
          insert into league(league_id, league_name, sport_type,fixture_type) values
             (p_league_id, p_league_name, p_sport_type,p_fixture_type);
      else
           update League
           set league_name = p_league_name,sport_type = p_sport_type,fixture_type = p_fixture_type
             where league_id = p_league_id;

      end if;   
         
      return 'OK';
  end;
$$
  language 'plpgsql'; 

--HOW TO USE:
--SELECT setleague(1,'Bundesliga','Football','Double Elimination');;

--view
create or replace function 
    get_league_perid(in int, out text, out text, out text) 
returns setof record as
$$ 
     select  league_name, sport_type,fixture_type from league
     where league_id = $1;
     
$$
 language 'sql';