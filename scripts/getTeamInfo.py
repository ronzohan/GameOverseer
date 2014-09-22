from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,name = None):
		if name is None:
        query = "SELECT * FROM get_allTeams();"
    else:
        name = cgi.escape(name)
        query = "SELECT * FROM get_team_per_name('"+ name +"');"
   
    a = doSql()
    items = a.execqry(query,False)
    result = []
    
    for item in items:
        stringed = map(str,item)
        result.append(stringed)
    return json.dumps(result)

