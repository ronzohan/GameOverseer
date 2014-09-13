$(function() 
{
	if (isloggedin())
		$("#header").load("header.html");
  	else 
		window.location.replace("login.html");
 
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
