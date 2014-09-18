from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, userid, Manager_id):
    id = cgi.escape(userid) 
	id2 = cgi.escape(Manager_id) 
    x = doSql()
    rets = x.execqry("select * from get_users_perid('" + id \
	+ "'), get_Manager_per_id('" + id + "') WHERE userid = userid_fk;", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)

	 
