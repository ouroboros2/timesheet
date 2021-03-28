package com.java.timesheet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.java.timesheet.model.Task;
import com.java.timesheet.service.TaskService;

@Controller
public class TaskController {

	@Autowired
	TaskService taskService;

	@RequestMapping("/viewTask")
	public ModelAndView getAllTasks() {

		ModelAndView modelAndView = new ModelAndView("homepage");
		List<Task> tasks = taskService.getAllTasks();

		modelAndView.addObject("tasks", tasks);

		return modelAndView;

	}
}
