package com.java.timesheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.timesheet.model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

}
