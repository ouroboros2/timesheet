package com.java.timesheet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.java.timesheet.model.Employee;
import com.java.timesheet.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Transactional
	public void createEmployee(Employee employee) {
		employeeRepository.save(employee);
	}

	public Employee findByUsernameAndPassword(String username, String Password) {

		boolean validated = false;
		Employee employee = employeeRepository.findyByUsernameAndPassword(username, Password);

		if (employee != null) {
			return employee;
		}

		return null;

	}

}
