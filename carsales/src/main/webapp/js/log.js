$(document).ready(function() {
	$(document).on("click", "#logout", function(){
    	//postToServer("logout");
    	document.cookie = 'uname=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    	window.location.href = '/carsales/';
    });

	$(document).on("click","#signup",function(key) {
		var fname = $('#fname').val();
		var lname=$('#lname').val();
		var uname = $('#uname').val();
		var pass = $('#pass').val();
		var pno = $('#mno').val();
		var email = $('#email').val();
		var addr = $('#addr').val();
		if (fname == "") {
			alert("Please Enter Your FirstName..");
			$("#fname").focus().css("outline-color", "#ff0000");
			return;
		}
		if (lname == "") {
			alert("Please Enter Your LastName.. ");
			$("#lname").focus().css("outline-color", "#ff0000");
			return;
		}
		if (uname == "") {
			alert("Please Enter Your username ");
			$("#uname").focus().css("outline-color", "#ff0000");
			return;
		}
		if (pass == "") {
			alert("Please Enter Your password");
			$("#pass").focus().css("outline-color", "ff0000");
			return;
		}
		if (pno == "") {
			alert("Please Enter Your MobileNumber");
			$("#mno").focus().css("outline-color", "ff0000");
			return;
		}
		if (email == "") {
			alert("Please Enter Your EmailId");
			$("#email").focus().css("outline-color", "ff0000");
			return;
		}
		if (addr == "") {
			alert("Please Enter  Your Address");
			$("#addr").focus().css("outline-color", "ff0000");
			return;
		} 
		var url = "/carsales/car?operation=addemployee&fname="
		+ fname + "&lname=" +lname+ "&uname=" + uname + "&pass=" + pass+"&mno="+pno+"&email="+email+"&addr="+addr;
		var request = new FormData();                   
		request.append('file', $('#profile')[0].files[0]);
		$.ajax({
			url : url,
			type : 'POST',
			data : request,
			processData : false,
			contentType : false
		}).done(function(result) {
			result = JSON.parse(result);
			if (result.status == 1) {
				alert("Added SuccessFully");
				$('#fname').val("");
				$('#lname').val("");
				$('#uname').val("");
				$('#pass').val("");
				$('#mno').val("");
				$('#email').val("");
				$('#addr').val("");
			} else {
				alert("Error caused: " + result.message);
			}

		}).fail(function(result) {
			console.log(result);
		});
	});
	$(document).on("click","#login",function(key) {
		var user = $('#user').val();
		var passw = $('#passwo').val();

		if (user == "") {
			alert("Please Enter username ");
			$("#user").focus().css("outline-color", "#ff0000");
		}
		if (passw == "") {
			alert("Please Enter password");
			$("#passw").focus().css("outline-color", "ff0000");
			return;
		}  
		var url = "/carsales/car?operation=login&user="
		+ user + "&passwo=" + passw;
		$.ajax({
			url : url,
			type : 'POST'
		}).done(function(result) {
			result = JSON.parse(result);
			if (result.status == 1) {
				document.cookie = "uname=" + user;
				alert("succfully login");
				$("body")[0].appendChild(menu());
				applyUser();
				getProfileImage(user);
				$($(".mainpage")[0]).remove();
				var div = document.createElement("div");
				div.className = "mainpage";
				$("body")[0].appendChild(div);
				$(".mainpage")[0].appendChild(cardetail());
			//$(".mainArea")[0].appendChild(displayProducts());	
		} else {
			alert("Error caused: " + result.message);
		}

	}).fail(function(result) {
		console.log(result);
	});
});
});
function getProfileImage(username) {
	$("#menuLogo").attr("src", "/carsales/car?operation=getProfileImage&uname=" + uname);
}