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
                  console.log(res[0][0]);
                  if(res[0][0] == 'OK')
                  {    console.log(res[0][0]);
					$("p4").html(
					'<h1> Successfully Changed!</h1>' +
					'<h6><a href ="#" onclick = redirect(2);>go back to your profile  &rarr;</a></h6>');    
					} // end if
				else{
				  	$("p5").html(
					'<h4 align="center"> Wrong Username/Password</h4>');   
					}
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

function fetchLeagueByManagerId(managerid,handle)
{
  $.ajax({
      url: siteloc + scriptloc + "getLeague.py/getLeagueInfoByManager",
      data: {managerid:managerid},
      dataType: 'json',
      async:false,
      success: function (res) {
                   
                  if(res[0][0] != "None")                  
                  {
					handle(res);
				  }
        }
  });
  
}

function displayTableManagerLeague(res)
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

function confirmGatePass(managerid, password, league)
{
  $.ajax({
	url: siteloc + scriptloc + "confirmGatePass.py",
	data: { managerid: managerid,
			password: password,
			league: league
			},
    dataType: 'json',
	success: function (res) {
				if (res[0][0] != "N"){
					$('#incorrectGP').empty();
					document.location.href = '/GameOverseer/leagueinfo.html?id=' + res[0][0];
				}
				else{
					$('#incorrectGP').empty();
					$('#incorrectGP').append("Incorrect password");
					$('#incorrectGP').css('color','#FF0000');
				}
	}
	});
}

function fetchTeamLeagueById(managerid)
{
  $.ajax({
      url: siteloc + scriptloc + "getLeague.py/getTeamLeagueByID",
      data: {managerid:managerid},
      dataType: 'json',
      success: function (res) {
                  if(res[0][0] != "None")                  
                  {
					for (i=0;i<res.length;i++)
					{
						$("#GPass").show();
						row = res[i];
						
						$("#teamcollection").append('<tr><td>'+row[0]+'</td></tr>');
						
					}
				  }
				  else{
					$("#teamcollection").append('<tr><td>None</td></tr>');
				  }
        }
  });
  
}

function fetchOtherLeagueByManagerId(managerid)
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


function getNumMatches(leagueidarray)
{
  var n;
  $.ajax({
      url: siteloc + scriptloc + "getNumMatch.py?",
      data:{
      		leagueidarray:JSON.stringify(leagueidarray)
      },
	  async:false,
	  dataType: 'json',
	  success: function (res) {
				if(res[0][0] != "None" )
                  {
					
					/*for (i = 0; i < res.length; i++)
					{
						row = res[i];
      
						for (j = 0; j < row.length ; j++)
							if(row[j] != "[" && row[j] != "]" && row[j] != "," && row[j] != '"')
								num += row[j];  
					} */
					console.log(res);
					n = res;
				  }
              }
	});
	return n;
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

function daysBetween( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds

  var difference_ms = date2_ms - date1_ms;
 
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}

function createDiv(team1,team2,time,eid)
	{

		
		if (time == "None")
			time = "No date yet"
		else
		{
			time = daysBetween(new Date(),new Date(time));
			time +=1;
			if (time > 0)
				time +=  " day(s) to go";
			else if (time < 0)
				time += " day(s) ago"
			else 
			{
				time="";
				time += " today";

			}
				
		}
			
		divTag = document.createElement("div");
        
		divTag.id = "div" + k ;
        
		divTag.setAttribute("align","center");
        
        divTag.style.margin = "20px auto";
        
        divTag.innerHTML = '<a href="#" onClick=showModal('+eid+')>' +team1 +' vs '+ team2  + '</a> '+time;
		
		$('#r').append(document.body.appendChild(divTag));
		
	}
function showModal(eid)
{
	jQuery.noConflict();
	getEventFullInfo(eid);
	$("#viewUpcomingmatchesmodal").modal();
	

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

function appendPaginate(numberRows,leagueArray)
{
	$.ajax({
        url: siteloc + scriptloc + "getNumMatch.py/getEventInfoByPage?",
        data: {leagueidarray:JSON.stringify(leagueArray),offset:0},
        dataType: 'json',
        async:false,
        success:
        function (res){
        	console.log(res);
        	if (res[0][0] != "None")
        	{
        		 for (i=0;i<res.length;i++)
	            {
	            	 createDiv(res[i][1],res[i][2],res[i][4],res[i][0])
	            	 console.log(i);
	            }

        	}
	           
               
        }
    }); 
	$('#extra').bootpag({
	   total: Math.ceil(numberRows/4),
	   page: 1,
	   maxVisible: 5,
	   href: "#pro-page-{{number}}",
	   leaps: false,
	   next: 'next',
	   prev: 'prev' 
	}).on('page', function(event, num){
		

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

	 		
		  var r = resultsArr;
		  var t = res[0][2];
		  
          if(res[0][0] != "None" && res[0][4] == 1)
            {
				minimalData = {
				teams :t,
				results :resultsArr
				
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

function checkTempMan(id)
{
   $.ajax({
      url: siteloc + scriptloc + "checkTempMan.py",
      data: {id:id},
      dataType: 'json',
      success:
	  function (res) 
	  {
			if (res[1][0] != "None") 
			{
				$('#notice').empty();
				for (i = 1; i < res[0][0]; i++)
				{
					row = res[i];
					for (j = 0; j < 1 ; j++){
						
						$('#notice').append("You have been given authority by Manager: " 
						+ row[0] + " " + row[1] + " ");
							
						$('#notice').css('color','white');			
					}
					
					//$('#notice').append("(Username: " + res[4][i-1] + ") "+
					//"to manage his/her league: " + res[3][i-1] +". Your password is: " + res[i][2] + "<br><br>");
				}
			}
			else
			{
				$('#notice').empty();
				$('#notice').append("None");
				$('#notice').css('color','white');
			}
      } 
      }); 
}


function modify_qty()
{
   var qty = document.getElementById('counts').value;
				  var new_qty = 0;
    
				 if (new_qty < 0) 
				 {
					new_qty = 0;
			     }
    
				document.getElementById('counts').value = new_qty; 
}

 

function setTempManPass(mainManID, tempMan, password, tempLeague)
{
   $.ajax({
      url: siteloc + scriptloc + "setTempManPass.py",
      data: {mainManID:mainManID,
	     tempMan:tempMan,
		 password: password,
		 tempLeague: tempLeague},
      dataType: 'json',
      success:
	  function (res) 
	  {
			if (res[0][0] == "OK") 
			{
				$('#status').empty();
				$('#status').append("Temporary Manager already set");
				$('#status').css('color','white');
			}
			else
			{
				$('#status').empty();
				$('#status').append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Username or league does not exist");
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
    async:false,
    dataType: 'json',	
    success: function (res) {
                if(res[0][0] != "None")
                {
					if (res[0][0] == "Successfully Created")
					{
						$("#addleague").hide();
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
						fetchLeagueByManagerId($.cookie('managerid'),displayTableManagerLeague);
					else 
						alert("Failed to delete");
				} 
        }
	});
}

function verifydelete(leagueid,managerid)
{
	//pass the needed parameters by the dialogbox for deleteleague call later
	/*$("#dialog-confirm")
		.data('leagueid',leagueid)
		.data('managerid',managerid)
		.dialog('open');
*/
	$("#confirmdelete").click(function(){
		 deleteLeague(leagueid,managerid);
		 $("#modalconfirmdelete").modal('hide');
	});
	$("#modalconfirmdelete").modal();

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
						//alert(res[0][0]);
						$("#teamcollection tbody").remove();
						$("#teamname").val('');
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
 			var name;
			row = res[0][3];
			if (row)
			{ 
				
				table = "";
				for (i = 0;i<row.length;i++)
				{	
				 	temp = row[i].replace(" ","/");
					table += "<tr><td>"+row[i]+"</td><td>"
					+'<a href="#" onClick = deleteTeamsInLeague("'+temp+'",'+$.cookie('managerid')+','+getParameterByName('id')+')>Remove</a></td>';
				}
				//table=table.replace(/'/g,"&#39;").replace(/"/g,'\\"');
				$("#teamcollection").append(table);
			}
			
 	
}

function deleteTeamsInLeague(participantTeam,managerid,leagueid)
{
	participantTeam = participantTeam.replace('/',' ');
	$.ajax({
		url: siteloc + scriptloc + "getLeague.py/deleteTeamInLeague?",
		data: {leagueid:leagueid,
			   managerid:managerid,
			   participantTeam:participantTeam
		},
		dataType: 'json',
		success:
		function (res){	
				console.log(res);
			 $("#teamcollection tbody").remove();
			 getBracketInfo(leagueid,viewParticipantsInLeague);
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

   
    return output;	
}

function lockTeams(userid,leagueid,managerid)
{
	var rows = document.getElementById("teamcollection").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
	 /check if number of pairings is a power of 2/
    if (((rows+1) & (rows)))
	{
	   $.ajax({
		url: siteloc + scriptloc + "getLeague.py/lockLeague?",
		data: {userid:userid,
			   leagueid:leagueid,
			   managerid:managerid
		},
		dataType: 'json',
		async:false,
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
 
					console.log(participants);
					setbracketinfo(userid,leagueid,managerid,results,participants);
				}
		}
		})
   });
	}
	else
	{
		alert('Number of teams must be 2^n');

	}
    
		
	
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
		async:false,
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
		//alert("hey jude");
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

function setscore(e_id,rId,score)
{
	var scriptFunction = "";
	if (rId % 2 == 0)
		scriptFunction = "setScoreT1";
	else
		scriptFunction = "setScoreT2";


	$.ajax({
		url: siteloc + scriptloc + "Event.py/"+scriptFunction,
		data: {
			e_id:e_id,
			score:score
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

function getEventIdOfResult(leagueid,resultid,callback)
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
			if (res[0][0] != "None")
			{
				callback(res[0][1]);
			}
				
		}
		}); 



}


function autocomplete()
 {
	var availableTags = [];
	$( "#temp-league" ).autocomplete({
		  source: availableTags,
		 
    });
}

function getEventFullInfo(eid)
{
	$.ajax({
		url: siteloc + scriptloc + "Event.py/getEventFullInfo?",
		data:{
			eid:eid
		},
		dataType:'json',
		async:false,
		success: function(res){
			if (res[0][0] != "None")
			{
				console.log(res);
				$("input").prop('disabled', true);
				if(res[0][3] != "None")
					$("#datepicker").val(res[0][3]);

				if (res[0][4] != "None")
					$("#location").val(res[0][4]);

				if (res[0][5] != "None")
					$("#timepicker1").val(res[0][5]);

				if (res[0][6] != "None")
					$("#endtime").val(res[0][6]);

				$('#belongingleague').empty();
				$('#belongingleague').attr("href","leagueinfo.html?id="+res[0][0])
				$('#belongingleague').append(res[0][7]);
				$('#teamversus').empty();
				$('#teamversus').append("<h4>"+res[0][1] + " vs "+res[0][2]+"</h4>");

			}
		}
	});

}



function removeAuthority(managerid)
{

 $.ajax({
      url: siteloc + scriptloc + "removeAuthority.py",
      data: {managerid:managerid },
      dataType: 'json',
      success:
	  function (res) 
	  { 
	  return res;
      } 
      }); 
	 
}


function getmanagername(managerid)
{

 $.ajax({
      url: siteloc + scriptloc + "getmanagername.py",
      data: {managerid:managerid },
      dataType: 'json',
      success:
	  function (res) 
	  { 
	  console.log(res);
	  if(res == null){
	   return "you have not given authority yet";
	   var element5 = document.getElementById("whoIs");
 		element5.innerHTML = res;
	  }
	  else{
	   var element5 = document.getElementById("whoIs");
 		element5.innerHTML = "Note: <br> <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "+
							 "You have given 'Manager "+res+"' an authority to  one"+
							 "  of your leagues <br> <br> &nbsp; &nbsp; &nbsp; &nbsp;"+
							 "Do you want to end his or her authority? ";
      } 
	  }
      }); 
	 
}

