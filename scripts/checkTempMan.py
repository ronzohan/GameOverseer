from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, id):
    id = cgi.escape(id) 
    x = doSql()
    
    rets = x.execqry("SELECT first_name, last_name, gatePass from manager \
    where tempManager=" + id + ";" , False)
    
    result = []
	
    for ret in rets:
        stringed = map(str,ret)
        result.append(stringed)
		
    rets = x.execqry("SELECT name from league INNER JOIN manager on league.managerid_fk = manager.manager_id \
    where tempManager=" + id + ";" , False)	
	
    temp = []
    for ret in rets:
        stringed = ''.join(map(str,ret))
        temp.append(stringed)
    result.append(temp)	

    rets = x.execqry("SELECT username from users \
    INNER JOIN manager ON users.userid=manager.userid_fk \
    where tempManager=" + id + ";" , False)
	
    temp = []
    for ret in rets:
        stringed = ''.join(map(str,ret))
        temp.append(stringed)
    result.append(temp)	
	
    return json.dumps(result)