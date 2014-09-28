from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req):
    x = doSql()
    rets = x.execqry("SELECT count(e_id) FROM events where scoret1 is not null and scoret2 is not null;", False)
    result = []
    for ret in rets:
        stringed = map(int, ret)
        result.append(stringed)

    return json.dumps(result)

























