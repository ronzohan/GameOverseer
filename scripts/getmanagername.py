from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,managerid):
    managerid = cgi.escape(managerid)
   
    b = doSql()	
	
    query = "SELECT getmanager("+managerid+");" 
    items = b.execqry(query,False)
    for item in items:
        stringed = map(str,item)
        [a] =  stringed

     
    return json.dumps(a)