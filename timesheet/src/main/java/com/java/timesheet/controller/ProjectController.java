package com.java.timesheet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.java.timesheet.model.Project;
import com.java.timesheet.service.ProjectService;

@Controller
public class ProjectController {

	@Autowired
	ProjectService projectService;

	@RequestMapping("/viewTask")
	public ModelAndView getAllTasks() {

		ModelAndView modelAndView = new ModelAndView("homepage");
		List<Project> project = projectService.getAllTasks();
		modelAndView.addObject("projects", project);

		return modelAndView;

	}

	@RequestMapping("/saveProject")
	public ModelAndView createProject(@ModelAttribute Project project) {

		ModelAndView model = new ModelAndView("blank");
		projectService.createProject(project);

		return model;

	}
}