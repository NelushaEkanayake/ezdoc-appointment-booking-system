$(document).ready(function(){
    			$("#reghospital").click(function() {
 				 var button = $(this);
  
 				 var id = button.val();

 			 	button.closest(".modal").modal('hide');
  				$('#' + id).modal('show');
				});

				$("#docreg").click(function() {
 				 var button = $(this);
  
 				 var id = button.val();

 			 	button.closest(".modal").modal('hide');
  				$('#' + id).modal('show');
				});

                


                 



                 $("#search_input_1").click(function(){
                    $("header").addClass("dark");
                    });

                

    	});

