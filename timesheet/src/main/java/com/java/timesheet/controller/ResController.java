package com.java.timesheet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.timesheet.model.Employee;
import com.java.timesheet.model.Project;
import com.java.timesheet.model.TimeEntry;
import com.java.timesheet.service.EmployeeService;
import com.java.timesheet.service.ProjectService;
import com.java.timesheet.service.TimeEntryService;
import com.java.util.CustomEmpSub;


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
	
	@PostMapping("/searchEmployee")
	public List<Employee> searchEmployee(@RequestBody Employee employee) {
		
		List<Employee> employees = employeeService.searchByUsername(employee.getUserName());		
		return employees;	
	}
	
	@PostMapping("/searchProject")
	public List<Project> searchByProject(@RequestBody Project project) {
		
		List<Project> projects = projectService.searchByProjectCode(project.getProjectCode());		
		return projects;
	}
	
	@PostMapping("/approve")
	public String approve(@RequestBody CustomEmpSub customEmpSub) {
		
		TimeEntry timeEntry = timeEntryService.retrieveTimeEntry(customEmpSub);
		timeEntryService.approveStatus(timeEntry); 
		
		return "200";	
	}
	
	@PostMapping("/reject")
	public String reject(@RequestBody CustomEmpSub customEmpSub) {
		
		TimeEntry timeEntry = timeEntryService.retrieveTimeEntry(customEmpSub);
		timeEntryService.rejectStatus(timeEntry); 
		
		return "200";	
	}
}
