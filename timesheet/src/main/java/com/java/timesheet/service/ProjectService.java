package com.java.timesheet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.timesheet.model.Employee;
import com.java.timesheet.model.Project;
import com.java.timesheet.repository.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	ProjectRepository projectRepository;

	public List<Project> getAllTasks() {
		return projectRepository.findAll();
	}

	public void createProject(Project project) {
		projectRepository.save(project);
	}
	
	public Project findByProjectId(int projectId) {
		
		Project project = projectRepository.findByProjectId(projectId);
		return project;
	}
	
	public List<Project> getManagerProjects(int managerId) {
		return projectRepository.findByProjectOwner(managerId);
	} 

}
