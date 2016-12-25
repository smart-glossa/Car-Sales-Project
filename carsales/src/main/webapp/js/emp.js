$(document).ready(function() {
	if (getCookie("uname") != undefined) {
		$("body")[0].appendChild(menu());
		applyUser();
		getProfileImage(getCookie("uname"));
		$($(".mainpage")[0]).remove();
		var div = document.createElement("div");
		div.className = "mainpage";
		$("body")[0].appendChild(div);
		$(".mainpage")[0].appendChild(cardetail());
		//$(".mainArea")[0].appendChild(displayProducts());	
	}
});

$(document).on("click","#addcars",function(key) {
	var cid = $('#cid').val();
	var cno = $('#cno').val();
	var cname = $('#cname').val();
	var color = $('#ccolor').val();
	var cost = $('#cost').val();
	if (cid == "") {
		alert("Please Enter CarID");
		$("#cid").focus().css("outline-color", "#ff0000");
		return;
	}
	if (cno == "") {
		alert("Please Enter CarNo ");
		$("#cno").focus().css("outline-color", "#ff0000");
		return;
	}
	if (cname == "") {
		alert("Please Enter CarName");
		$("#cname").focus().css("outline-color", "ff0000");
		return;
	}
	if (color == "") {
		alert("Please Enter Color");
		$("#ccolor").focus().css("outline-color", "ff0000");
		return;
	}
	if (cost == "") {
		alert("Please Enter Cost");
		$("#cost").focus().css("outline-color", "ff0000");
		return;
	}
	
	var url = "/carsales/car?operation=addcar&cid="
	+ cid + "&cno=" + cno + "&cname=" + cname +"&ccolor="+color+"&cost="+cost;
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
			$('#cid').val("");
			$('#cno').val("");
			$('#cname').val("");
			$('#ccolor').val("");
			$('#cost').val("");
		} else {
			alert("Error caused: " + result.message);
		}

	}).fail(function(result) {
		console.log(result);
	});
});
$(document).on("click", "#update", function() {
	var cid = $('#cid').val();
	var cname = $('#cname').val();
	var cost = $('#cost').val();
	if (cid == "") {
		alert("Please Enter CarId");
		$("#cid").focus().css("outline-color", "#ff0000");
		return;
	}
	if (cname == "") {
		alert("Please Enter CarName");
		$("#cname").focus().css("outline-color", "#ff0000");
		return;
	}
	if (cost == "") {
		alert("Please Enter cost");
		$("#cost").focus().css("outline-color", "ff0000");
		return;
	}
	var url = "/carsales/car?operation=updatecar&cid=" + cid + "&cname=" + cname + "&cost=" + cost;
	var request = new FormData();                   
	request.append('files', $('#profile')[0].files[0]);
	$.ajax({
		url: url,
		type: 'POST',
		data : request,
		processData : false,
		contentType : false
	})
	.done(function(result) {
		result = JSON.parse(result);
		if (result.status == 1) {
			alert("Updated SuccessFully");
			$('#cid').val("");
			$('#cname').val("");
			$('#cost').val("");
			//postToServer("product");
               // $(".displayAll").remove();
                //$(".mainArea")[0].appendChild(displayProducts());
            } else {
            	alert("Error caused: " + result.message);
            }
            
        }).fail(function(result) {
        	console.log(result);
        });
        

    })
