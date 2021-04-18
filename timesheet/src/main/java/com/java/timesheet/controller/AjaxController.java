package com.java.timesheet.controller;

import java.util.Date;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.timesheet.model.Project;
import com.java.timesheet.model.TimeEntry;
import com.java.timesheet.service.ProjectService;
import com.java.timesheet.service.TimeEntryService;
import com.java.util.TimeSheetDTO;


@RestController
public class AjaxController {

	private TimeEntryService timeEntryService;
	private ProjectService projectService;
	
	@PostMapping("/viewTask/save")
	public String save(@RequestBody TimeSheetDTO timeEntry) {
		
		int projectCode = Integer.parseInt(timeEntry.getProjectCode());
		System.out.println(projectCode);
		//Project project = projectService.findByProjectId(1553);
		
		//System.out.println(projectCode);

		return "200";	
	}
}
