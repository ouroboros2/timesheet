package com.java.timesheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.timesheet.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	public Employee findyByUsernameAndPassword(String username, String password);
}
