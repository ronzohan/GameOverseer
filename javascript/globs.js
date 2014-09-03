//define functions and global variables here...
var siteloc = "http://localhost/GameOverseer";
var scriptloc = "/scripts/"

 
function fetchEvent()
{
  $.ajax({
      url: siteloc + scriptloc + "Event.py",
      data: {ide:$("#ide").val(),
             },
      dataType: 'json',
      success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
				      table = '<div class="table-responsive">';
					  table += '<table class="table table-condensed">';
					  table += '<thead>' +
					           '<tr>' +
							     '<th>Date</th>' +
								 '<th>Venue</th>' +
								 '<th>Starting Time</th>' +
								 '<th>Ending Time</th>' +
								 '<th>Score (Team 1)</th>' +
								 '<th>Score (Team 2)</th>' +
							   '</tr>' +
					           '</thead>';
					  table += "<tbody>";		   
					  for (i = 0; i < res.length; i++)
					  {
						  row = res[i];
						  table += "<tr>";
						  for (j = 0; j < row.length; j++)
						  {
							  table += "<td>" + row[j] + "</td>";
						  }
						  table += "</tr>";
					  }
					  table += "</tbody>";
					  table += "</table>";
					  table += "</div>";
					  $("#target").html(table); 
				  } // end if
              }
    });
}


 
 
function insertUser()
{
  $.ajax({
      url: siteloc + scriptloc + "insertUser.py",
      data: {
				 username:$("#desiredUsername").val(),   
				 password:$("#desiredPassword").val()
	    } 
    });
}
 
function fetchUser(userid)
{
  $.ajax({
      url: siteloc + scriptloc + "getUser.py",
      data: {userid:userid
	    },
      dataType: 'json',
      success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
					  table = '<table border="1">';
					  for (i = 0; i < res.length; i++)
					  {
						  row = res[i];
						  table += "<tr>";
						  for (j = 0; j < row.length; j++)
						  {
							  table += "<td>" + row[j] + "</td>";
						  }
						  table += "</tr>";
					  }
					  table += "</table>";
					  $("#target").html(table); 
				  } // end if
              }
    });
}
function fetchTeamInfo(name)
{
  $.ajax({
      url: siteloc + scriptloc + "getTeamInfo.py",
      data: {name:name
	    },
      dataType: 'json',
      success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
					  table = '<table border="1">';
					  for (i = 0; i < res.length; i++)
					  {
						  row = res[i];
						  table += "<tr>";
						  for (j = 0; j < row.length; j++)
						  {
							  table += "<td>" + row[j] + "</td>";
						  }
						  table += "</tr>";
					  }
					  table += "</table>";
					  $("#target").html(table); 
				  } // end if
              }
    });
}

function fetchmanager(manager_id)
{
  $.ajax({
      url: siteloc + scriptloc + "manager.py",
      data: {manager_id:manager_id,
             },
      dataType: 'json',
      success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
					  table = '<table border="1">';
					  for (i = 0; i < res.length; i++)
					  {
						  row = res[i];
						  table += "<tr>";
						  for (j = 0; j < row.length; j++)
						  {
							  table += "<td>" + row[j] + "</td>";
						  }
						  table += "</tr>";
					  }
					  table += "</table>";
					  $("#target").html(table); 
				  } // end if
              }
    });
}

function fetchleague(league_id)
{
  $.ajax({
      url: siteloc + scriptloc + "getLeague.py",
      data: {league_id:league_id},
      dataType: 'json',
      success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
					  table = '<table border="1">';
					  for (i = 0; i < res.length; i++)
					  {
						  row = res[i];
						  table += "<tr>";
						  for (j = 0; j < row.length; j++)
						  {
							  table += "<td>" + row[j] + "</td>";
						  }
						  table += "</tr>";
					  }
					  table += "</table>";
					  $("#target").html(table); 
				  } // end if
              }
    });
}
function login(username,password)
{
   $.ajax({
      url: siteloc + scriptloc + "login.py",
      data: {username:username,
	     password:password
},
      dataType: 'json',
      success: function (res) {
		if (res[0][0] != 'None') //if login is successful redirect page
		{
			window.location.replace("index.html")
		}
		else
		{
			alert("first try")
		}
      }
   });

}

