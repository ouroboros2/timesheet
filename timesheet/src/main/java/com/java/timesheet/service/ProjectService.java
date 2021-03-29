package com.java.timesheet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.timesheet.model.Project;
import com.java.timesheet.repository.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	ProjectRepository taskRepository;

	public List<Project> getAllTasks() {

		return taskRepository.findAll();
	}

}
