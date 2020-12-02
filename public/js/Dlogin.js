function DhandleLoginBtn(){
    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        let username = $("#username1").val();
        let password = $("#password1").val();

        $.ajax({
            url: 'http://localhost:3000/doctors/login',
            method: "POST",
            data: {username: username, password: password},
            success: function(data) {
                
        
                
                    
                
                $("#loginModal").modal('hide');
                alert("You are successfully loged in!");
                document.location.href = "/doctorpage";
                //console.log(data);



                $("#docsignout").on("click", function(event) {
               event.preventDefault();

                    $.ajax({
                    url: `${window.location.origin}/doctors/logout`,
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




               
            },
            error: function(err) {
                alert("Your email or password entered is incorrect. Please try again!");
            }
        })
        


    });
}






$(document).ready(function() {
    DhandleLoginBtn();
   
});  

