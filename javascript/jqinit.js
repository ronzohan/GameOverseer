$(function() 
{
	redirect_ifNotloggedin();
	
	fetchLeagueBracketInfo(getParameterByName('id'));
	//parameter depends on who's the user, used on leagueinfo.html
	
	if (getParameterByName('id'))
		viewParticipantsInLeague(getParameterByName('id'));
	
	getManagerPerUserId($.cookie('userid'));
	
	if ($.cookie('managerid'))
		fetchLeagueByManagerId($.cookie('managerid'));
	
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
