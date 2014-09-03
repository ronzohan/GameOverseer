from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,username,password):
    username = cgi.escape(username)
    password = cgi.escape(password)
    a = doSql()
    query = "SELECT * FROM login('"+ username+"','"+ password+"');"
    print query
    items = a.execqry(query,False)
    result = []
    for item in items:
        stringed = map(str,item)
        result.append(stringed)

    return json.dumps(result)

