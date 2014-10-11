from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req, managerid, password, league):
    managerid = cgi.escape(managerid)
    password = cgi.escape(password)
    league = cgi.escape(league)	
    
    a =  doSql()
	
    rets = a.execqry("select tempManLeague from manager \
	where gatePass='" + password + "';", False);
	
    for ret in rets:
        stringed = ''.join(map(str,ret))
    
    id = stringed	
    
    rets = a.execqry("select league_id from league \
    where name='" + league + "';", False);	

    for ret in rets:
        stringed = ''.join(map(str,ret))
    
	id1 = stringed
	
	result = []	
    if id == id1:
        result.append(id)
    else:
        result.append("None")
		
    return json.dumps(result)

