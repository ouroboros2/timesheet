package com.java.timesheet.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.java.timesheet.model.Employee;
import com.java.timesheet.model.Project;
import com.java.timesheet.model.TimeEntry;
import com.java.timesheet.service.EmployeeService;
import com.java.timesheet.service.ProjectService;

@Controller
public class ProjectController {

	@Autowired
	ProjectService projectService;

	@Autowired
	EmployeeService employeeService;
	
	@RequestMapping("/viewTask")
	public ModelAndView getAllTasks() {

		ModelAndView modelAndView = new ModelAndView("employee_homepage");
		List<Project> project = projectService.getAllTasks();
		modelAndView.addObject("projects", project);

		return modelAndView;
 
	}

	// Creating new Projects
	@RequestMapping("/newProject")
	public ModelAndView getNewProjectForm() {

		ModelAndView model = new ModelAndView("admin_addTask");
		Project project = new Project();
		ArrayList<Employee> managers = employeeService.getManagerList();
		model.addObject("managers", managers);
		model.addObject("project", project);

		return model;
	}

	// Saving new Projects in DB
	@RequestMapping("/saveProject")
	public ModelAndView createProject(@ModelAttribute Project project) {

		ModelAndView model = new ModelAndView("blank");
		projectService.createProject(project);

		return model;

	}
}