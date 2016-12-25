package com.smartglossa.carsales;

import java.io.IOException;
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
	public void addcar(int cid, String cno, String cname, String ccolor, String cost, FileItem files)
			throws Exception {
		try {
			String query = "insert into cardetail(cid,cno,cname,color,cost)values(" + cid + ",'"
					+ cno + "','" + cname + "','" + ccolor + "','" + cost + "')";
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
            String query = "Update product set cname='" + cname + "',cost= '" + cost + "'where cid= " +cid;
            stat.execute(query);

            ps = con.prepareStatement(
                    "Insert into carimage(img,cid) values(?,?) ON DUPLICATE KEY update pimage = ?");
            ps.setBinaryStream(1, files.getInputStream(), (int) files.getSize());
            ps.setInt(2, cid);
            ps.setBinaryStream(3, files.getInputStream(), (int) files.getSize());
            ps.executeUpdate();
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
