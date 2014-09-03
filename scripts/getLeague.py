from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, league_id):
    league_id = cgi.escape(league_id)

    x = doSql()
    rets = x.execqry("select * from get_league_perid('" + league_id +  "');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)

def getBracketInfo(req,league_id):
    league_id = cgi.escape(league_id)

    x = doSql()
    rets = x.execqry("select * from get_league_bracket_info('" + league_id +  "');", False)
    ##doesnt need to map rets to str  since the needed data is int[]
    return json.dumps(rets)
  
def getLeagueInfoByManager(managerid):
    managerid = cgi.escape(managerid)

    x = doSql()
    rets = x.execqry("select * from get_league_by_manager('" + managerid +  "');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
