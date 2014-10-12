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
    rets = x.execqry("SELECT count(*) FROM events WHERE leagueid_fk in "+leagueidarray+" and scoret1 is null and scoret2 is null", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)

def getEventInfoByPage(req,leagueidarray,offset):
    leagueidarray = cgi.escape(leagueidarray)
    offset = cgi.escape(offset)

    leagueidarray = leagueidarray.replace('[', '(').replace(']', ')').replace('\"','\'')
    x = doSql()
    rets = x.execqry("SELECT * FROM events WHERE leagueid_fk in "+leagueidarray+" and scoret1 is null and scoret2 is null ORDER by edate ASC limit 4 offset "+offset+" ;", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)