create table results(
	 results_pk serial primary key,
	 leagueid int,
    resultid int,
    score int,
    eventid int
);

--create language plpgsql;
--controller
create or replace
    function setresult(p_leagueid int,p_resultid int,p_eventid int,p_score int)
    returns text as 
$$
  declare
      v_leagueid int;
      v_resultid int;
  begin
      select into v_leagueid leagueid,v_resultid resultid from results where leagueid = p_leagueid and resultid = p_resultid;
      
      if v_leagueid isnull then
          insert into results(leagueid,resultid,score,eventid) values (p_leagueid,p_resultid,p_score,p_eventid);
      else if p_eventid isnull then
          update results 
            set score = p_score 
              where leagueid = p_leagueid and resultid = p_resultid;

      else
          update results 
            set score = p_score, eventid = p_eventid
              where leagueid = p_leagueid and resultid = p_resultid;
      end if;
      end if;
      return 'OK';
  end;
$$
  language 'plpgsql'; 


--HOW TO USE:
-- SELECT setresult(1,0,20)

--view
create or replace function 
    getresult(in int,in int,out int,out int) 
returns setof record as
$$ 
     select score,eventid from results
     where leagueid = $1 and resultid = $2;
$$
 language 'sql';
-- HOW TO USE:
-- select * from getresult(1,0);

create or replace function 
    getresultsinleague(in int,out int,out int) 
returns setof record as
$$ 
     select results_pk, score from results
     where leagueid = $1 ORDER BY resultid ASC 
$$
 language 'sql';
-- HOW TO USE:
-- select * from getresult(1,0); 