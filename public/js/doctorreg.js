function validateInput3(doctorname,regno,passwordConfirmation,username,password) {
    //check email
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    if(username.match(EMAIL_REG)){
        $("#Dusername").removeClass("is-invalid");
    }else {//empty email input or invalid email
        $("#Dusername").addClass("is-invalid");
    }

    //check password
    if(password.length > 2){
        $("#Dpassword").removeClass("is-invalid");
    }else {
        $("#Dpassword").addClass("is-invalid");
    }

    //check passwordConfirmation
    if(passwordConfirmation === password){
        $("#Dpassword2").removeClass("is-invalid");
    }else{
        $("#Dpassword2").addClass("is-invalid");
   }


    if(doctorname !==""){
         $("#DName").removeClass("is-invalid");
     }else{
        $("#DName").addClass("is-invalid");
     }

     if(regno !==""){
         $("#Dregno").removeClass("is-invalid");
     }else{
        $("#Dregno").addClass("is-invalid");
     }

     



    if(!username.match(EMAIL_REG) || password.length <= 2  || doctorname ==""|| regno ==""|| password !== passwordConfirmation )
        return true; //has errors

    return false;
}

function handleClickRegisterDOC() {
    $("#Dregbtn").on("click", function(event) {
        alert("ejfheiu");
        event.preventDefault();

        let doctorname = $("#DName").val();
        let regno = $("#Dregno").val();
        let confirmpassword = $("#Dpassword2").val();
        let username = $("#Dusername").val();
       // let passwordConfirmation = $("#passwordConfirmation").val();
        let password = $("#Dpassword").val();
        //let passwordConfirmation = $("#passwordConfirmation").val();
        //let fullName = $("#fullName").val();

        //validate input
        let check1 = validateInput3(doctorname,regno,confirmpassword,username,password);

       if (!check1) {
         alert("hi");
            //send data to node server with ajax
            //url map to http://localhost/register-new-user
             //var signupAPI = URL + "/users/signup";
            $.ajax({
                url: `${window.location.origin}/doctors/signup`,
                method: "POST",
                data: {username: username, doctorname: doctorname,regno: regno, password: password},
                success: function(data) {

        

                	
                	
                    $("#DoctorLogin").modal('hide');
                    alert("Create a new account succeeds!");

                    
                    
                    console.log(data);

                    $.ajax({
                    url: `${window.location.origin}/doctors/login`,
                    method: "POST",
                    data: {username: username, password: password},
                    success: function(data) {
                           

                           document.location.href = "/doctorpage";
                           console.log(data);



                           




                              


                           
                        },
                    error: function(err) {
                        alert("Your email or password entered is incorrect. Please try again!");
                         }
                     })


                     

                    



                },
                error: function(err) {
                   alert(err.responseText);
                }
            });


        }
    });



    
}








$(document).ready(function() {
    handleClickRegisterDOC();
});


