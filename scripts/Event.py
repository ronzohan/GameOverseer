from dosql import *
import cgi
try:
    import json
except ImportError:
	import simplejson as json

def index(req, ide):
    ide = cgi.escape(ide)
    x = doSql()
    rets = x.execqry("select * from loadCEvents('" + ide + "');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
	
	
