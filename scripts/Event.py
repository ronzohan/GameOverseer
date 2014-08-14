from dosql import *
import cgi
import json

def index(req, ide):
    ide = cgi.escape(ide)
    x = doSql()
    rets = x.execqry("select * from get_listing('" + ide + "');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
	
	