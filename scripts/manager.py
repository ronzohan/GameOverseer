from dosql import *
import cgi
import json

def index(req,manager_id):
    manager_id = cgi.escape(manager_id)
    x = doSql()
    rets = x.execqry("select * from get_manager_per_id('" + manager_id + "');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)
