from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, name):
    name = cgi.escape(name) 
    x = doSql()
    rets = x.execqry("SELECT manager_id FROM manager \
    INNER JOIN users ON users.userid = manager.userid_fk \
    where users.username = '" + name + "';", False)
    
    for ret in rets:
        stringed = ''.join(map(str,ret))

    id = stringed
	
    rets = x.execqry("SELECT users.username, \
    first_name, last_name, address, contact_no, email FROM users \
    INNER JOIN manager ON users.userid = manager.userid_fk \
    where users.userid=" + id + ";" , False)
    
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
	

	
