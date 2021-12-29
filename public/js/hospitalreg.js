
function validateInput2(hospitalname,regno,address,username,password) {
    //check email
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    if(username.match(EMAIL_REG)){
        $("#husername").removeClass("is-invalid");
    }else {//empty email input or invalid email
        $("#husername").addClass("is-invalid");
    }

    //check password
    if(password.length > 2){
        $("#hospassword").removeClass("is-invalid");
    }else {
        $("#hospassword").addClass("is-invalid");
    }

    //check passwordConfirmation
    /*if(passwordConfirmation === password){
        $("#passwordConfirmation").removeClass("is-invalid");
    }else{
        $("#passwordConfirmation").addClass("is-invalid");
   }*/


    if(hospitalname !==""){
         $("#HospitalName").removeClass("is-invalid");
     }else{
        $("#HospitalName").addClass("is-invalid");
     }

     if(regno !==""){
         $("#HRegNo").removeClass("is-invalid");
     }else{
        $("#HRegNo").addClass("is-invalid");
     }

     if(address !==""){
         $("#hos_loca").removeClass("is-invalid");
     }else{
        $("#hos_loca").addClass("is-invalid");
     }



    if(!username.match(EMAIL_REG) || password.length <= 2  || hospitalname ==""|| regno ==""|| address =="")
        return true; //has errors

    return false;
}

function handleClickRegisterHOS() {
    $("#NewHos").on("click", function(event) {
        
        event.preventDefault();

        let hospitalname = $("#HospitalName").val();
        let regno = $("#HRegNo").val();
        let address = $("#hos_loca").val();
        let username = $("#husername").val();
       // let passwordConfirmation = $("#passwordConfirmation").val();
        let password = $("#hospassword").val();
        //let passwordConfirmation = $("#passwordConfirmation").val();
        //let fullName = $("#fullName").val();

        //validate input
        let check1 = validateInput2(hospitalname,regno,address,username,password);

       if (!check1) {
         
            //send data to node server with ajax
            //url map to http://localhost/register-new-user
             //var signupAPI = URL + "/users/signup";
            $.ajax({
                url: `${window.location.origin}/admins/signup`,
                method: "POST",
                data: {username: username, hospitalname: hospitalname,regno: regno,address: address, password: password},
                success: function(data) {

        

                	
                	
                    $("#addhospital").modal('hide');
                    alert("Create a new account succeeds!");

                    
                    
                    console.log(data);

                    $.ajax({
                    url: `${window.location.origin}/users/login`,
                    method: "POST",
                    data: {username: username, password: password},
                    success: function(data) {
                           
                        var name= data.hospital;
                        document.location.href = "/adminpage"+'/'+name; 
    
                        $("#hossignout").on("click", function(event) {
                            event.preventDefault();
             
                                 $.ajax({
                                 url: `${window.location.origin}/admins/logout`,
                                 method: "GET",
                         
                                 success: function(data) {
                             
                                       alert("you are logged out!");
                                       document.location.href = "/";
                                 
                             
             
                                      },
                                  error: function(err) {
                                     alert("error");
                                     }
                                  })
                     
             
             
                             });



                           /*let token =data.data;
                            console.log(token);
                           localStorage.setItem('token', token);*/

                           /*const listItem = document.querySelector(".loginuser");
                const newItem = document.createElement('li');
                newItem.className += "nav-item";
            
                newItem.innerHTML = '<a class="nav-link" href=""  id="NewUser"></a>';
                
                listItem.parentNode.replaceChild(newItem, listItem);
                var usname = document.getElementById("NewUser");
                usname.innerHTML = FirstName;

            

                const navItem = document.querySelector(".ReGU");
                const newnavItem = document.createElement('li');
                newnavItem.className += "nav-item";
                newnavItem.setAttribute("id", "LogOUT");
                

                newnavItem.innerHTML = '<a class="nav-link" href="">Logout</a>';
                
                navItem.parentNode.replaceChild(newnavItem, navItem);*/




                              


                           
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
    handleClickRegisterHOS();
});


