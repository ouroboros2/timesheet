package com.java.timesheet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.timesheet.model.Employee;
import com.java.timesheet.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

	Project findByProjectId(int projectId);
	
	List<Project> findByProjectOwner(int managerId);
	
	List<Project> findByProjectCodeContaining(String projectCode);
}