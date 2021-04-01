package com.java.timesheet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.java.timesheet.service.ProjectService;

@Controller
public class TaskController {

	@Autowired
	private ProjectService projectService;

}
