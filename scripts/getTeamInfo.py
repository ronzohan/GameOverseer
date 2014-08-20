from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,name):
    name = cgi.escape(name)
    a = doSql()
    query = "SELECT * FROM get_team_per_name('"+ name +"');"
    print query
    items = a.execqry(query,False)
    result = []
    for item in items:
        stringed = map(str,item)
        result.append(stringed)

    return json.dumps(result)

