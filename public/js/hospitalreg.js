var URL = location.protocol + '//' + location.host;
function validateInput(FirstName,lastname,NIC,username,password,passwordConfirmation) {
    //check email
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    if(username.match(EMAIL_REG)){
        $("#username").removeClass("is-invalid");
    }else {//empty email input or invalid email
        $("#username").addClass("is-invalid");
    }

    //check password
    if(password.length > 2){
        $("#password").removeClass("is-invalid");
    }else {
        $("#password").addClass("is-invalid");
    }

    //check passwordConfirmation
    if(passwordConfirmation === password){
        $("#passwordConfirmation").removeClass("is-invalid");
    }else{
        $("#passwordConfirmation").addClass("is-invalid");
   }


    if(FirstName !==""){
         $("#FirstName").removeClass("is-invalid");
     }else{
        $("#FirstName").addClass("is-invalid");
     }

     if(lastname !==""){
         $("#lastname").removeClass("is-invalid");
     }else{
        $("#lastname").addClass("is-invalid");
     }

     if(NIC !==""){
         $("#NIC").removeClass("is-invalid");
     }else{
        $("#NIC").addClass("is-invalid");
     }



    if(!username.match(EMAIL_REG) || password.length <= 2 || password !== passwordConfirmation || FirstName ==""|| lastname ==""|| NIC =="")
        return true; //has errors

    return false;
}

function handleClickRegisterBtn() {
    $("#reghospital").on("click", function(event) {
        alert("ejfheiu");
        event.preventDefault();

        let FirstName = $("#FirstName").val();
        let lastname = $("#lastname").val();
        let NIC = $("#NIC").val();
        let username = $("#username").val();
        let passwordConfirmation = $("#passwordConfirmation").val();
        let password = $("#password").val();
        //let passwordConfirmation = $("#passwordConfirmation").val();
        //let fullName = $("#fullName").val();

        //validate input
        let check = validateInput(FirstName,lastname,NIC,username,password,passwordConfirmation);

       if (!check) {
            //send data to node server with ajax
            //url map to http://localhost/register-new-user
             //var signupAPI = URL + "/users/signup";
            $.ajax({
                url: `http://localhost:3000/users/signup`,
                method: "POST",
                data: {username: username, lastname: lastname,NIC: NIC,FirstName: FirstName, password: password},
                success: function(data) {

        

                	
                	console.log(data);
                    $("#register").modal('hide');
                    alert("Create a new account succeeds!");
                
                    //window.location.href = "/userpage";
                    console.log(data);

                    $.ajax({
                    url: `${window.location.origin}/users/login`,
                    method: "POST",
                    data: {username: username, password: password},
                    success: function(data) {
                           console.log(data);

                           /*let token =data.data;
                            console.log(token);
                           localStorage.setItem('token', token);*/

                           const listItem = document.querySelector(".loginuser");
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
                
                navItem.parentNode.replaceChild(newnavItem, navItem);




                                $("#LogOUT").on("click", function(event) {
               event.preventDefault();

                    $.ajax({
                    url: 'http://localhost:3000/users/logout',
                    method: "GET",
            
                    success: function(data) {
                
                          alert("you are logged out!");
                          newnavItem.parentNode.replaceChild(navItem,newnavItem);
                          newItem.parentNode.replaceChild(listItem,newItem);
                    
                

                         },
                     error: function(err) {
                        alert("error");
                        }
                     })
        


                });


                           
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
    handleClickRegisterBtn();
});


