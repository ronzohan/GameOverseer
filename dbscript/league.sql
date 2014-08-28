create table league (
     league_id serial primary key,
     managerid_fk serial references manager (managerid),
     name text,
     sport_type text,
     fixture_type text
);

--create language plpgsql;
-- controller
create or replace 
    function setleague(p_managerid_fk int,p_name text,p_sport_type text, p_fixture_type text) 
    returns text as
$$
  declare
     v_name text;
  begin
      select into v_name name from league 
         where managerid_fk = p_managerid_fk and name = p_name and sport_type = p_sport_type and fixture_type = p_fixture_type;
         
      if v_name isnull then
          insert into league(managerid_fk,name, sport_type,fixture_type) values
             (p_managerid_fk, p_name, p_sport_type,p_fixture_type);
      else
           update League
           set name = p_name,sport_type = p_sport_type,fixture_type = p_fixture_type
             where managerid_fk = p_managerid_fk;

      end if;   
         
      return 'OK';
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

 language 'sql';
