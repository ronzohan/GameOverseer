from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,mainManID,tempMan, tempLeague, password):
    mainManID = cgi.escape(mainManID)
    tempMan = cgi.escape(tempMan)
    tempLeague = cgi.escape(tempLeague)
    password = cgi.escape(password)

    a = doSql()
	
    rets = a.execqry("SELECT manager_id FROM manager \
    INNER JOIN users ON users.userid = manager.userid_fk \
    where users.username = '" + tempMan + "';", False)
    
    for ret in rets:
        stringed = ''.join(map(str,ret))
    
    id = stringed
	
    rets = a.execqry("SELECT league_id FROM league \
    INNER JOIN manager ON league.managerid_fk = manager.manager_id \
    where league.name = '" + tempLeague + "';", False)
    
    for ret in rets:
        stringed1 = ''.join(map(str,ret))
    
    id1 = stringed1
	
    items = a.execqry("SELECT * FROM setAuthority(" + mainManID + ","+ id +",'"+ password+"'," + id1 +");", True)
    result = []
    for item in items:
        stringed = map(str,item)
        result.append(stringed)
    
    return json.dumps(result)

