  $('form#register').validate({ // initialize the plugin
	   success: function(label) {
		label.text("ok!").addClass("success"); //if valid add class
	    },
 	   validClass: "success",
	   rules: {
                fullname: "required",  
                username: {
                    required: true,
                    minlength: 6
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
                    minlength: 10,
                    maxlength: 10

                }
            },
            messages: {
                firstname: "Enter your firstname",
                lastname: "Enter your lastname",
                username: {
                    required: "Please Enter username",
                    minlength: "Enter at least 2 characters"
                },
                password1: {
                    required: "Please confirm your password",
                    minlength: "Your password must be at least 5 characters long"
                },
                password2: {
                    required: "Please provide a password",
		    minlength: "Your password must be at least 5 characters long",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address",
                agree: "Please accept our policy",
                phone: {
                    required: "Please enter phone number",
                    digits: "Please enter only digits",
                    minlength: "Please specify a valid phone number",
                    maxlength: "Please specify a valid phone number"
                }
            }
        });
		
		
		  $("button.signup").click(function () {
            var register = $('#register').valid(); // Checking valid form
            if (register) {
                $.ajax({
                    type: "POST",
                    url: "register.html",
                    data: $('form#register').serialize(), //serialize form
                    success: function (msg) {
                       $("label.result").html(msg);       // Get status from process.php
                    }
                });
            }
        });