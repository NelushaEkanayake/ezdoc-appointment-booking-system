function doctorpageLogout() {
    
        //event.preventDefault();

       /* let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let NIC = $("#NIC").val();
        let username = $("#username").val();
        let passwordConfirmation = $("#passwordConfirmation").val();
        let password = $("#password").val();*/
        //let passwordConfirmation = $("#passwordConfirmation").val();
        //let fullName = $("#fullName").val();

        //validate input
       // let check = validateInput(firstname,lastname,NIC,username,password,passwordConfirmation);
          $("#docsignout").on("click", function(event) {
               event.preventDefault();

                    $.ajax({
                    url: `${window.location.origin}/doctors/logout`,
                    method: "GET",
            
                    success: function(data) {
                
                          alert("you are logged out!");
                          document.location.href = "/";
                          /*newnavItem.parentNode.replaceChild(navItem,newnavItem);
                          newItem.parentNode.replaceChild(listItem,newItem);*/
                    
                

                         },
                     error: function(err) {
                        alert("error");
                        }
                     })
        


                });
       
            //send data to node server with ajax
            //url map to http://localhost/register-new-user
            


        
    



    
}








$(document).ready(function() {
    doctorpageLogout();
});






