from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, ide):
    id = cgi.escape(ide) 
    #i = int(id)
    x = doSql()
    query = "select * from getStart('" + id + "');"
    rets = x.execqry(query, False)
    result = []
	
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)co