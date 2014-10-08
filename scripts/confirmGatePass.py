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
    where tempManager = '" + managerid + "';", False)
    
    for ret in rets:
        stringed = ''.join(map(str,ret))
    
    result = []	
    if stringed == password:
        rets = a.execqry("SELECT tempManLeague FROM manager \
        where tempManager = " + managerid + ";", False)
        for ret in rets:
            stringed = map(str,ret)
            result.append(stringed)
    else:
        result.append("None")
		
    return json.dumps(result)

