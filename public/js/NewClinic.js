function newclinic() {
    
        //event.preventDefault();

       /* let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let NIC = $("#NIC").val();
        let username = $("#username").val();
        let passwordConfirmation = $("#passwordConfirmation").val();
        let password = $("#password").val();*/
        //let passwordConfirmation = $("#passwordConfirmation").val();
        

        //validate input
       // let check = validateInput(firstname,lastname,NIC,username,password,passwordConfirmation);
          $("#NCAB1").on("click", function(event) {
               event.preventDefault();

              // let clinicname = $("#clinicName").val();
              let time = $("#time1").val();
             let doctorid = $("#doctor1").val();
             let Date = $("#date1").val();

                    $.ajax({
                    url: `${window.location.origin}/hospital/clinics`,
                    method: "POST",
                    data: {time: time, doctorid: doctorid,Date: Date},
                    success: function(data) {
                
                          alert("success");
                        
                          /*newnavItem.parentNode.replaceChild(navItem,newnavItem);
                          newItem.parentNode.replaceChild(listItem,newItem);*/
                    
                

                         },
                     error: function(err) {
                        alert("error");
                        }
                     })
        


                });
       
            
            


        
    



    
}








$(document).ready(function() {
    newclinic();
});

