from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,username,password,firstname,lastname,email,contactno,address):
    username = cgi.escape(username)
    password = cgi.escape(password)
    firstname= cgi.escape(firstname)
    lastname = cgi.escape(lastname)
    email = cgi.escape(email)
    contactno = cgi.escape(contactno)
    address = cgi.escape(address)
     
	
	
    a = doSql()
  
   
    query = "SELECT setuser('"+username+"','"+ password+"');"
    print query
    items = a.execqry(query,True)
    result = []
    for item in items:
        stringed = map(str,item)
        result.append(stringed) 
	
    b = doSql()	
	
    query = "SELECT login('"+ username+"','"+ password+"');" 
    items = b.execqry(query,False)
    for item in items:
        stringed = map(int,item)
        [a] =  stringed

    id = str(a)
	
   
	
							
		
    query = "SELECT setmanager("+id+" ,'"+firstname+"','"+lastname+"','"+address+"','"+contactno+"','"+email+"');"
    items = b.execqry(query,True)
    result2 = []
    for item in items:
        stringed = map(str,item)
        result2.append(stringed)

    return json.dumps(result2)