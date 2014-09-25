from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,username2,password2,firstname2,lastname2,email2,contactno2,address2):
    username2 = cgi.escape(username2)
    password2 = cgi.escape(password2)
    firstname2= cgi.escape(firstname2)
    lastname2 = cgi.escape(lastname2)
    email2 = cgi.escape(email2)
    contactno2 = cgi.escape(contactno2)
    address2 = cgi.escape(address2)
     
 
 
    a = doSql()
  
   
 
    query = "SELECT login('"+ username2+"','"+ password2+"');" 
    items = a.execqry(query,False)
    for item in items:
        stringed = ''.join(map(str,item))
        #[a] =  stringed

    id = stringed 
   
 
       
  
    query = "SELECT setmanager("+id+" ,'"+firstname2+"','"+lastname2+"','"+address2+"','"+contactno2+"','"+email2+"');"
    items = a.execqry(query,True)
    result2 = []
    for item in items:
        stringed = map(str,item)
        result2.append(stringed)

    return json.dumps(result2)