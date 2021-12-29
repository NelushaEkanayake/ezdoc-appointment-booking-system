function handleLoginBtn(){
    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        let username = $("#username1").val();
        let password = $("#password1").val();

        $.ajax({
            url: 'http://localhost:3000/users/login',
            method: "POST",
            data: {username: username, password: password},
            success: function(data) {

                $("#loginModal").modal('hide');
                alert("You are successfully loged in!");
                console.log(data);
                if(data.name){
                    const listItem = document.querySelector(".loginuser");
                    const newItem = document.createElement('li');
                    newItem.className += "nav-item";
                
                    newItem.innerHTML = '<a class="nav-link" href=""  id="NewUser"></a>';
                    
                    listItem.parentNode.replaceChild(newItem, listItem);
                    var usname = document.getElementById("NewUser");
                    usname.innerHTML = data.name;
    
                
    
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
         
                }

                if(data.doctor){
                    document.location.href = "/doctorpage";

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
                }

                if(data.hospital){
                    var name= data.hospital;
                    var id = data.user;
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
                }
                
        
                
                    
                
                



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
        


    });
}






$(document).ready(function() {
    handleLoginBtn();
   
});  

