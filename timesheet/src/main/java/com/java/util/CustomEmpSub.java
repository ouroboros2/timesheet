package com.java.util;

import java.util.List;

import javax.persistence.Column;

import com.java.timesheet.model.TimeEntry;

public class CustomEmpSub {
	
	private int employeeId;
	private String firstName;
	private String lastName;
	private List<TimeEntry> timeEntries;
	
	public int getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public List<TimeEntry> getTimeEntries() {
		return timeEntries;
	}
	public void setTimeEntries(List<TimeEntry> timeEntries) {
		this.timeEntries = timeEntries;
	}
	
	

}
