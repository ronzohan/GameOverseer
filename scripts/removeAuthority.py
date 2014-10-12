from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,managerid):
    managerid = cgi.escape(managerid)
   
    a = doSql()
  
   
    query = "SELECT removeAuthority("+managerid+");"
    print query
    items = a.execqry(query,True) 
    result=[]
    for item in items:
        stringed =  item 
        result.append(stringed)
         
         
	 
    return json.dumps(result)