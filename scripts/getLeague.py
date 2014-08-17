from dosql import *
import cgi
try:
    import json
except ImportError:
	import simplejson as json

def index(req, league_id):
    league_id = cgi.escape(league_id)
    #section = cgi.escape(sport_type)
    #semid = cgi.escape(fixture_type)
    x = doSql()
    rets = x.execqry("select * from get_league_perid('" + league_id +  "');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
