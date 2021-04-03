package com.java.timesheet.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.java.timesheet.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	Employee findByUserName(String username);

	ArrayList<Employee> findByRole(String role);

	ArrayList<Employee> findByManagerId(int managerId);
}
