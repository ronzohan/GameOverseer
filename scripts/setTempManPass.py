from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,mainMan,tempMan, password):
    mainMan = cgi.escape(mainMan)
    tempMan = cgi.escape(tempMan)
    password = cgi.escape(password)
    a = doSql()
    rets = a.execqry("SELECT manager_id FROM manager \
    INNER JOIN users ON users.userid = manager.userid_fk \
    where users.username = '" + mainMan + "';", False)
    result = []
    for ret in rets:
        stringed = ''.join(map(str,ret))
    

    id = stringed
	
    rets = a.execqry("SELECT manager_id FROM manager \
    INNER JOIN users ON users.userid = manager.userid_fk \
    where users.username = '" + tempMan + "';", False)
    
    for ret in rets:
        stringed1 = ''.join(map(str,ret))
    
    id1 = stringed1
	
    items = a.execqry("SELECT * FROM setAuthority(" + id + ","+ id1 +",'"+ password+"');", True)
    result = []
    for item in items:
        stringed = map(str,item)
        result.append(stringed)
    
    return json.dumps(result)

