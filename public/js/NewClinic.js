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
          $("#NCAB").on("click", function(event) {
               event.preventDefault();

               let clinicname = $("#clinicName").val();
              let time = $("#ctime").val();
             let doctorname = $("#dname").val();

                    $.ajax({
                    url: `${window.location.origin}/hospital/clinics`,
                    method: "POST",
                    data: {clinicname: clinicname, doctor: doctorname,time: time},
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

