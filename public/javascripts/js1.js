function validation(){
var x = document.forms["addhospital"]["Hospital Name"].value;
var y = document.forms["addhospital"]["regno"].value;
var z = document.forms["addhospital"]["email"].value;
var w = document.forms["addhospital"]["haddress"].value;
if(x||y||z||w ==""){

	alert("please fill this");
	return false;
}

}


function black(){

	document.getElementById('jumbo').style.background="";
}