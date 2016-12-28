package com.smartglossa.carsales;

import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.apache.commons.fileupload.FileItem;
import org.json.JSONArray;
import org.json.JSONObject;

public class CarSales {
	Connection con = null;
	Statement stat = null;
	ResultSet rs = null;
	PreparedStatement ps = null;

	public CarSales() throws ClassNotFoundException, Exception {
		openConnection();

	}

	public void addUser(String fname, String lname, String uname, String pass, String pno, String email, String addr,
			FileItem file) throws Exception {
		try {
			String query = "insert into emp(fname,lname,uname,pass,mno,email,addr)values('" + fname + "','" + lname
					+ "','" + uname + "','" + pass + "','" + pno + "','" + email + "','" + addr + "')";
			stat.execute(query);
			ps = con.prepareStatement("insert into empimage(image,uname) values(?,?)");
			ps.setString(2, uname);
			ps.setBinaryStream(1, file.getInputStream(), (int) file.getSize());
			ps.executeUpdate();
		} finally {
			closeConnection();
		}
	}

	public JSONObject login(String uname, String pass) throws Exception {
		try {
			JSONObject obj = new JSONObject();
			String query = "select userName from emp where uname='" + uname + "'AND pass='" + pass + "'";
			rs = stat.executeQuery(query);
			if (rs.next()) {
				obj.put("name", rs.getString(1));
			}
			return obj;
		} finally {
			closeConnection();
		}

	}

	public void addcar(int cid, String cno, String cname, String ccolor, String cost, FileItem files) throws Exception {
		try {
			String query = "insert into cardetail(cid,cno,cname,color,cost)values(" + cid + ",'" + cno + "','" + cname
					+ "','" + ccolor + "','" + cost + "')";
			stat.execute(query);
			ps = con.prepareStatement("insert into carimage(img,cid) values(?,?)");
			ps.setInt(2, cid);
			ps.setBinaryStream(1, files.getInputStream(), (int) files.getSize());
			ps.executeUpdate();
		} finally {
			closeConnection();
		}
	}

	public void updateCar(int cid, String cno, String cname, String ccolor, String cost, FileItem files)
			throws Exception {
		try {
			String query = "Update cardetail set cname='" + cname + "',cost= '" + cost + "'where cid= " + cid;
			stat.execute(query);

			ps = con.prepareStatement("Insert into carimage(img,cid) values(?,?) ON DUPLICATE KEY update img = ?");
			ps.setBinaryStream(1, files.getInputStream(), (int) files.getSize());
			ps.setInt(2, cid);
			ps.setBinaryStream(3, files.getInputStream(), (int) files.getSize());
			ps.executeUpdate();
		} finally {
			closeConnection();
		}
	}

	public JSONArray getAllcar() throws Exception {
		try {
			JSONArray res = new JSONArray();
			String query = "select * from cardetail";
			rs = stat.executeQuery(query);
			while (rs.next()) {
				JSONObject obj = new JSONObject();
				obj.put("cid", rs.getInt(1));
				obj.put("cno", rs.getString(2));
				obj.put("cname", rs.getString(3));
				obj.put("color", rs.getString(4));
				obj.put("cost", rs.getString(5));
				res.put(obj);
			}
			return res;
		} finally {
			closeConnection();
		}

	}

	public JSONObject getUser(String uname) throws Exception {
		try {
			JSONObject obj = new JSONObject();
			String query = "select userName from employee where userName='" + uname + "'";
			rs = stat.executeQuery(query);
			if (rs.next()) {
				obj.put("name", rs.getString(1));
			}
			return obj;
		} finally {
			closeConnection();
		}

	}

	public Blob getProfileImage(String uname) throws Exception {
		try {
			String query = "select image from image where uname='" + uname + "'";
			rs = stat.executeQuery(query);
			Blob b = null;
			if (rs.next()) {
				b = rs.getBlob("image");
			}
			return b;
		} finally {
			closeConnection();
		}
	}

	private void openConnection() throws ClassNotFoundException, Exception {
		Class.forName(SalesConstant.MYSQL_DRIVER);
		// String URL = "jdbc:mysql://localhost:3306/carsales";
		con = DriverManager.getConnection(SalesConstant.MYSQL_SERVER + "/" + SalesConstant.DATABASE_NAME,
				SalesConstant.USERNAME, SalesConstant.PASSWORD);
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
