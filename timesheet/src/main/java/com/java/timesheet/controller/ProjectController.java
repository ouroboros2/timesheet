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

		ModelAndView model = new ModelAndView("admin_homepage");
		projectService.createProject(project);
		ArrayList<Employee> managers = employeeService.getManagerList();
		model.addObject("employee", new Employee());
		model.addObject("managers", managers);	
		model.addObject("project", new Project());
		
		return model;
	}
		
	@RequestMapping("/deleteProject/{projectId}")
	public ModelAndView deleteEmployee(@PathVariable("projectId") int projectId) {

		ModelAndView model = new ModelAndView("admin_homepage");
		projectService.deleteProject(projectId);
		ArrayList<Employee> managers = employeeService.getManagerList();
		model.addObject("employee", new Employee());
		model.addObject("managers", managers);	
		model.addObject("project", new Project());
		return model;
	}
		
}