package com.java.timesheet.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.java.timesheet.model.Employee;
import com.java.timesheet.model.Project;
import com.java.timesheet.service.EmployeeService;
import com.java.timesheet.service.ProjectService;
import com.java.timesheet.service.TimeEntryService;

@Controller
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;

	@Autowired
	ProjectService projectService;

	@Autowired
	TimeEntryService timeEntryService;

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
		List<Project> projects = projectService.getManagerProjects(employee.getManagerId());
		List<Employee> managers = employeeService.getManagerList();

		if (employee.getRole().equalsIgnoreCase("admin")) {
			model = new ModelAndView("admin_homepage");
			model.addObject("employee", new Employee());
			model.addObject("managers", managers);	
			model.addObject("project", new Project());
		} else {
			model = new ModelAndView("employee_homepage");
			model.addObject("employee", employee);
		}
		
		model.addObject("projects", projects);
		
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
			model = new ModelAndView("admin_homepage");
			ArrayList<Employee> managers = employeeService.getManagerList();
			model.addObject("employee", new Employee());
			model.addObject("managers", managers);	
			model.addObject("project", new Project());
			return model;
		} else {
			model = new ModelAndView("blank");
			model.addObject("employee", new Employee());
			return model;
		}
	}
	
	
	@RequestMapping("/deleteEmployee/{employeeId}")
	public ModelAndView deleteEmployee(@PathVariable("employeeId") int employeeId) {

		ModelAndView model = new ModelAndView("admin_homepage");
		employeeService.deleteEmployee(employeeId);
		return model;
	}
}
