from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, username,password):
    username= cgi.escape(username)   
    password = cgi.escape(password) 
    x = doSql() 
    x.execqry("select  setuser('" + username+" ',' "+ password+" ');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)
		
    return json.dumps(result)

	  