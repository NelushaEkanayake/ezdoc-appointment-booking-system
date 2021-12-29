function search1() {
    
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
      $("#search-button1").on("click", function(event) {
           event.preventDefault();

          // let clinicname = $("#clinicName").val();
        let doctor = $("#search_input_2").val();
         let hospital = $("#search_input_3").val();
         let Date = $("#search_input_4").val();

                $.ajax({
                url: `${window.location.origin}/search`,
                method: "POST",
                data: {doctor: doctor, hospital: hospital,Date: Date},
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
search1();
});

