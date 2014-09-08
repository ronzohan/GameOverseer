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
		    setCookie("username",res[0][1],2);
		  }
		  else
		  {
		      alert("Failed");
		  }
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
function fetchLeagueByManagerId(managerid)
{
  $.ajax({
      url: siteloc + scriptloc + "getLeague/getLeagueInfoByManager?",
      data: {managerid:managerid},
      dataType: 'json',
      success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
		    for (i=0;i<res.length;i++)
		    {
		      row = res[i];
		      $("#name").attr("href","leagueinfo?id="+row[0]);
		      $("#name").append(row[1]);
		      $("#sporttype").append(row[2]);
		      $("#fixturetype").append(row[3]);
		    }
		  } // end if
              }
  });
  
}
function fetchLeagueBracketInfo(league_id)
{
   $.ajax({
      url: siteloc + scriptloc + "getLeague/getBracketInfo?",
      data: {league_id:league_id},
      dataType: 'json',
      success: function (res) {
		  var r = new Array(res[0][0]);
		  var t = res[0][1];
		  console.log(t);
                  if(res[0][0] != "None")
                  {
		    var minimalData = {
		      teams : [
    ["Team 1",  "Team 2" ],
    ["Team 3",  "Team 4" ],
    ["Team 5",  "Team 6" ],
    ["Team 7",  "Team 8" ],
    ["Team 9",  "Team 10"],
    ["Team 11", "Team 12"],
    ["Team 13", "Team 14"],
    ["Team 15", "Team 16"]
  ],
  results : [[ /* WINNER BRACKET */
    [[3,5], [2,4], [6,3], [2,3], [1,5], [5,3], [7,2], [1,2]],
    [[1,2], [3,4], [5,6], [7,8]],
    [[9,1], [8,2]],
    [[1,3]]
  ], [         /* LOSER BRACKET */
    [[5,1], [1,2], [3,2], [6,9]],
    [[8,2], [1,2], [6,2], [1,3]],
    [[1,2], [3,1]],
    [[3,0], [1,9]],
    [[3,2]],
    [[4,2]]
  ], [         /* FINALS */
    [[3,8], [1,2]],
    [[2,1]]
  ]]
		    }
		    $(function(){
		      $('#leagueinfo').bracket(
			{
			  init:minimalData
			})
		    })
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
		if (res[0][0] == "OK") //if login is successful redirect page
		{
			setCookie("username",username,2);
			setCookie("userid",res[0][0],2);
			window.location.replace("index.html");
		}
		else if(res[0][0] == "Your password did not match"){
		
		     window.location.replace("wronginput.html");
		}
		else
		{
			alert("first try");
		}
      }
   });

}
//get values in the url
function getParameterByName(name)
{
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function insertUser()
{

				 username:$("#desiredUsername").val();
				 password:$("#desiredPassword").val();
				 verifypassword:$("#verifyPassword").val();
				 fullname:$("#fullname").val();
				 address:$("#address").val();
				 contactno:$("#contactno").val();
				 
				 
				 if(password != verifypassword){
				  
								window.location.replace("login.html");
				 }
				 if (!username || !password|| !verifypassword || !fullname || !address || !contactno) 
					{

						window.location.replace("login.html")

					}
					else{
  $.ajax({ 
				  
		 
		url: siteloc + scriptloc + "insertUser.py",
        data: {
				 username:$("#desiredUsername").val(),   
				 password:$("#desiredPassword").val(),
				 verifypassword:$("#verifyPassword").val(),
				 fullname:$("#fullname").val(),
				 address:$("#address").val(),
				 contactno:$("#contactno").val()
				} 
		 
	 
		});
	}
}


function isloggin()
{
    if (getCookie("username") == "" && getCookie("userid") == "")
      window.location.replace("login.html");
    else
      $("#username").append(getCookie("username"));
    
}


function logout()
{
    setCookie("username","",-1);
    setCookie("userid","",-1);
    window.location.replace("login.html")
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

