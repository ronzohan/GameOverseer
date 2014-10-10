from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req,leagueidarray):
    leagueidarray = cgi.escape(leagueidarray)

    leagueidarray = leagueidarray.replace('[', '(').replace(']', ')').replace('\"','\'')
    x = doSql()
    rets = x.execqry("SELECT * FROM events WHERE leagueid_fk in "+leagueidarray+";", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
