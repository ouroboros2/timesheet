package com.java.timesheet.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.timesheet.model.Employee;
import com.java.timesheet.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	public boolean createEmployee(Employee employee) {

		boolean successInd = false;

		try {
			employeeRepository.save(employee);
			successInd = true;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return successInd;
	}

	public Employee findyByUsername(Employee employee) {

		employee = employeeRepository.findByUserName(employee.getUserName());
		if (employee != null && employee.getPassword().equals(employee.getPassword())) {
			return employee;
		}
		return null;
	}

	public ArrayList<Employee> getManagerList() {

		ArrayList<Employee> managers = employeeRepository.findByRole("manager");
		return managers;
	}

}
