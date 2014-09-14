$(function() 
{
	redirect_ifNotloggedin();
	
	fetchLeagueBracketInfo(getParameterByName('id'))
	//parameter depends on who's the user, used on leagueinfo.html
	
	$("#confirmteams").click(function(){
		var participantTeams = []; 
		$('#teamcollection > tbody > tr').each(function(i,row) {
			participantTeams.push(row.cells[0].textContent);
		});
		participantTeams = JSON.stringify(participantTeams, null, 2);
		console.log(participantTeams);	
		confirmAddTeamsInLeague(getParameterByName('id'),getCookie('userid'),participantTeams);
	});
	
	$("#newleague").click(
		function () {
			$("#create").show();
			$("#status").empty();
            $("#adddialog").dialog('open');
            return false;
        }
    );
        
    $("#addteams").click(
		function(){
			$("#addteamdialog").dialog('open');
		}
    );
	
		
	$(document).on("click", "a.removeteams", function(){
		 $(this).parent().parent().remove();
	});
	
	
}); 
