from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, username):
    username = cgi.escape(username) 
    x = doSql()
    rets = x.execqry("SELECT manager_id FROM manager \
    INNER JOIN users ON users.userid = manager.userid_fk \
    where users.username = '" + username + "';", False)
    
    for ret in rets:
        stringed = ''.join(map(str,ret))

    id = stringed
	
    rets = x.execqry("SELECT tempManager, first_name, last_name, gatePass from manager \
    where tempManager=" + id + ";" , False)
    
    result = []
    for ret in rets:
        stringed = map(str,ret)
        result.append(stringed)

    rets = x.execqry("SELECT username from users \
    INNER JOIN manager ON users.userid=manager.userid_fk \
    where tempManager=" + id + ";" , False)
	
    for ret in rets:
        stringed = ''.join(map(str,ret))
        result.append(stringed)
	
    return json.dumps(result)