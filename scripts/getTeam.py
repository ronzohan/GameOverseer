from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, id):
    x = doSql()
    rets = x.execqry("SELECT teamname1, teamname2 FROM events where e_id = '" + id + "';", False)
    result = []
    for ret in rets:
        stringed = map(int, ret)
        result.append(stringed)

    return json.dumps(result)

























