from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, id):
    id = cgi.escape(id) 
    x = doSql()
    
    rets = x.execqry("SELECT count(manager_id)+1 from manager \
    where tempManager=" + id + ";" , False)
    
    temp = []
    result = []
	
    for ret in rets:
        stringed = map(str,ret)
        result.append(stringed)
    
    rets = x.execqry("SELECT first_name, last_name, gatePass from manager \
    where tempManager=" + id + ";" , False)
    
    for ret in rets:
        stringed = map(str,ret)
        result.append(stringed)
    
    rets = x.execqry("select tempManLeague from manager where tempManager=" + id + ";", False);
    
    tmp = []
    for ret in rets:
        stringed = ''.join(map(str, ret))
        tmp.append(stringed)
    
    if tmp[-1] != 'None':
        for tmps in tmp:
            rets = x.execqry("select name from league where league_id='" + tmps +"';", False);
        	
            for ret in rets:
                stringed = ''.join(map(str, ret))
                temp.append(stringed)
				
    else:
        temp.append(tmp[-1])	    
    			
    result.append(temp)
    	
    rets = x.execqry("SELECT username from users \
    INNER JOIN manager ON users.userid=manager.userid_fk \
    where tempManager='" + id + "';" , False)
	
    temp = []
    for ret in rets:
        stringed = ''.join(map(str,ret))
        temp.append(stringed)
    result.append(temp)	
	
    return json.dumps(result)