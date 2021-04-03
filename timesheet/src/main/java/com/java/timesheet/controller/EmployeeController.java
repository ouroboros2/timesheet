package com.java.timesheet.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.java.timesheet.model.Employee;
import com.java.timesheet.service.EmployeeService;
import com.java.timesheet.service.ProjectService;

@Controller
public class EmployeeController {

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

		ModelAndView model;
		employee = employeeService.findyByUsername(employee);

		if (employee.getRole().equalsIgnoreCase("admin")) {
			model = new ModelAndView("admin_homepage");
		} else {
			model = new ModelAndView("employee_homepage");
		}
		model.addObject("employee", employee);
		return model;
	}

	@RequestMapping("/getNewEmployeeForm")
	public ModelAndView getNewEmployeeForm() {

		ModelAndView model = new ModelAndView("admin_addProfile");
		ArrayList<Employee> managers = employeeService.getManagerList();
		model.addObject("employee", new Employee());
		model.addObject("managers", managers);

		return model;
	}

	@RequestMapping("/saveNewEmployee")
	public ModelAndView saveNewEmployee(@ModelAttribute Employee employee) {

		ModelAndView model;

		boolean success = employeeService.createEmployee(employee);
		if (success) {
			model = new ModelAndView("employee_homepage");
			model.addObject("employee", employee);
			return model;
		} else {
			model = new ModelAndView("blank");
			model.addObject("employee", new Employee());
			return model;
		}
	}

	@RequestMapping("/getDirectReports")
	public ModelAndView getDirectReports() {

		ModelAndView model = new ModelAndView("manager_directReports");
		ArrayList<Employee> employees = employeeService.getDirectReports(5554);
		model.addObject("employees", employees);
		return model;
	}
}
