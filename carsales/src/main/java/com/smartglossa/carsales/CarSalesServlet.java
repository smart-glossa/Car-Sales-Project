package com.smartglossa.carsales;

import java.io.IOException;
import java.util.List;
//import java.sql.Blob;
//import org.apache.commons.codec.binary.Base64;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONObject;

public class CarSalesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload sfu = new ServletFileUpload(factory);
		String op = request.getParameter("operation");
		if (op.equals("addemployee")) {
			int eid = Integer.parseInt(request.getParameter("eId"));
			String uname = request.getParameter("uname");
			String pass = request.getParameter("pass");
			String pno = request.getParameter("mno");
			String email = request.getParameter("email");
			String addr = request.getParameter("addr");

			JSONObject obj = new JSONObject();
			try {
				List<FileItem> items = sfu.parseRequest(request);
				FileItem file = (FileItem) items.get(0);
				CarSales car = new CarSales();
				car.addUser(eid, uname, pass, pno, email, addr, file);
				obj.put("status", 1);
			} catch (Exception e) {
				e.printStackTrace();
				obj.put("status", 0);
				obj.put("Message", e.getMessage());
			}
			response.getWriter().print(obj);
		} else if (op.equals("login")) {
			String uname = request.getParameter("user");
			String pass = request.getParameter("passwo");

			JSONObject obj = new JSONObject();
			try {
				CarSales login = new CarSales();
				JSONObject result = login.login(uname, pass);
				obj.put("status", 1);
				obj.put("message", result);
			} catch (Exception e) {
				e.printStackTrace();
				obj.put("status", 0);
				obj.put("message", e.getMessage());
			}
			response.getWriter().print(obj);
		} else if (op.equals("addcar")) {
			int cid = Integer.parseInt(request.getParameter("cid"));
			String cno = request.getParameter("cno");
			String cname = request.getParameter("cname");
			String ccolor = request.getParameter("ccolor");
			String cost = request.getParameter("cost");

			JSONObject obj = new JSONObject();
			try {
				List<FileItem> items = sfu.parseRequest(request);
				FileItem files = (FileItem) items.get(0);
				CarSales car = new CarSales();
				car.addcar(cid, cno, cname, ccolor, cost, files);
				obj.put("status", 1);
			} catch (Exception e) {
				e.printStackTrace();
				obj.put("status", 0);
				obj.put("Message", e.getMessage());
			}
			response.getWriter().print(obj);
		} else if (op.equals("updatecar")) {
			int cid = Integer.parseInt(request.getParameter("cid"));
			String cno = request.getParameter("cno");
			String cname = request.getParameter("cname");
			String ccolor = request.getParameter("ccolor");
			String cost = request.getParameter("cost");
			JSONObject obj = new JSONObject();
			try {
				List<FileItem> items = sfu.parseRequest(request);
				FileItem files = (FileItem) items.get(0);
				CarSales cars = new CarSales();
				cars.updateCar(cid, cno, cname, ccolor, cost, files);
				obj.put("status", 1);
			} catch (Exception e) {
				e.printStackTrace();
				obj.put("status", 0);
				obj.put("message", e.getMessage());
			}
			response.getWriter().print(obj);

		}
	}
}
