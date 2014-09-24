from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req,manager_id):
    manager_id = cgi.escape(manager_id)
    x = doSql()
    rets = x.execqry("select * from get_manager_per_id(" \
	"'" + manager_id + "');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)

def getManagerPerUserId(userid):
    userid = cgi.escape(userid)
    x = doSql()
    rets = x.execqry("select * from getManagerperuserid(" + userid+ ");", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
	
def getManagerLeague(username):
    username = cgi.escape(username)
    x = doSql()
    rets = x.execqry("SELECT users.userid, name, sport_type, fixture_type FROM league \
    INNER JOIN manager ON manager.manager_id = manager.userid_fk \
    INNER JOIN users ON users.userid = manager.userid_fk \
    where users.username='" + username + "';", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
