from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, userid):
    id = cgi.escape(userid) 
    x = doSql()
    rets = x.execqry("select * from get_users_perid('" + id + "');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)

	 
