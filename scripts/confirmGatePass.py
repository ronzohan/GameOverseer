from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req, managerid, password):
    managerid = cgi.escape(managerid)
    password = cgi.escape(password)
	
    a =  doSql()
	
    rets = a.execqry("SELECT gatepass FROM manager \
    where gatePass = '" + password + "';", False)
    
    for ret in rets:
        stringed = ''.join(map(str,ret))
    
	#rets = x.execqry("select tempManLeague from manager where tempManager=" + managerid + ";", False);
	
    result = []	
    if stringed != 'None':
        rets = a.execqry("SELECT tempManLeague FROM manager \
        where gatepass = '" + password + "';", False)
        for ret in rets:
            stringed = map(str,ret)
            result.append(stringed)
    else:
        result.append("None")
		
    return json.dumps(result)

