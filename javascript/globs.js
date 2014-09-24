//define functions and global variables here...
var siteloc = "http://localhost/GameOverseer";
var scriptloc = "/scripts/";
 
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
				  }
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

   
function fetchProfileInfo(userid, userid_fk)
{
   $.ajax({
      url: siteloc + scriptloc + "getProfileInfo.py",
      data: {userid:userid, userid_fk:userid_fk 
             },
      dataType: 'json',
      success: function (res) {
				var k = 1;
				if(res[0][0] != "None")
                {
					for (i=0;i<res.length;i++){
						row = res[i];
					for (j = 0; j < row.length ; j++){
						
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
						
						$("#leaguetable").append('<tr><td><a href=leagueinfo.html?id='
												+row[0]+'>'+row[1]+'</a></td>'
											+'<td>'+row[2]+'</td>' + '<td>'+row[3]
											+'</td></tr>');
					}
				  }
        }
  });
  
}

function checkScore(ide)
{
  var string;
  $.ajax({
      url: siteloc + scriptloc + "getScore.py",
	  async:false,
	  data: {ide:ide
             },
	  dataType: 'json',
	  success: function (res) {
                  if(res[0][0] != "None" )
                  {
					string = "okay";
				  }
              }
	});
	return string;
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


var k = 1;
var e = 1;
function createDiv()
	{
		
		divTag = document.createElement("div");
        
		divTag.id = "div" + k ;
        
		divTag.setAttribute("align","right");
        
        divTag.style.margin = "20px auto";
        
        divTag.innerHTML = '<a href = "http://localhost/GameOverseer/details.html?k=' + k + '"> insertTN' + (e) + 'vs insertTN' + (e+1) + '</a>';
		
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
      url: siteloc + scriptloc + "getStart.py",
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
 
 
function fetchLeagueBracketInfo(league_id)
{
   $.ajax({
      url: siteloc + scriptloc + "getLeague.py/getBracketInfo?",
      data: {league_id:league_id},
      dataType: 'json',
      success:
	  
	  function (res){
		  var r = new Array(res[0][1]);
		  var t = res[0][2];
 
          if(res[0][0] != "None" && res[0][4] == 1)
            {
				var minimalData = {
				
				teams :t,
				results : r
						
				}			
				$('#leagueinfo').bracket
				({
					init:minimalData,
					onMatchClick: onclickbracket,
 
				});		
				$('#teamdraft').empty();
 
			} 
			else
			{
				$('#leaguetitle').empty();
				$('#leaguetitle').append(res[0][0]);
			}
        }
   }); 
}
function onclickbracket(data) {
  alert("onclick(data: '" + data[0]['name'] +" vs "+data[1]['name']+" MatchID: "+ data[2][2]+"')");
  console.log(data);
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
			if (res[0][0] != "Error") //if login is successful redirect page
			{
				$.cookie("username",username);
				$.cookie("userid",res[0][0]);
 
				window.location.replace("index.html"); 
			}
			
			else
			{
				$('#status').empty();
				$('#status').append("Login error.");
				$('#status').css('color','#FF0000');
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
						viewParticipantsInLeague(leagueid);
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
		document.location.href = '/GameOverseer/searchresult.html?query=' + document.getElementById('usename').value;
	else
		document.location.href = '/GameOverseer/searchusername.html?query=' + document.getElementById('name').innerHTML;
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
					$("#k").append('<h2> results found: </h2>');
					for (i = 0; i < res.length; i++)
					{
						row = res[i];
      
						for (j = 0; j < row.length ; j++)
						if(row[j] != "[" && row[j] != "]" && row[j] != "," && row[j] != '"')
						$("#name").append(row[j]);  
       
					} 
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
					$("#k").append('<h2> results found: </h2>');
					for (i = 0; i < res.length; i++)
					{
						row = res[i];
      
						for (j = 0; j < row.length ; j++)
						if(row[j] != "[" && row[j] != "]" && row[j] != "," && row[j] != '"')
						$("#name").append(row[j]);
					} 
                 }
				 
				 else{
				  $("#k").text('');
				  $("#k").append("No Results Found");
				}
		} 
     }); 
 }

function viewParticipantsInLeague(league_id)
{
	$.ajax({
		url: siteloc + scriptloc + "getLeague.py/getBracketInfo?",
		data: {league_id:league_id},
		dataType: 'json',
		success:
		function (res){
 
			row = res[0][3];
			if (row)
			{ 
				table = "";
				for (i = 0;i<row.length;i++)
				{
					table += "<tr><td>"+row[i]+"</td><td>"
					+'<a href="#" onClick = deleteTeamsInLeague("'+row[i]+'",'+$.cookie("managerid")
					+','+getParameterByName('id')+') class="glyphicon glyphicon-remove">Remove</a></td></tr>)';
				}
				$("#teamcollection").append(table);
			}
		}
   }); 
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

function randomPairs( teams ) {
    shuffle( teams );
    var output = [];
    for( var i = 0, n = teams.length;  i < n;  i += 2 ) {
        output.push([ teams[i], teams[i+1] ]);
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
		//i am repeating myself now
		function (res){
			var results = [];
			$.ajax({
			url: siteloc + scriptloc + "getLeague.py/getBracketInfo?",
			data: {league_id:leagueid},
			dataType: 'json',
			success:
			function (res){
			var participants = res[0][3];
			if (participants)
			{ 
				participants = randomPairs(participants);
				setbracketinfo(userid,leagueid,managerid,results,participants)
				location.reload();
			}
		}
   });
		}
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
		  source: availableTags
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
