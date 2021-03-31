package com.java.timesheet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.java.timesheet.model.Employee;
import com.java.timesheet.service.EmployeeService;

@Controller
public class LoginController {

	@Autowired
	EmployeeService EmployeeService;

	@RequestMapping("/login")
	public ModelAndView login() {

		ModelAndView model = new ModelAndView("login");
		Employee employee = new Employee();

		model.addObject("employee", employee);

		return model;
	}

	@RequestMapping("/validateEmployee")
	public ModelAndView findByUsername(@ModelAttribute String username, String Password) {

		ModelAndView model = new ModelAndView("login");
		Employee employee = EmployeeService.findByUsernameAndPassword(username, Password);

		model.addObject("employee", employee);

		return model;
	}
}
