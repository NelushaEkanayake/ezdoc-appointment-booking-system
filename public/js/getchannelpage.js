function getchannelpage() {
    
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
          $("#getchannel").on("click", function(event) {
              //document.location.href = "/channelpage";
               event.preventDefault();

                    
                    
                    $.ajax({
                    url: `${window.location.origin}/patient/clinics`,
                    method: "GET",
            
                    success: function(data) {
                
                          //alert("you are logged out!");
                          
                          //document.location.href = "/channelpage";
                          
                          console.log(data);

                          /*newnavItem.parentNode.replaceChild(navItem,newnavItem);
                          newItem.parentNode.replaceChild(listItem,newItem);*/
                    
                

                         },
                     error: function(err) {
                        alert("error");
                        }
                     })

                    .done(function(data){
            $('body').html(data);
        });




                    

        


                });
       
            //send data to node server with ajax
            //url map to http://localhost/register-new-user
            


        
    



    
}








$(document).ready(function() {
    getchannelpage();
});


