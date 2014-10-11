from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,managerid):
    managerid = cgi.escape(managerid)
   
    a = doSql()
  
   
    query = "SELECT getmanager("+managerid+");"
    print query
    items = a.execqry(query,True) 
    for item in items:
        stringed =  item 
        a= ','.join(stringed)
        b= ','.join(a for  elem !="("   in a)
         
         
	 
    return json.dumps(a)