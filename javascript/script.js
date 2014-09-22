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
					data: 
						{username:$("#username").val() } 
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
                    email: true
                },
                agree: "required",
                phone: {
                    required: true,
                    digits: true,
                    minlength: 11,
                    maxlength: 11
                },
				address: {
					required: true,
					minlength: 1  
				}
				
            },
            messages: {
			
                email: "Invalid email",
				address:  {
                    required:  "Enter Address",
                    minlength: "Block no. Purok Province City"
                },
                firstname:  {
                    required:    "Enter Firstname",
					letters: "Enter Valid firstname",
                    minlength: "Enter Firstname"
                },
                lastname:  {
                    required:    "Enter Lastname",
					letters: "Enter Valid Lastname",
                    minlength: "Please Enter lastname"
                },
                username: {
                    required:    "Enter Username",
                    minlength: "Enter at least 6 characters",
					remote: "Username already exist"
                },
                password1: {
                    required:    "Enter password",
                    minlength: "Must be at least 5 characters long"
                },
                password2: {
                    required:   "Please confirm your password",
					minlength: "Must at least 5 characters long",
                    equalTo:    "Enter the same password as above"
                },
                agree: "Check it",
                phone: {
                    required:"Please enter phone number",
                    digits: "Please enter only digits",
                    minlength:"Must be a valid phone number    ex. '09309134970' ",
                    maxlength:"Must be a valid phone number    ex. '09309134970' "
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
					
					'<h1   face="Comic sans MS"   align="left"   style="color:#352c2c;  "   > ' +
					'<font  > Dear ' +  
					'<mark> '+$("#firstname").val()  +'</mark>'  + 
					' , <br><br>  </font>' +
					' <br>  </h1>'+
					'<p   align="left"  style="font-size:20px" " style="color:#595959;  "> ' +
 			 
					'You are now officialy registered ! ,You can now log in to your account'+
					' to start creating and managing your leagues anytime with GameOverseer! </p>'+
					 '<br><br><br>'+
					' <p align="right"  style="font-size:20px" " style="color:#595959; " > '+
					' Thankyou for choosing  <br>  GameOverseer, <br> <mark>  Teamoga </mark> </p> '); 
					
					
				 }
				});
				}
	        });

			  