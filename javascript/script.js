var siteloc = "http://localhost/GameOverseer";
var scriptloc = "/scripts/";
  
  
$('#register').validate({
	   success: function(label) {
		label.text("ok!").addClass("success");  
	    },
 	   validClass: "success",
	   rules: {
                firstname: {
					required: true,
					letters : true,
					minlength: 1
					} ,  
				lastname: {
					required: true,
					letters: true,
					minlength: 1  
				},
                username: {
                    required: true,
                    minlength: 6,
					remote: { 
					url: siteloc + scriptloc + "checkusername.py",
					  
                     }
                },
                password1: {
                    required: true,
                    minlength: 5
                },
                password2: {
                    required: true,
		            minlength: 5,
                    equalTo: "#password1"
                },
                inputEmail: {
                    required: true,
                    email: true,
					remote: { 
					url: siteloc + scriptloc + "checkemail.py",
					 
                     }, 
                },
                agree: "required",
                phone: {
                    required: true,
                    digits: true,
                    minlength: 10,
                    maxlength: 10 
                },
				address: {
					required: true,
					minlength: 1  
				}
				
            },
            messages: {
				inputEmail:{
				required:  "* Empty",
                email: "* Invalid email", 
				remote: "* your registered!" 
				 },
				address:  {
                    required:   "* Empty",
                    minlength: "* province,city"
                },
                firstname:  {
                    required: "* Empty",
					letters: "* Valid firstname",
                    minlength: "*Enter Firstname"
                },
                lastname:  {
                    required:     "* Empty",
					letters: "* Enter Valid Lastname",
                    minlength: "* Please Enter lastname"
                },
                username: {
                    required:    "* Empty",
                    minlength: "* Enter at least 6 characters",
					remote: " * already exist"
                },
                password1: {
                    required:    " * Enter password",
                    minlength: "* min 5 chars"
                },
                password2: {
                    required:   "* Confirm password",
					minlength: "* min 5 chars",
                    equalTo:    "* not the same"
                },
                agree: " Check it",
                phone: {
                    required:"* Empty",
                    digits: "* digits only",
                    minlength:"* ex. '9309134970' ",
                    maxlength:"* ex. '9309134970' "
                }
			 
            }
        });
		 
		 $("button.signup").click(
		   
		  function () {
		  var register = $('#register').valid(); 
		  
		 if (register) {
           $.ajax({ 
				url: siteloc + scriptloc + "insertUser.py",
			data: 
				{
				
					username:$("#username").val(),
					password:$("#password1").val(),
					firstname:$("#firstname").val(),
					lastname:$("#lastname").val(),
					email:$("#email").val(),
					contactno:$("#contactno").val(),
					address:$("#address").val(),
				} ,
					dataType: 'json',
					success: function (res) {
					console.log("haaahaa");  
					$("#container1").html(
					
					'<br><br><br><br><h1    align="left"   style="margin-top:100px; color:white;  "   > ' +
					'<font  > Dear ' +  
					'<mark> '+$("#firstname").val()  +'</mark>'  + 
					' , <br><br>  </font>' +
					' <br>  </h1>'+
					'<p   align="left"  style="font-size:40px;color:white;"   > ' +
 			 
					'You are now officialy registered ! ,You can now log in to your account'+
					' to start creating and managing your leagues anytime with GameOverseer! </p>'+
					 '<br><br><br>'+
					' <p align="right"  style="font-size:20px;color:white;"   > '+
					' Thankyou for choosing  <br>  GameOverseer, <br> <mark>  Teamoga </mark> </p> '); 
					
					
				 }
				});
				}
	        });

			  