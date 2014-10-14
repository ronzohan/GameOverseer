from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req,leagueidarray):
    leagueidarray = cgi.escape(leagueidarray)

    leagueidarray = leagueidarray.replace('[', '(').replace(']', ')').replace('\"','\'')
    if (leagueidarray != "()"):
        query = "SELECT count(*) FROM events WHERE leagueid_fk in "+leagueidarray+" and scoret1 is null and scoret2 is null" 
    else:
        query = "SELECT count(*) FROM events WHERE leagueid_fk in (null) and scoret1 is null and scoret2 is null"

    x = doSql()
    rets = x.execqry(query, False)
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
    if (leagueidarray != "()"):
        query = "SELECT * FROM events WHERE leagueid_fk in "+leagueidarray+" and scoret1 is null and scoret2 is null ORDER by edate ASC limit 4 offset "+offset+" ;"
    else:
        query = "SELECT * FROM events WHERE leagueid_fk in (null) and scoret1 is null and scoret2 is null ORDER by edate ASC limit 4 offset "+offset+" ;"
    rets = x.execqry(query, False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)

def getEventInfoByPageScoreNotNull(req,leagueidarray,offset):
    leagueidarray = cgi.escape(leagueidarray)
    offset = cgi.escape(offset)

    leagueidarray = leagueidarray.replace('[', '(').replace(']', ')').replace('\"','\'')
    x = doSql()
    if (leagueidarray != "()"):
        query = "SELECT * FROM events WHERE leagueid_fk in "+leagueidarray+" and scoret1 is not null and scoret2 is not null ORDER by edate ASC limit 4 offset "+offset+" ;"
    else:
        query = "SELECT * FROM events WHERE leagueid_fk in (null) and scoret1 is not null and scoret2 is not null ORDER by edate ASC limit 4 offset "+offset+" ;"
    rets = x.execqry(query, False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)

def getEventInfoByPageScoreNotNullCount(req,leagueidarray):
    leagueidarray = cgi.escape(leagueidarray)

    leagueidarray = leagueidarray.replace('[', '(').replace(']', ')').replace('\"','\'')
    if (leagueidarray != "()"):
        query = "SELECT count(*) FROM events WHERE leagueid_fk in "+leagueidarray+" and scoret1 is not null and scoret2 is not null" 
    else:
        query = "SELECT count(*) FROM events WHERE leagueid_fk in (null) and scoret1 is not null and scoret2 is not null"

    x = doSql()
    rets = x.execqry(query, False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)