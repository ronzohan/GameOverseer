from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json


def index(req,username,password,fullname,email,contactno,address):
    username = cgi.escape(username)
    password = cgi.escape(password)
	fullname = cgi.escape(fullname)
    email = cgi.escape(email)
	contactno = cgi.escape(contactno)
    address = cgi.escape(address)
	
    a = doSql()
    query = "SELECT * FROM setuser('"+ username+"','"+ password+"','"+fullname+"','"+email+"','"+contactno+"','"+address+"');"
    print query
    items = a.execqry(query,False)
    result = []
    for item in items:
        stringed = map(str,item)
        result.append(stringed)

    return json.dumps(result)

