create table team(
    team_id int primary key,
    name text not null,
    hometown text not null
);

--create language plpgsql;
--controller
create or replace
    function setteam(p_team_id int,p_name text,p_hometown text)
    returns text as 
$$
  declare
      v_name text;
  begin
      select into v_name name from team where name = p_name;
      
      if v_name isnull then
          insert into team(team_id,name,hometown) values (p_team_id,p_name,p_hometown);
      else
          update team 
            set hometown = p_hometown,name = v_name
              where team_id = p_team_id;
      end if;

      return 'OK';
  end;
$$
  language 'plpgsql'; 


--HOW TO USE:
-- SELECT setteam(1, 'Chelsea','London,England')




--view
create or replace function 
    get_team_per_name(in text,out int,out text, out text) 
returns setof record as
$$ 
     select team_id,name, hometown from team
     where name = $1;     
$$
 language 'sql';
-- HOW TO USE:
-- select * from get_team_per_name('Chelsea');


--view
create or replace function 
    get_allTeams(out int,out text, out text) 
returns setof record as
$$ 
     select team_id,name, hometown from team   
$$
 language 'sql';
-- HOW TO USE:
-- select * from get_team_per_name('Chelsea');
