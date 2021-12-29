
function newAppointment() {
         
          
        
          $(".docbook").on("click", function(event) {
               event.preventDefault();

               
                    const id = $(this).attr('data-id');

                   //let clinicid = document.querySelector('#xclinic');
                   // let clinicId = clinicid.getAttribute('name');

                    console.log(id);

              

                    $.ajax({
                    url: `http://localhost:3000/clinics/` + id,
                    method: "POST",
                    data: {},
                    success: function(data) {
                
                          alert("success");
                        
                          
                    
                

                         },
                     error: function(err) {
                        alert("error");
                        }
                     })
                    
        


                });
       
            
            


        
    



    
}








$(document).ready(function() {
    newAppointment();
});

