from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,inputEmail):
    inputEmail= cgi.escape(inputEmail) 
      
    a = doSql()
   
    query = "SELECT checkemail('"+inputEmail+"');" 
    items = a.execqry(query,False)
    result = []
    for item in items:
        stringed = map(str,item)
        [a] =  stringed

    what = str(a) 
	    		  
    return what