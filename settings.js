
window.onload = function() {

	for(var i=0; i<duration.length; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", duration[i]);
		option.setAttribute("selected", "selected");
		option.innerHTML = duration[i];
		document.getElementById("duration_select").appendChild(option);	
	}
}