package com.smartglossa.carsales;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.commons.fileupload.FileItem;
import org.json.JSONObject;

public class CarSales {
	Connection con = null;
	Statement stat = null;
	ResultSet rs = null;
	PreparedStatement ps = null;

	public CarSales() throws ClassNotFoundException, Exception {
		openConnection();

	}

	public void addUser(int eid, String uname, String pass, String pno, String email, String addr, FileItem file)
			throws Exception {
		try {
			String query = "insert into employee(eId,userName,password,phoneNumber,email,Address)values(" + eid + ",'"
					+ uname + "','" + pass + "','" + pno + "','" + email + "','" + addr + "')";
			stat.execute(query);
			ps = con.prepareStatement("insert into image(image,eId) values(?,?)");
			ps.setInt(2, eid);
			ps.setBinaryStream(1, file.getInputStream(), (int) file.getSize());
			ps.executeUpdate();
		} finally {
			closeConnection();
		}
	}

	public JSONObject login(String uname, String pass) throws Exception {
		try {
			JSONObject obj = new JSONObject();
			String query = "select userName from employee where userName='" + uname + "'AND password='" + pass + "'";
			rs = stat.executeQuery(query);
			if (rs.next()) {
				obj.put("name", rs.getString(1));
			}
			return obj;
		} finally {
			closeConnection();
		}

	}

	private void openConnection() throws ClassNotFoundException, Exception {
		Class.forName(SalesConstant.MYSQL_DRIVER);
		String URL = "jdbc:mysql://localhost:3306/carsales";
		con = DriverManager.getConnection(URL, "root", "root");
		stat = con.createStatement();

	}

	private void closeConnection() throws Exception {

		if (con != null) {
			con.close();
		}
		if (stat != null) {
			stat.close();
		}
		if (rs != null) {
			rs.close();
		}
	}

}
