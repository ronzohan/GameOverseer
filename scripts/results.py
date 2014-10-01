from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def setresults(req,leagueid,resultid,eventid = None,score = None):
    leagueid = cgi.escape(leagueid)
    resultid = cgi.escape(resultid)
    score = cgi.escape(score)
    eventid = cgi.escape(eventid)
    
    if score == "":
   	    score = "null"

    if eventid == "":
        eventid = "null"

    a = doSql()
    items = a.execqry("select setresult("+leagueid+","+resultid+","+eventid+","+score+")",True)
    result = []
    
    for item in items:
        stringed = map(str,item)
        result.append(stringed)
    return json.dumps(result)

def getresults(req,leagueid,resultid):
    leagueid = cgi.escape(leagueid)
    resultid = cgi.escape(resultid)
   
    a = doSql()
    items = a.execqry("select * from getresult("+leagueid+","+resultid+")",False);
    result = []
    
    for item in items:
        stringed = map(str,item)
        result.append(stringed)
    return json.dumps(result)

def getresultsinleague(leagueid):
    leagueid = cgi.escape(leagueid)

    a = doSql()
    items = a.execqry("select * from getresultsinleague("+leagueid+")",False);
    result = []
    
    for item in items:
        stringed = map(str,item)
        result.append(stringed)
    return json.dumps(result)
