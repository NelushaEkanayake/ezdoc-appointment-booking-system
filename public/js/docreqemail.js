function docreqemail() {
    
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
      $("#docreqsub").on("click", function(event) {
          //document.location.href = "/channelpage";
           event.preventDefault();
           let docname = $("#inputGroupdocn").val();
           let message =$("#docmessage").val();
                
                
                $.ajax({
                url: `${window.location.origin}/doctorRequest/sendemail`,
                method: "POST",
                data: {docname: docname, message: message},
                success: function(data) {
            
                      alert("Request Sent Successfully :) :)");
                      
                      //document.location.href = "/channelpage";
                      console.log("success");
                      

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
docreqemail();
});


