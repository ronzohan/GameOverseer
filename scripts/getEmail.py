

from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req,username):
    username= cgi.escape(username)    
    x = doSql() 
    rets = x.execqry("SELECT email FROM Manager \
    INNER JOIN users ON users.userid = manager.userid_fk \
    where users.username = '" + username + "' ;", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)
		
    return json.dumps(result)

	  