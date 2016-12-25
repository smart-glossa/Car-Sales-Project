function getCookie(uname) {
	var name = uname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length,c.length);
		}
	}
	return undefined;
}

function applyUser() {
	var usname = getCookie("uname");
	
	$.ajax({
		//http://localhost:8080/carsales/car?operation=getUserName&uname=sathish
		url: "/carsales/car?operation=getUserName&uname=" + uname,
		type: 'POST'
	})
	.done(function(result){
		result = JSON.parse(result);
		if (result.status == 1) {
			$(".showusername").text("Welcome Mr. " + result.message);
		}
	})
	.fail(function(result){
		console.log(result);
	});
	
}
 function menu() {
 	var div = document.createElement("div");
 	div.className = "menuBar";
 	var strVar="";
 	strVar += "<img src='images/1.png' alt=\"logo\" id='menuLogo'>";
	//strVar += "<div class=\"hiddenfile\">";
	//strVar += "	  <input name=\"upload\" type=\"file\" id=\"profileupload\"\/>";
	//strVar += "	<\/div>";
	strVar += "<br>";
	strVar += "<ul>";
	strVar += "  <li><a class=\"active\" id='addcar'onclick=\"cardetail()\" >Add Car Details<\/a><\/li>";
	strVar += "  <li><a id='billMenu'>All Car Detail<\/a><\/li>";
	strVar += "  <li><a id='paymentMenu'>Payment<\/a><\/li>";
	strVar += "  <li style=\"float:right\"><a id=\"logout\">Logout<\/a><\/li>";
	strVar += "  <li style=\"float:right\"><a class=\"UserDetails\" href=\"#about\">About<\/a><\/li>";
	strVar += "<\/ul>";
	div.innerHTML = strVar;
	return div;
}

function cardetail() {
	var div = document.createElement("div");
	div.className = "addcar";
	var html = '<h3>Add Car Details</h3>'
	+ '<table class="car">'
	+ '<tr><td><label>CarId:</label></td><td> <input type=text id="cid" class="add"></td></tr>'
	+ '<tr><td><label>CarNumber:</label></td> <td><input type=text id="cno" class="add"></td></tr>'
	+ '<tr><td><label>CarName:</label></td><td> <input type=text id="cname" class="add"></td></tr>'
	+ '<tr><td><label>CarColor:</label></td><td> <input type=color id="ccolor" class="add"></td></tr>'
	+ '<tr><td><label>CarCost:</label></td><td> <input type=text id="cost" class="add"></td></tr>'
	+ '<tr><td><label>carphoto:</label></td><td><input type=file id="profile" class="add"></td></tr>'
	+ '<tr><td></td><td><input type=submit value="SUBMIT" id="addcars">'
	+'&nbsp;&nbsp;'
	+ '<input type=submit value="UPDATE" id="update"></td></tr>'
	+'</table>';
	div.innerHTML = html;
	return div;
}
