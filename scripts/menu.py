from dosql import *
import cgi
try:
    import json
except ImportError:
    import simplejson as json

def index(req,menu_id):
    menu_id = cgi.escape(menu_id)
    x = doSql()
    rets = x.execqry("select * from get_menu_per_id('" + menu_id + "');", False)
    result = []
    for ret in rets:
        stringed = map(str, ret)
        result.append(stringed)

    return json.dumps(result)