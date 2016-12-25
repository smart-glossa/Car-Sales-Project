$(document).ready(function() {
	if (getCookie("uname") != undefined) {
		$("body")[0].appendChild(menu());
	//	applyUserDetails();
		//getProfilePicture(getCookie("uname"));
		$($(".mainpage")[0]).remove();
		var div = document.createElement("div");
		div.className = "mainpage";
		$("body")[0].appendChild(div);
		$(".mainArea")[0].appendChild(cardetail());
		//$(".mainArea")[0].appendChild(displayProducts());	
	}
});

$(document).on("click","#signup",function(key) {
	var eid = $('#eId').val();
	var uname = $('#uname').val();
	var pass = $('#pass').val();
	var pno = $('#mno').val();
	var email = $('#email').val();
	var addr = $('#addr').val();
	if (eid == "") {
		alert("Please Enter EmployeeId");
		$("#eId").focus().css("outline-color", "#ff0000");
		return;
	}
	if (uname == "") {
		alert("Please Enter username ");
		$("#uname").focus().css("outline-color", "#ff0000");
		return;
	}
	if (pass == "") {
		alert("Please Enter password");
		$("#pass").focus().css("outline-color", "ff0000");
		return;
	}
	if (pno == "") {
		alert("Please Enter MobileNumber");
		$("#mno").focus().css("outline-color", "ff0000");
		return;
	}
	if (email == "") {
		alert("Please Enter EmailId");
		$("#email").focus().css("outline-color", "ff0000");
		return;
	}
	if (addr == "") {
		alert("Please Enter Address");
		$("#addr").focus().css("outline-color", "ff0000");
		return;
			}  //http://localhost:8080/carsales/car?operation=addemployee&eId=1&uName=sathish&pass=121&mNo=98765467&email=sathish@gmail.com&addr=khkjjkh&file=%22C:\Users\Elcot\Pictures\2012-02\#RING TUNE (65).jpg"
			var url = "/carsales/car?operation=addemployee&eId="
			+ eid + "&uname=" + uname + "&pass=" + pass+"&mno="+pno+"&email="+email+"&addr="+addr;
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
					$('#eId').val("");
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
	}  //http://localhost:8080/carsales/car?operation=login&user=sathish&passwo=3232
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
			//applyUserDetails();
			//getProfilePicture(user);
		$($(".mainpage")[0]).remove();
			var div = document.createElement("div");
			div.className = "mainpage";
			$("body")[0].appendChild(div);
			$(".mainArea")[0].appendChild(cardetail());
			//$(".mainArea")[0].appendChild(displayProducts());	
		} else {
			alert("Error caused: " + result.message);
		}

	}).fail(function(result) {
		console.log(result);
	});
});
