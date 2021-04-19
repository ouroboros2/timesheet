package com.java.timesheet.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.timesheet.model.Employee;
import com.java.timesheet.model.Project;
import com.java.timesheet.model.TimeEntry;
import com.java.timesheet.service.EmployeeService;
import com.java.timesheet.service.ProjectService;
import com.java.timesheet.service.TimeEntryService;
import com.java.util.TimeSheetDTO;


@RestController
public class ResController {
	
	@Autowired
	private TimeEntryService timeEntryService;
	@Autowired
	private ProjectService projectService;
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/viewTask/save")
	public String save(@RequestBody TimeEntry timeEntry) {
		
		int projectCode = Integer.parseInt(timeEntry.getProjectCode());
		Project project = projectService.findByProjectId(projectCode);
		timeEntryService.saveTimeEntry(timeEntry, project);
		
		return "200";	
	}
}
