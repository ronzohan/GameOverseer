from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json
	
def index(req,name):
    name= cgi.escape(name)    
    x = doSql() 
    rets = x.execqry("select league_id from league where name = '" + name + "';",False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)
		
    return json.dumps(result)  