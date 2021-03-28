package com.java.timesheet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity(name = "task")
@Table(name = "task")
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_seq")
	@SequenceGenerator(name = "task_seq", sequenceName = "task_seq", initialValue = 1550, allocationSize = 1)
	@Column(name = "projectId")
	private int projectId;

	@Column(name = "project")
	private String project;

	@Column(name = "taskDescription")
	private String taskDescription;

	@Column(name = "category")
	private String category;

}
