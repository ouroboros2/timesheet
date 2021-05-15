package com.java.timesheet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	public List<Project> searchByProjectCode(String projectCode) {
		
		List<Project> projects;
		
		if(projectCode != null) {
			projects = projectRepository.findByProjectCodeContaining(projectCode);
		} else {
			projects = projectRepository.findAll();
		}
		return projects;
		
	}
	
	public void deleteProject(int projectId) {
		projectRepository.deleteById(projectId);
	}

}
