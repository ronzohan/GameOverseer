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

   
function displayinfo(userid)
{
   $.ajax({
      url: siteloc + scriptloc + "getUser.py",
      data: {userid:userid,
             },
      dataType: 'json',
      success: function (res) {
				var k = 1;
				if(res[0][0] != "None")
                {
					for (i=0;i<res.length;i++){
						row = res[i];
					for (j = 1; j < row.length ; j++){
						if(k == 1)
							$("#username1").append(row[j]);
						
						if(k == 2)
							$("#firstname1").append(row[j]); 
       					
						if(k == 3)
							$("#lastname1").append(row[j]);
        
						if(k == 4)
							$("#emailadd1").append(row[j]);
        
						if(k == 5)
							$("#phone1").append(row[j]);
       
						if(k == 6)
							$("#address1").append(row[j]);
       
						k = k+1;      
					 }  
					}
				}
        }
    });
 
}

function fetchProfileInfo(userid, Manager_id)
{
   $.ajax({
      url: siteloc + scriptloc + "getProfileInfo.py",
      data: {userid:userid, Manager_id:Manager_id,
             },
      dataType: 'json',
      success: function (res) {
				var k = 1;
				if(res[0][0] != "None")
                {
					for (i=0;i<res.length;i++){
						row = res[i];
					for (j = 1; j < row.length ; j++){
						if(k == 1)
							$("#username1").append(row[j]);
						
						if(k == 2)
							$("#firstname1").append(row[j]); 
       					
						if(k == 3)
							$("#lastname1").append(row[j]);
        
						if(k == 4)
							$("#emailadd1").append(row[j]);
        
						if(k == 5)
							$("#phone1").append(row[j]);
       
						if(k == 6)
							$("#address1").append(row[j]);
       
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
                  {} 
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
		 
		url: siteloc + scriptloc + "getLeague/addTeamsInLeague",
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

function checkScore(ide)
{
  var string = "";
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
					$("p").append("Score: ");
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


var num = 0;
function getNumMatches(ide)
{
  $.ajax({
      url: siteloc + scriptloc + "getStart.py",
	  async:false,
	  data: {ide:ide
             },
	  dataType: 'json',
	  success: function (res) {
                  if(res[0][0] != "None" )
                  {
					num++;
					getNumMatches(ide+1);
				  }
              }
	});
	return num;
}


var k = 1;
function createDiv()
	{
		
		divTag = document.createElement("div");
        
		divTag.id = "div" + k ;
        
		divTag.setAttribute("align","right");
        
        divTag.style.margin = "20px auto";
        
        if(k == 1)
			divTag.innerHTML = '<a href ="http://localhost/GameOverseer/sample details (matchticker).html"> insertTN' + (k) + 'vs insertTN' + (k+1) + '</a>';  
		else
			divTag.innerHTML = '<a href ="#"> insertTN' + (k+1) + 'vs insertTN' + (k+2) + '</a>'; 
		
		$('#r').append(document.body.appendChild(divTag));
		
		k++;
	}
	
var Time;
function getStart(ide, timer)
{
	$.ajax({
      url: siteloc + scriptloc + "getStart.py",
      data: {ide:ide
             },
	  success: function (res) {
				  var t1 = res[17][0] + res[18][0];
				  var t2 = res[19][0] + res[20][0] + res[21][0];
				  var string = "";
				  
				  for (i = 0; i < (res.length - 12); i++)
					{
						row = res[i];
						
						for (j = 0; j < row.length ; j++)
							if(row[j] != "[" && row[j] != "]" && row[j] != "," && row[j] != '"'  && row[j] != '+' )
								string += row[j];		
							
					}
					
					var date = new Date(string);
					var string = ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) 
									+ "/" + date.getFullYear() + " " + t1 + t2;
				
					if(t1 < 12)
						string += " " + "AM";
					else
						string += " " + "PM";

					string = '"' + string + '"';
				
					var TargetDate = "";
					TargetDate += string;
					
					TimerID = timer;
					FinishMessage = "Live";
					
					var dtarg = new Date(TargetDate);
					var dnow = new Date();
				
					diff = new Date(dtarg - dnow);
					Time = Math.floor(diff.valueOf()/1000);
				
					if(diff < 0){
						Time = 0;
					}
					
					new CreateTimer(TimerID, Time);
		}
			
	});
}


var Timer;
var TotalSeconds;
var p;
function CreateTimer(TimerID, Time){
    p = 0;
	var oop=this;
	//alert(TimerID);
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
		this.Timer.innerHTML += "&nbsp;&nbsp;&nbsp;" + TimeStr;
		$('#r').append(document.body.appendChild(this.Timer));
		p++;
	}
 }	
}


function fetchLeagueBracketInfo(league_id)
{
   $.ajax({
      url: siteloc + scriptloc + "getLeague/getBracketInfo?",
      data: {league_id:league_id},
      dataType: 'json',
      success:
	  
	  function (res){
		  var r = new Array(res[0][1]);
		  var t = res[0][2];
 
          if(res[0][0] != "None" && r[0] != null)
            {
				var minimalData = {
				
				teams :t,
				results : r
						
				}
		  $(function()
		  {				
			$('#leagueinfo').bracket
			({
				init:minimalData
			});		
		  })
			} 
			else
			{
				$('#leaguetitle').empty();
				$('#leaguetitle').append(res[0][0]);
			}
        }
   }); 
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
    setCookie("username","",-1);
    setCookie("userid","",-1);
    setCookie("managerid","",-1);
    
    window.location.replace("login.html");	
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


function getCookie(cname) 
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    
    for(var i=0; i<ca.length; i++) 
	{
	    var c = ca[i];
		
		while (c.charAt(0)==' ') 
			c = c.substring(1);
        	
        if (c.indexOf(name) != -1) 
        	return c.substring(name.length, c.length);
			
    } 
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
	url: siteloc + scriptloc + "getLeague/setleague",
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
	url: siteloc + scriptloc + "getLeague/deleteLeague",
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
		 
		url: siteloc + scriptloc + "getLeague/addTeamsInLeague",
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

function fetchusername()
{
 $("#container").load("searchresult.html");
   $.ajax({
      url: siteloc + scriptloc + "getusername.py",
      data: {username:$("#usename").val().toLowerCase()},
   
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
				 
				 else {
				    fetchleague();
				 }
				
				
		} 
    }); 
}

function fetchleague()
{
$("#container").load("searchresult.html");
   $.ajax({
      url: siteloc + scriptloc + "getleaguename.py",
      data: {name:$("#usename").val().toLowerCase()},
   
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
				  window.location.replace("noresult.html");
				
				}
		} 
    }); 
}

function viewParticipantsInLeague(league_id)
{
	$.ajax({
		url: siteloc + scriptloc + "getLeague/getBracketInfo?",
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
		url: siteloc + scriptloc + "getLeague/deleteTeamInLeague?",
		data: {leagueid:leagueid,
			   managerid:managerid,
			   participantTeam:participantTeam
		},
		dataType: 'json',
		success:
		function (res){
			 $("#teamcollection tbody").remove();
			 viewParticipantsInLeague(leagueid);
		}
   }); 
	
	
}

function getManagerPerUserId(userid)
{
	$.ajax({
		url: siteloc + scriptloc + "manager/getManagerPerUserId?",
		data: {userid:userid
		},
		dataType: 'json',
		success:
		function (res){
			 
			 $.cookie("managerid",res[0][0]);
			//setCookie("managerid",res[0][0],2);
		}
   }); 
	
	
	
}
