package com.java.timesheet.service;

import java.util.ArrayList;
import java.util.List;

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

		try {
			employee = employeeRepository.findByUserName(employee.getUserName());
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (employee != null && employee.getPassword().equals(employee.getPassword())) {
			return employee;
		}
		return null;
	}

	public ArrayList<Employee> getManagerList() {

		ArrayList<Employee> managers = employeeRepository.findByRole("manager");
		return managers;
	}

	public ArrayList<Employee> getDirectReports(int managerId) {

		ArrayList<Employee> employees = employeeRepository.findByManagerId(managerId);
		return employees;
	}
	
	public void deleteEmployee(int employeeId) {
		employeeRepository.deleteById(employeeId);
	}
	
	public List<Employee> searchByUsername(String userName) {
		
		List<Employee> employees;
		
		if(userName != null) {
			employees = employeeRepository.findByUserNameContaining(userName);
			
		}else {
			employees = employeeRepository.findAll();
		}
		return employees;
	}
	
	public void someMethod() {
		System.out.println("hELLO");
	}

}
