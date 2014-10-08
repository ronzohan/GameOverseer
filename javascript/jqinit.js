$(function() 
{
	redirect_ifNotloggedin();
	
	getBracketInfo(getParameterByName('id'),fetchLeagueBracketInfo);
	//parameter depends on who's the user, used on leagueinfo.html
	
	if (getParameterByName('id'))
		getBracketInfo(getParameterByName('id'),viewParticipantsInLeague);
	
	getManagerPerUserId($.cookie('userid'));
	
	if ($.cookie('managerid'))
		fetchLeagueByManagerId($.cookie('managerid'));
	
	$("#newleague").click(
		function () {
			$("#create").show();
			$("#status").empty();
			$("input").prop('disabled', false); //disable all inputs since league was been successfully created
			$("input[type=text]").val('');
            $("#newleagueModal").modal({backdrop:'static'});
             
        }
    );
        
    $("#addleague").click(
		function () {
			$("#create").show();
			$("#status").empty();
            setleague($.cookie('managerid'),$('#leaguename').val(),
			$('#fixturetype').val(),$('#sport').val());	
            fetchLeagueByManagerId($.cookie('managerid'));
        }
    );

    $("#addteams").click(
		function(){
			$("#addteammodal").modal(); 
			searchAutocomplete();
		}
    );
    $("#addteaminleague").click(function(){
    	var teamname = $('#teamname').val(); 							
		addTeamsInLeague(getParameterByName('id'),$.cookie('managerid'),teamname);
		
	    });
	
	$("#lockteams").click(
		function(){
			$("#confirmmodal").modal();
		}
	
	);
	
	$("#confirmteamsmodal").click(function(){
		lockTeams($.cookie('userid'),getParameterByName('id'),$.cookie('managerid'));
		getBracketInfo(getParameterByName('id'),fetchLeagueBracketInfo);
		$("#confirmmodal").modal('hide');
	});	
	$(document).on("click", "a.removeteams", function(){
		 $(this).parent().parent().remove();
	});

	$("#savechanges").click(
		function(){
			ReSchedE($("#eventid").text(),$("#datepicker").val(),$("#location").val(),$("#timepicker1").val(),$("#endtime").val())
			$("#myModal").modal('toggle');
		}
	);

	

}); 
