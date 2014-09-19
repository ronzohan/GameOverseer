from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, username):
    username = cgi.escape(username) 
    x = doSql()
    rets = x.execqry("SELECT league.name, sport_type, fixture_type from league\
    NATURAL JOIN users\
    NATURAL JOIN manager\
    WHERE username = " + username + ";", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)