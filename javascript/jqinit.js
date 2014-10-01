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
            $("#adddialog").dialog('open');
            return false;
        }
    );
        
    $("#addteams").click(
		function(){
			$("#addteamdialog").dialog('open');
			searchAutocomplete();
		}
    );
	
	$("#lockteams").click(
		function(){
			$("#confirm-dialog").dialog('open');
		}
	
	);
		
	$(document).on("click", "a.removeteams", function(){
		 $(this).parent().parent().remove();
	});

	$("#savechanges").click(
		function(){
			ReSchedE($("#eventid").text(),$("#datepicker").val(),$("#location").val(),$("#timepicker1").val(),$("#endtime").val())
			$("#myModal").modal('toggle');
		}
	);

	$("#saveresults").click(
		function(){
			setbracketinforesults(getParameterByName('id'),$.cookie('managerid'),minimalData['results']);
		}
	);

}); 
