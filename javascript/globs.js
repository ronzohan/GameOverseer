//define functions and global variables here...
var siteloc = "http://localhost/GameOverseer";
var scriptloc = "/scripts/";

var latestEventID; //for holding the id of the recently created event
				   //during locking of teams
 
function fetchEvent(ide)
{
  $.ajax({
      url: siteloc + scriptloc + "Event.py",
      data: {ide:ide,
             },
      dataType: 'json',
      success: function (res) {
                
                 if(res[0][0] != "None")
					$("#datepicker").val(res[0][0]);

				if (res[0][1] != "None")
					$("#location").val(res[0][1]);

				if (res[0][2] != "None")
					$("#timepicker1").val(res[0][2]);

				if (res[0][3] != "None")
					$("#endtime").val(res[0][3]);
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
					setCookie("username",res[0][1],2);                                                                                                                      
				else
					alert("Failed");					  	
	  }
    });
}

function postMethod(id)
{
	var x = ["Chelsea","Liverpool"];
	
	$.ajax({
		url: "scripts/getgradesheet.py",
		type: "get",
		data: {
			x:id
     	},
		traditional:true,
     	dataType: 'json',	
     	success: function (res) {
                console.log(res)
        }     	
	});



}


function updateUser()
{
  $.ajax({
      url: siteloc + scriptloc + "updatemanager.py",
      data: {
	  username2:$("#username1").val(),
	  password2:$("#password1").val(),
	  firstname2:$("#firstname1").val(),
			 lastname2:$("#lastname1").val(),
			 address2:$("#address1").val(),
			 contactno2:$("#phone1").val(),
			 email2:$("#emailadd1").val(),},
      dataType: 'json',
      success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
					$("#container2").html(
					'<h1> Successfully Changed!</h1>');     

      
      
      
      } // end if
              }
    });
}

function fetchProfileInfo(name)
{
   $.ajax({
      url: siteloc + scriptloc + "getProfileInfo.py",
      data: {name:name},
      dataType: 'json',
      success: function (res) {
				var k = 1;
				if(res[0][0] != "None")
                {
					for (i=0;i<res.length;i++){
						row = res[i];
					for (j = 0; j < row.length ; j++){
						
						if(k == 1)
							document.getElementById("username1").value = row[j]; 
						
						if(k == 2)
							document.getElementById("firstname1").value = row[j]; 
       					
						if(k == 3)
							document.getElementById("lastname1").value = row[j];
        
						if(k == 4)
							document.getElementById("address1").value = row[j];

						if(k == 5)
							document.getElementById("phone1").value = row[j];
       
						if(k == 6)
							document.getElementById("emailadd1").value = row[j];
       
						k = k+1;      
					 }  
					}
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
					  
				  } 
        }
    });
}

function fetchAllTeamInfo(handleData)
{
	var x = [];
  $.ajax({
      url: siteloc + scriptloc + "getTeamInfo.py",
      data: {
	    },
      dataType: 'json',
      success: function (res) {
      
                  if(res[0][0] != "None")
                  {
					 handleData(res);
 
				  } 
        }
    });
   
    return x;
}

function fetchmanager(manager_id)
{
  $.ajax({
      url: siteloc + scriptloc + "manager.py",
      data: {manager_id:manager_id,
             },
      dataType: 'json',
      success: function (res) {
 
                  if(res[0][0] != "None")
				  {}
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
                {}
		}
    });
}

function redirect_ifNotloggedin()
{
	if (isloggedin())
		$("#header").load("header.html");
 	else 
		window.location.replace("login.html");
	
}


function confirmAddTeamsInLeague(leagueid,managerid,participantTeams)
{
	redirect_ifNotloggedin();
	console.log(participantTeams);
	$.ajax({
		 
		url: siteloc + scriptloc + "getLeague.py/addTeamsInLeague",
		data: {
			leagueid:leagueid,
     		managerid:managerid,
			participantTeams:participantTeams,      
     	},
     	
     	dataType: 'json',	
     	success: function (res) {
                 	if(res[0][0] != "Fail")
						alert(res[0][0]);
        }     	
	});
}

function fetchLeagueByManagerId(managerid)
{
  $.ajax({
      url: siteloc + scriptloc + "getLeague.py/getLeagueInfoByManager",
      data: {managerid:managerid},
      dataType: 'json',
      success: function (res) {
                  console.log(res); 
                  if(res[0][0] != "None")                  
                  {
					$("#leaguetable tr").remove();
					for (i=0;i<res.length;i++)
					{
						row = res[i];
				     
						$("#leaguetable").append('<tr><td><a href=leagueinfo.html?id='
												+row[0]+'>'+row[1]+'</a></td>'
											+'<td>'+row[2]+'</td>' + '<td>'+row[3]
											+'</td><td><a href="#" onClick=editLeague('
											+$.cookie('managerid')+','+row[0]
											+') class="glyphicon glyphicon-pencil">Edit</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
											+'<a href="#" onClick = verifydelete('+row[0]+','+$.cookie("managerid")
											+') class="glyphicon glyphicon-remove">Remove</a></td></tr>');
					}
				  }
        }
  });
  
}

function getQueryVariable() {
	var query = window.location.search.substring(1);
	var m = query.split("?");

	for (var i=0;i<m.length;i++) {
		var key = m[i].split("=");
			return key[1];
	}
} 
					
function displayLeagueByManagerName(username)
{
  $.ajax({
      url: siteloc + scriptloc + "manager.py/getManagerLeague",
      data: {username:username},
      dataType: 'json',
      success: function (res) {
                  console.log(res); 
				  if(res[0][0] != "None")                  
                  {
					$("#leaguetable tr").remove();
					for (i=0;i<res.length;i++)
					{
						row = res[i];
						
						$("#leaguetable").append('<tr><td><a href=searchleague.html?id='
												+row[0]+'>'+row[1]+'</a></td>'
											+'<td>'+row[2]+'</td>' + '<td>'+row[3]
											+'</td></tr>');
					}
				  }
        }
  });
  
}

function getScore(ide)
{
  $.ajax({
      url: siteloc + scriptloc + "getScore.py",
      data: {ide:ide
             },
	  success: function (res) {
                  if(res[0][0] != "None" )
                  {
					$("p").append("<br>Score: ");
					for (i = 0; i < res.length; i++)
					{
						row = res[i];
						
						for (j = 0; j < row.length ; j++)
							if(row[j] != "[" && row[j] != "]" && row[j] != "," && row[j] != '"')
								$("p").append(row[j]);		
					}	
				  } // end !if
         }
	})
	
}


function getNumMatches()
{
  var num = "";
  $.ajax({
      url: siteloc + scriptloc + "getNumMatch.py",
	  async:false,
	  dataType: 'json',
	  success: function (res) {
				if(res[0][0] != "None" )
                  {
					
					for (i = 0; i < res.length; i++)
					{
						row = res[i];
      
						for (j = 0; j < row.length ; j++)
							if(row[j] != "[" && row[j] != "]" && row[j] != "," && row[j] != '"')
								num += row[j];  
					} 
				  }
              }
	});
	return num;
}

function scoreNotNull()
{
  var num = "";
  $.ajax({
      url: siteloc + scriptloc + "checkScore.py",
	  async:false,
	  dataType: 'json',
	  success: function (res) {
				if(res[0][0] != "None" )
                  {
					
					for (i = 0; i < res.length; i++)
					{
						row = res[i];
      
						for (j = 0; j < row.length ; j++)
							if(row[j] != "[" && row[j] != "]")
								num += row[j];  
					} 
				  }
              }
	});
	return num;
}

var k = 1;
var e = 1;
function createDiv()
	{
		
		divTag = document.createElement("div");
        
		divTag.id = "div" + k ;
        
		divTag.setAttribute("align","center");
        
        divTag.style.margin = "20px auto";
        
        divTag.innerHTML = '<a href = "http://localhost/GameOverseer/details.html?k=' + k + '"> insertTN' + (e) + ' vs insertTN' + (e+1) + '</a>';
		
		$('#r').append(document.body.appendChild(divTag));
		
		k++;
		
		e += 2;
		
		return divTag.id;
	}
	
function createD(w)
{
	var t = 0;
		
	while (t < (w-1))
		t++;
			
	t = (2*t) + 1;
	
	divTag = document.createElement("div");
        
	divTag.id = "d" + w ;
        
	divTag.setAttribute("align","right");
        
    divTag.style.margin = "20px auto";  
	
	divTag.innerHTML = 'insertTN' + t + ' vs insertTN' + (t+1); 
		
	$('#k').append(document.body.appendChild(divTag));
		
	getStart(w, createDiv(), "okay"); 
	
	getScore(w);
		
}	
	
function getStart(ide, timer, o)
{
	var Time;
	$.ajax({
      url: siteloc + scriptloc + "getStartDate.py",
	  datatype:'json',
	  data: {ide:ide
             },
	  success: function (res) {
				  if(res[0][0] != "None" ){
				  
				  var string = "";
				  
				  for (i = 0; i < res.length; i++)
					{
						row = res[i];
      
						for (j = 0; j < row.length ; j++)
							if(row[j] != "[" && row[j] != "]" && row[j] != "," && row[j] != '"')
								string += row[j];  
       
					} 
					
					var date = new Date(string);
					var hours = date.getHours();
    				var minutes =  date.getMinutes();
					
					var string = ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) 
									+ "/" + date.getFullYear() + " " + ("0" + hours) + ":" + ("0" + minutes);
					
					if(hours < 12)
						string += " " + "AM";
					else
						string += " " + "PM";

					if(o == "okay")
						$("p").append('<br>' + string);
					
					
					else{
						string = '"' + string + '"';
					
						FinishMessage = "Live";
					
						var dtarg = new Date(string);
						var dnow = new Date();
				
						diff = new Date(dtarg - dnow);
						Time = Math.floor(diff.valueOf()/1000);
				
						if(diff < 0){
							Time = 0;
						}
						
						p = 0;
						new CreateTimer(timer, Time, p);
					}
			}
		}
			
	});
}


var Timer;
var TotalSeconds;
var p;
function CreateTimer(TimerID, Time, p){
    var oop=this;
	
	this.Timer = document.getElementById(TimerID);
	this.TotalSeconds = Time;
	
	this.update();
	oop.to=setTimeout(function(){ oop.tick(); }, 1000);
}

CreateTimer.prototype={

 tick:function(){
    var oop=this;
	
	if (this.TotalSeconds <= 0){
		this.Timer.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + FinishMessage;
		$('#r').append(document.body.appendChild(this.Timer));
		return;
	}
	
	this.TotalSeconds -= 1;
	this.update()
	
	oop.to=setTimeout(function(){ oop.tick(); }, 1000);
 },

 update:function(){
 	var Seconds = this.TotalSeconds,Days = Math.floor(Seconds / 86400);
	Seconds -= Days * 86400;
	
	var Hours = Math.floor(Seconds / 3600);
	Seconds -= Hours * (3600);
	
	var Minutes = Math.floor(Seconds / 60);
	Seconds -= Minutes * (60);
	
	var TimeStr = ((Days > 0) ? Days + " day(s) " : "") + (((Hours > 0) && (Days <= 0)) ? Hours + " h " : "") + (((Minutes > 0) && (Days <= 0)) ? Minutes + " m " : "") + (((Seconds > 0) && (Days <= 0) && (Hours <= 0) && (Minutes <= 0)) ? Seconds + " s " : "");
	if (p == 0){
		p++;
		this.Timer.innerHTML += "&nbsp;&nbsp;&nbsp;" + TimeStr;
		$('#r').append(document.body.appendChild(this.Timer));
	}
 }	
}

function getBracketInfo(league_id,handle)
{
	  $.ajax({
      url: siteloc + scriptloc + "getLeague.py/getBracketInfo?",
      data: {league_id:league_id},
      dataType: 'json',
      async:false,
      success:
	  function (res){
		 handle(res); //pass data to the desired function
	  }
		}); 
}

var minimalData;

function fetchLeagueBracketInfo(res)
{
		var resultsArr = [];
		 
	 	getBracketInfo(getParameterByName('id'),function(res)
	 	{
	 		//res[0][1] = res[0][1].replace(/-1/g,null);
	 		resultsArr = res[0][1]

	 	});
	 	console.log(resultsArr);
		  var r = resultsArr;
		  var t = res[0][2];

          if(res[0][0] != "None" && res[0][4] == 1)
            {
				minimalData = {
				
				teams :t,
				results : r
				
				}			
				$('#leagueinfo').bracket
				({
					init:minimalData,
					save:saveFn
 
				});		
				$('#teamdraft').empty();
 
			} 
			else
			{
				$('#leaguetitle').empty();
				$('#leaguetitle').append(res[0][0]);
			}
  
}
function onclickbracket(data,rId) {
	//alert("onclick(data: '" + data[0]['name'] +" vs "+data[1]['name']+" MatchID: "+ data[2][2]+"')");
	$("#eventid").empty();
	$("#datepicker").val("");
	$("#location").val("");
	$("#timepicker1").val("");
	$("#endtime").val("");

	console.log(data); 
	if (data[0]['name'] && data[1]['name'])
	{
		
		$("#teamversus").empty();
		$("#eventid").empty();
		getresult(getParameterByName('id'),rId,data[0]['name'],data[1]['name'],setEventIdTag);
		// $("#eventid").append(data[2][2]);

		$("#teamversus").append(data[0]['name']);
		$("#teamversus").append(" vs ");
		$("#teamversus").append(data[1]['name']);
 		$("#myModal").modal('show');

 		fetchEvent($("#eventid").text());
 		

 	}
}
 
 

function login(username,password)
{
   $.ajax({
      url: siteloc + scriptloc + "login.py",
      data: {username:username,
	     password:password },
      dataType: 'json',
      success:

	  function (res) 
	  {
			if (res[0][0] != "Your password did not match") //if login is successful redirect page
			{
				$.cookie("username",username);
				$.cookie("userid",res[0][0]);
 
				window.location.replace("index.html"); 
			}
			
			else
			{
				$('#status').empty();
				$('#status').append("Invalid username or password");
				$('#status').css('color','#FF0000');
			}
		
      } 
      }); 
}

function setPassword(username,password)
{
   $.ajax({
      url: siteloc + scriptloc + "password.py",
      data: {username:username,
	     password:password },
      dataType: 'json',
      success:

	  function (res) 
	  {
			if (res[0][0] == "OK") 
			{
				$('#alert').empty();
				$('#alert').append("Your password has been successfully changed.");
				$('#alert').css('color','white');
			}
      } 
      }); 
}

function checkEmail(email)
{
   $.ajax({
      url: siteloc + scriptloc + "email.py",
      data: {email:email},
      dataType: 'json',
      success:

	  function (res) 
	  {
			if (res[0][0] != "None") 
			{
				$('#reset').empty();
				$('#reset').append("<a href='#' onclick=$('#reset').hide() data-toggle='modal' data-target='#forgotpassword'> Click here to renew password</a>");
				$('#reset').css('color','black');
			}
			else
			{
				$('#status').empty();
				$('#status').append("Email or username does not exist. Please try again.");
				$('#status').css('color','#FF0000');
			}
      } 
      }); 
}



function setTempManPass(mainMan, tempMan,password)
{
   $.ajax({
      url: siteloc + scriptloc + "setTempManPass.py",
      data: {mainMan:mainMan,
	     tempMan:tempMan,
		 password: password},
      dataType: 'json',
      success:
	  function (res) 
	  {
			if (res[0][0] == "OK") 
			{
				
				$('#status').empty();
				$('#status').append("Ok");
				$('#status').css('color','white');
			}
      } 
      }); 
}

 
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
				 
				 
	if(password != verifypassword)
		window.location.replace("login.html");
				 
	if (!username || !password|| !verifypassword ||  !fullname    || !address   || !contactno) 
		window.location.replace("login.html")
	
	else{
				
		$.ajax({ 
		 
		url: siteloc + scriptloc + "insertUser.py",
        data: 
				{
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


function isloggedin()
{
	if (!$.cookie("username") && !$.cookie("userid"))
		return false;
    else
		return true;	
}


function logout()
{
    $.removeCookie("username");
    $.removeCookie("userid");
    $.removeCookie("managerid");
    
    window.location.replace("login.html");	
}

function editLeague(managerid,leagueid)
{
	$("#editleaguename").empty();
	$("#editsport").empty();
	
	$("#editfixturetype").empty();
	
	$.ajax({
      url: siteloc + scriptloc + "getLeague.py",
      data: {league_id:leagueid,
		  },
      dataType: 'json',
      success: function (res) {
                  console.log(res);
				
                  if(res[0][0] != "None")
                  {
					$("#editleaguename").val(res[0][0]);
					$("#editsport").val(res[0][1]);
					
					$("#editdialog select").val(res[0][2]);
					$("#editdialog").dialog('open');
				  }
		}
    });
	
}
function setleague(managerid,leaguename,fixturetype,sport)
{
	$.ajax({
	url: siteloc + scriptloc + "getLeague.py/setleague",
	data: {managerid:managerid,
      	   leaguename:leaguename,
		   fixturetype:fixturetype,      
		   sport:sport
      	},
    dataType: 'json',	
    success: function (res) {
                if(res[0][0] != "None")
                {
					if (res[0][0] == "Successfully Created")
					{
						$("#create").hide();
						$("#status").empty();
						
						$("#status").css('color','#00FF00');
						$("#status").append("Successfully Created!");					
						$("input").prop('disabled', true); //disable all inputs since league was been successfully created
					}
					else
					{
						$("#status").empty();
						$("#status").css('color','#FF0000');
						$("#status").append("Duplicate Entry.");
					}	 
				} 
        }
	});
}

function deleteLeague(leagueid,managerid)
{
	$.ajax({
	url: siteloc + scriptloc + "getLeague.py/deleteLeague",
	data: {leagueid:leagueid,
		   managerid:managerid
		  },
    dataType: 'json',
    success: function (res) {
				console.log(res);
                if(res[0][0] != "None")
                {
					if (res[0][0])
						fetchLeagueByManagerId($.cookie('managerid'));
					else 
						alert("Failed to delete");
				} 
        }
	});
}

function verifydelete(leagueid,managerid)
{
	//pass the needed parameters by the dialogbox for deleteleague call later
	$("#dialog-confirm")
		.data('leagueid',leagueid)
		.data('managerid',managerid)
		.dialog('open');

}

function addTeamsInLeague(leagueid,managerid,participantTeam)
{
	redirect_ifNotloggedin();
	$.ajax({
		 
		url: siteloc + scriptloc + "getLeague.py/addTeamsInLeague",
		data: {
			leagueid:leagueid,
      		managerid:managerid,
			participantTeam:participantTeam,      
      	},
      	
      	dataType: 'json',	
      	success: function (res) {
                  	if(res[0][0] != "Fail")
                  	{
						alert(res[0][0]);
						$("#teamcollection tbody").remove();
						getBracketInfo(leagueid,viewParticipantsInLeague);
					} 
              	}
	});
}


function redirect_ifNotloggedin()
{
	if (isloggedin())
		$("#header").load("header.html");
  	else 
		window.location.replace("login.html");
}

function redirect(n) {
    if(n == 0)
		document.location.href = '/GameOverseer/search.html?query=' + document.getElementById('usename').value;
	if(n == 1)
		document.location.href = '/GameOverseer/leaguemanager_profile.html?query=' + document.getElementById('username').innerHTML;
	if(n == 2)
		document.location.href = '/GameOverseer/editprofile.html?query=' + document.getElementById('username').innerHTML;
}

function fetchusername(name)
{
   $.ajax({
      url: siteloc + scriptloc + "getusername.py",
      data: {username:name.toLowerCase()},
   
      dataType: 'json',
      success: function (res) {
   
				if(res[0][0] != "None")
				{
				     
				    $("#k").append('<h2> users </h2>');
					$("#name").append('<a href = searchusername.html?query=' + res[0][0] + '>' + res[0][0] + '</a>');
				    $("#k").append('<hr>');
				}
				else 
				    fetchleaguename(name);
		} 
    }); 
}

function fetchleaguename(name)
{
   $.ajax({
      url: siteloc + scriptloc + "getleaguename.py",
     data: {name:name.toLowerCase()},
   
      dataType: 'json',
      success: function (res) {
				
				if(res[0][0] != "None")
				{
					 $("#k").append('<h2> league </h2>');
					$("#league").append('<a href = searchleague.html?id=' + getLeagueID(name) + '>' + res[0][0] + '</a>');
				 }
				 else{
				  $("#k").text('');
				  $("#k").append("No Results Found");
				}
		} 
     }); 
 }
 
 function getLeagueID(name)
{
	var id;
	$.ajax({
		url: siteloc + scriptloc + "getLeagueId.py",
		async:false,
		data: { name:name
      	},
      	dataType: 'json',	
      	success: function (res) {
                  	if(res[0][0] != "None")
                  	{
						for (i = 0; i < res.length; i++)
						{
							row = res[i];
      
							for (j = 0; j < row.length ; j++)
								if(row[j] != "[" && row[j] != "]" && row[j] != "," && row[j] != '"'){
									id = row[j]; 			
								}	
						} 
						
					} 
              	}
	});
	return id;
	
}

function viewParticipantsInLeague(res)
{
 
			row = res[0][3];
			if (row)
			{ 
				
				table = "";
				for (i = 0;i<row.length;i++)
				{
					table += "<tr><td>"+row[i]+"</td><td>"
					+'<a href="#" onClick = deleteTeamsInLeague("'+row[i]+'")>Remove</a>';
				}
				$("#teamcollection").append(table);
			}
 
}

function deleteTeamsInLeague(participantTeam,managerid,leagueid)
{
	$.ajax({
		url: siteloc + scriptloc + "getLeague.py/deleteTeamInLeague?",
		data: {leagueid:leagueid,
			   managerid:managerid,
			   participantTeam:participantTeam
		},
		dataType: 'json',
		success:
		function (res){
			 $("#teamcollection tbody").remove();
			 //viewParticipantsInLeague(leagueid);
		}
   }); 
	
	
}

function getManagerPerUserId(userid)
{
	$.ajax({
		url: siteloc + scriptloc + "manager.py/getManagerPerUserId?",
		data: {userid:userid
		},
		dataType: 'json',
		success:
		function (res){
			 
			 $.cookie("managerid",res[0][0]);
		}
   }); 
}

function randomPairs(teams ,leagueid) {
    shuffle( teams );
    var output = [];
    var eventidArr = [];

	for (var a = 0;a<teams.length;a += 2)
    {
    	setEvent(teams[a],teams[a+1],leagueid,null,null,null,null);
    	eventidArr.push(latestEventID);
    	latestEventID = "";
    }
    console.log(eventidArr);

    for (var x = 0; x<teams.length;x++)
    {
    	if (x > (teams.length/2)-1)
    	{
    		setresult(leagueid,(x*2),null,null);
        	setresult(leagueid,(x*2)+1,null,null);

    	}
    	else
    	{
    		setresult(leagueid,(x*2),eventidArr[x],null);
        	setresult(leagueid,(x*2)+1,eventidArr[x],null);

    	}

    }



    for( var i = 0, n = teams.length;  i < n;  i += 2 ) {
        output.push([ teams[i], teams[i+1] ]);
        
    }

    //check if number of pairings is a power of 2
    while (((output.length+1) & (output.length)) == 0)
	{
	    output.push([null,null]);
	}
    
		
    return output;	
}

function lockTeams(userid,leagueid,managerid)
{
	$.ajax({
		url: siteloc + scriptloc + "getLeague.py/lockLeague?",
		data: {userid:userid,
			   leagueid:leagueid,
			   managerid:managerid
		},
		dataType: 'json',
		success:
		$.ajax({	
			url: siteloc + scriptloc + "getLeague.py/getBracketInfo?",
			data: {
			   league_id:leagueid
			   
		},
		dataType: 'json',
		async:false,
		success:
			function (res){
				console.log(res);
				results = [];
				var participants = res[0][3];
				if (participants)
				{ 
					participants = randomPairs(participants,leagueid);
					/*for (i=0;i<participants.length;i++)
					{
						if (participants[i][0] || participants[i][1])
						{
							//alert("here");
							//setEvent(participants[i][0],participants[i][1],leagueid,null,null,null,null);
							
							//latestEventID was set upon call of setbracketinfo
							//results.push([null,null,parseInt(latestEventID)]);
							
							//latestEventID = "";
						}
					} useless */
					console.log(participants);
					setbracketinfo(userid,leagueid,managerid,results,participants);
				}
		}
		})
   });
}

// Shuffle an array in place using the Fisher-Yates algorithm,
function shuffle( array ) {
    for( var m = array.length;  m; ) {
        var i = Math.floor( Math.random() * m-- );
        var t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function setbracketinfo(userid,leagueid,managerid,results,participants)
{
	
	$.ajax({
		url: siteloc + scriptloc + "getLeague.py/setBracketInfo?",
		data: {userid:userid,
			   leagueid:leagueid,
			   managerid:managerid,	
			   results:JSON.stringify(results),
			   participants:JSON.stringify(participants)
		},
		dataType: 'json',
		success:
		function (res){
			console.log(res);
		}
   });
}

function searchAutocomplete()
{
	fetchAllTeamInfo(function(output)
	{
		var availableTags = [];
		for (i=0;i<output.length;i++)
			availableTags.push(output[i][1]);
 
		$( "#teamname" ).autocomplete({
		  source: availableTags,
		 
    });
		
	});

 }
 
 function fetchleaguemanage(usename)
{
   $.ajax({
      url: siteloc + scriptloc + "getleaguemanage.py",
     data: {username:username},
   
      dataType: 'json',
      success: function (res) {
   
				if(res[0][0] != "None")
				{
					for (i = 0; i < res.length; i++)
					{
						row = res[i];
      
						for (j = 0; j < row.length ; j++)
						if(row[j] != "[" && row[j] != "]" && row[j] != "," && row[j] != '"')
						$("h3").append(row[j]);  
       
					} 
                 }
				 
				 else{
				 
				    
				}
				} 
     }); 
 } 	



function setEvent(teamname1,teamname2,leagueid,eDate,eLocation,eTime_start,eTime_end)
{
	var event_id = $.ajax({
		 url: siteloc + scriptloc + "Event.py/setFixE",
		 data: {
			 teamname1:teamname1,
			 teamname2:teamname2,
			 leagueid:leagueid,
			 eDate:eDate,
			 eLocation:eLocation,
			 eTime_start:eTime_start,
			 eTime_end:eTime_end
		  },
		  dataType: 'json',
		  async:false,
		  success: function (res) {
				if (res != "None")
					latestEventID = res[0][0];
		 }
		 }); 
}

function ReSchedE(e_id,eDate,eLocation ,eTime_start,eTime_end)
{
	var event_id = $.ajax({
		 url: siteloc + scriptloc + "Event.py/ReSchedE",
		 data: {
			 e_id:e_id,
			 eDate:eDate,
			 eLocation:eLocation,
			 eTime_start:eTime_start,
			 eTime_end:eTime_end
		  },
		  dataType: 'json',
		  success: function (res) {
				if (res != "None")
					latestEventID = res[0][0];
		 }
		 }); 
}

function saveFn(data, userData)
{

}

function setresult(leagueid,resultid,eventid,score)
{
	$.ajax({
		url: siteloc + scriptloc + "results.py/setresults",
		data: {
			leagueid:leagueid,
			resultid:resultid,
			eventid:eventid,
			score:score
		},
		dataType: 'json',
		success: function (res) {
			if (res != "None")
				console.log("success");
		}
		}); 
}

function getresult(leagueid,resultid,teamname1,teamname2,callback)
{
	$.ajax({
		url: siteloc + scriptloc + "results.py/getresults",
		data: {
			leagueid:leagueid,
			resultid:resultid,
		},
		dataType: 'json',
		async:false,
		success: function (res) {
			if (res != "None")
			{
				callback(res[0][1],teamname1,teamname2,resultid);
			}
				
		}
		}); 
}

function setEventIdTag(data,teamname1,teamname2,rId)
{
	if (data == "None")
	{
		alert("hey jude");
		setEvent(teamname1,teamname2,getParameterByName('id'),null,null,null,null);
		setresult(getParameterByName('id'),rId,latestEventID,null)
		if (rId % 2 == 0)
			setresult(getParameterByName('id'),rId+1,latestEventID,null)
		else
			setresult(getParameterByName('id'),rId-1,latestEventID,null)
		
		data = latestEventID;
		latestEventID = "";
		
	}
	
	$("#eventid").empty();
	$("#eventid").append(data);
}

/*function getresultsinleague(leagueid,callback)
{
	$.ajax({
		url: siteloc + scriptloc + "results.py/getresultsinleague",
		data: {
			leagueid:leagueid
		},
		dataType: 'json',
		async: false,
		success: function (res) {
			if (res != "None")
			{
				console.log(res);
				console.log("here");
				callback(res);
			}
				
		}
	}); 
}*/


function setbracketinforesults(leagueid,managerid,results)
{
	$.ajax({
		url: siteloc + scriptloc + "getLeague.py/setbracketinforesults",
		data: {
			leagueid:leagueid,
			managerid:managerid,
			results:JSON.stringify(results)
		},
		dataType: 'json',
		async: false,
		success: function (res) {
			if (res != "None")
			{
				console.log(res);
			}
				
		}
	}); 


}
