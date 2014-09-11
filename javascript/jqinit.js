$(function() 
{
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
}); 
