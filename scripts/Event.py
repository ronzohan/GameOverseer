from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req, ide):
    ide = cgi.escape(ide)
    
    x = doSql()
    rets = x.execqry("select * from loadCEvents('" + ide + "');", False)
    
    result = []
    
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)
    
    return json.dumps(result)
	
def setFixE(req,teamname1,teamname2,leagueid,eDate = None,eLocation = None,eTime_start = None,eTime_end = None):
    teamname1 = cgi.escape(teamname1)
    teamname2 = cgi.escape(teamname2)
    leagueid = cgi.escape(leagueid)
    eDate = cgi.escape(eDate)
    eLocation = cgi.escape(eLocation)
    eTime_start = cgi.escape(eTime_start)
    eTime_end = cgi.escape(eTime_end)
    
    x = doSql()
    
    if eDate == "":
        eDate = "null"
    else:
        eDate = "'" +eDate+ "'"
        
    if eLocation == "":
	    eLocation = "null"
    else:
         eLocation = "'" +eLocation+ "'"    
    
    if eTime_start == "":
	    eTime_start = "null"
    else:
         eTime_start = "'" +eTime_start+ "'"   
           
    if eTime_end == "":
        eTime_end = "null"
    else:
         eTime_end = "'" +eTime_end+ "'"           
	        
    rets = x.execqry("select setFixE('" + teamname1 +"','"+teamname2
    +"',"+leagueid+","+eDate+","+eLocation+","+eTime_start
    +","+eTime_end+")", True)
    
    result = []
    
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)
        
    return json.dumps(result)
	
def ReSchedE(req,e_id,eDate,eLocation ,eTime_start,eTime_end):
    e_id = cgi.escape(e_id)
    eDate = cgi.escape(eDate)
    eLocation = cgi.escape(eLocation)
    eTime_start = cgi.escape(eTime_start)
    eTime_end = cgi.escape(eTime_end)

    if eDate == "":
        eDate = "null"
    else:
        eDate = "'" +eDate+ "'"
        
    if eLocation == "":
        eLocation = "null"
    else:
         eLocation = "'" +eLocation+ "'"    
    
    if eTime_start == "":
        eTime_start = "null"
    else:
         eTime_start = "'" +eTime_start+ "'"   
           
    if eTime_end == "":
        eTime_end = "null"
    else:
         eTime_end = "'" +eTime_end+ "'"

    x = doSql()
    rets = x.execqry("select ReSchedE("+e_id+","+eDate+","+eLocation+","+eTime_start
    +","+eTime_end+")", True)
    
    result = []
    
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)
    
    return json.dumps(result)
