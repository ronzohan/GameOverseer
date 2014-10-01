from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, league_id):
    league_id = cgi.escape(league_id)

    x = doSql()
    rets = x.execqry("select * from get_league_perid('" + \
    league_id +  "');", False)
    result = []
    
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
	

def getBracketInfo(req,league_id):
    league_id = cgi.escape(league_id)

    x = doSql()
    rets = x.execqry("select * from get_league_bracket_info('" \
    + league_id +  "');", False)
    
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)
        
    return json.dumps(rets)

def getLeagueInfoByManager(req,managerid):
    managerid = cgi.escape(managerid)

    x = doSql()
    rets = x.execqry("select * from get_league_by_manager('" + \
    managerid +  "');", False)
    result = []
    
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
	

def setleague(req,managerid,leaguename,fixturetype,sport):
    leaguename = cgi.escape(leaguename)
    fixturetype = cgi.escape(fixturetype)
    sport = cgi.escape(sport)

    x = doSql()
    rets = x.execqry("select * from setleague('" + managerid +  "'," \
    " '"+leaguename+"','"+sport+"','"+fixturetype+"');", True)
    result = []
    
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)
    
    return json.dumps(result)
	
def deleteLeague(req,leagueid,managerid):
    leagueid = cgi.escape(leagueid)
    managerid = cgi.escape(managerid)

    x = doSql()
    rets = x.execqry("select * from deleteLeague("+leagueid+"," + managerid+");",True)
    return json.dumps(rets)
 
def addTeamsInLeague(req,leagueid,managerid,participantTeam):
    leagueid = cgi.escape(leagueid)
    managerid = cgi.escape(managerid)
    participantTeam = cgi.escape(participantTeam)
	
    x = doSql()
    rets = x.execqry("select addTeamsInLeague("+leagueid+"," + managerid+",'"+participantTeam+"');",True)
    return json.dumps(rets)

def deleteTeamInLeague(req,leagueid,managerid,participantTeam):
    leagueid = cgi.escape(leagueid)
    managerid = cgi.escape(managerid)
    participantTeam = cgi.escape(participantTeam)
 
    x = doSql()
    rets = x.execqry("select deleteTeamsInLeague("+leagueid+"," + managerid+",'"+participantTeam+"');",True)
    return json.dumps(rets)

def lockLeague(req,leagueid,managerid,userid):
    leagueid = cgi.escape(leagueid)
    managerid = cgi.escape(managerid)
    userid = cgi.escape(userid);
    
    x = doSql()
    rets = x.execqry("select lockleague("+leagueid+"," + managerid+","+userid+");",True)
    return json.dumps(rets)

def setBracketInfo(req,leagueid,managerid,userid,results,participants):
    leagueid = cgi.escape(leagueid)
    managerid = cgi.escape(managerid)
    userid = cgi.escape(userid)
    
    participants = participants.replace('[', '{').replace(']', '}').replace('\'', '\"')
    x = doSql()
    rets = x.execqry("select setbracketinfo("+leagueid+"," + managerid+","+userid+",Array[]::integer[]"+",'"+participants+"');",True)
   
    return json.dumps(rets)

def setbracketinforesults(req,leagueid,managerid,results):
    leagueid = cgi.escape(leagueid)
    managerid = cgi.escape(managerid)
    
    results = results.replace('null','-1');
    x = doSql()
    rets = x.execqry("select setbracketinforesults("+leagueid+"," + managerid
    +",Array"+results+");",True)
   
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)
    
    return json.dumps(result)
