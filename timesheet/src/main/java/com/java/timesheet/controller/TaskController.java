package com.java.timesheet.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.java.timesheet.model.Employee;
import com.java.timesheet.model.TimeEntry;
import com.java.timesheet.service.EmployeeService;
import com.java.timesheet.service.ProjectService;
import com.java.timesheet.service.TimeEntryService;

@Controller
public class TaskController {

	@Autowired
	private ProjectService projectService;

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private TimeEntryService timeEntryService;

	@RequestMapping("/getDirectReports")
	public ModelAndView getDirectReports(Employee employee) {

		ModelAndView model = new ModelAndView("manager_directReports");
		ArrayList<Employee> employees = employeeService.getDirectReports(5554);
		ArrayList<TimeEntry> timeEntries = timeEntryService.getEmployeeTimesheetDetails(5557, 5554);
		model.addObject("employees", employees);
		model.addObject("timeEntries", timeEntries);
		return model;
	}
}
