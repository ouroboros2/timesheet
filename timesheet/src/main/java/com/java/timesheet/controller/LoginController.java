package com.java.timesheet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.java.timesheet.model.Employee;
import com.java.timesheet.service.EmployeeService;
import com.java.timesheet.service.ProjectService;

@Controller
public class LoginController {

	@Autowired
	EmployeeService employeeService;

	@Autowired
	ProjectService projectService;

	@RequestMapping("/login")
	public ModelAndView login() {

		ModelAndView model = new ModelAndView("login");
		Employee employee = new Employee();
		model.addObject("employee", employee);

		return model;
	}

	@RequestMapping("/validateEmployee")
	public ModelAndView validateEmployee(@ModelAttribute Employee employee) {

		ModelAndView model = new ModelAndView("homepage"); // employee =
		employee = employeeService.findyByUsername(employee);
		model.addObject("employee", employee);

		return model;
	}

	@RequestMapping("/getNewEmployeeForm")
	public ModelAndView getNewEmployeeForm() {

		ModelAndView model = new ModelAndView("addProfile");
		model.addObject("employee", new Employee());

		return model;
	}

	@RequestMapping("/saveNewEmployee")
	public ModelAndView saveNewEmployee(Employee employee) {

		ModelAndView model;

		employee.setManagerId(2);
		employee.setRole("Manager");

		boolean success = employeeService.createEmployee(employee);
		if (success) {
			model = new ModelAndView("homepage");
			model.addObject("employee", employee);
			return model;
		} else {
			model = new ModelAndView("blank");
			model.addObject("employee", new Employee());
			return model;
		}
	}
}
