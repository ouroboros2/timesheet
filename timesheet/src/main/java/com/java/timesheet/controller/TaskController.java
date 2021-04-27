package com.java.timesheet.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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

	@RequestMapping("/getDirectReports/{employeeId}")
	public ModelAndView getDirectReports(@PathVariable("employeeId") int employeeId) {

		ModelAndView model = new ModelAndView("manager_directReports");
		//Get list of employees under that employeeId
		ArrayList<Employee> employees = employeeService.getDirectReports(employeeId);
		ArrayList<TimeEntry> timeEntries = timeEntryService.getEmployeeTimesheetDetails(employeeId);
		model.addObject("employees", employees);
		model.addObject("timeEntries", timeEntries);
		return model;
	}

}
