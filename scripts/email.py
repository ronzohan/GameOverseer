from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, email):
    email = cgi.escape(email) 
    x = doSql()
    rets = x.execqry("SELECT manager_id FROM manager \
    where email = '"+email+"';", False)
   
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)