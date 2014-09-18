from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,username):
    username = cgi.escape(username) 
      
    a = doSql()
   
    query = "SELECT checkusername('"+username+"');" 
    items = a.execqry(query,False)
    result = []
    for item in items:
        stringed = map(str,item)
        [a] =  stringed

    what = str(a) 
	    		  
    return what