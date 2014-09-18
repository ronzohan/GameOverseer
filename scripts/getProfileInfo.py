from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, userid, userid_fk):
    id = cgi.escape(userid) 
    id2 = cgi.escape(userid_fk)
    x = doSql()
    rets = x.execqry("SELECT users.username, \
    first_name, last_name, address, contact_no, email FROM users \
    INNER JOIN manager ON users.userid = manager.userid_fk;", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
