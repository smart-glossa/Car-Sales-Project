function displaycars() {
	var url = "/carsales/car?operation=getAllProduct";
	var div= document.createElement("div");
	var imgURL = "images/deleteButton.jpg";
	$
	.ajax({
		url : url,
		type : 'POST'
	})
	.done(
		function(result) {
			result = JSON.parse(result);
			if (result.status == 1) {
				var array = result.products;
				div.className = "displayAll";
				var query = '<h3>Display Products</h3>'
				+ "<table style='border: 1px solid black'>";
				query += "<tr><th>ProductId</th><th>Images</th> <th>ProductName</th>  <th>ProductCost</th><th>Delete</th></tr>"
				for (var i = 0; i < array.length; i++) {
					query += "<tr class='productRow'><td class='productId'>"
					+ array[i].productId + "</td>";
					query += "<td> <img src='/bill/bill?operation=getProductImage&productId=" + array[i].productId +"' width='40px' heigth='40px'></td>";
					query += "<td>" + array[i].name + "</td>";
					query += "<td>" + array[i].cost + "</td>";
					query += "<td> <img class='deleteProduct' src='"
					+ imgURL
					+ "' width='25px' height='25px'/></td></tr>"
				}
				query += "</table>"
				div.innerHTML = query;
			} else {
				alert("Error caused: " + result.message);
			}
			
		}).fail(function(result) {
			console.log(result)
		});
		return div;
	}
