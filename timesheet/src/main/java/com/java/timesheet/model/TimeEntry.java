package com.java.timesheet.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

@Entity(name = "TimeEntry")
@Table(name = "TimeEntry")
public class TimeEntry {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "timeentry_seq")
	@SequenceGenerator(name = "timeentry_seq", sequenceName = "timeentry_seq", initialValue = 9550, allocationSize = 1)
	@Column(name = "timeEntryId")
	private int timeEntryId;

	@Column(name = "projectCode")
	private String projectCode;

	@Column(name = "employeeId")
	private int employeeId;

	@Column(name = "managerId")
	private int managerId;

	@Column(name = "sunday")
	private int sunday;

	@Column(name = "monday")
	private int monday;

	@Column(name = "tuesday")
	private int tuesday;

	@Column(name = "wednesday")
	private int wednesday;

	@Column(name = "thursday")
	private int thursday;

	@Column(name = "friday")
	private int friday;

	@Column(name = "saturday")
	private int saturday;

	@Column(name = "category")
	private String category;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(name = "startDate")
	private Date startDate;

	@DateTimeFormat(pattern = "yyyy-MM-dd")

	@Column(name = "endDate")
	private Date endDate;

	@Column(name = "status")
	private String status;

	@Column(name = "weekNumber")
	private int weekNumber;
	
	public int getTimeEntryId() {
		return timeEntryId;
	}

	public void setTimeEntryId(int timeEntryId) {
		this.timeEntryId = timeEntryId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getProjectCode() {
		return projectCode;
	}

	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public int getManagerId() {
		return managerId;
	}

	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}

	public int getSunday() {
		return sunday;
	}

	public void setSunday(int sunday) {
		this.sunday = sunday;
	}

	public int getMonday() {
		return monday;
	}

	public void setMonday(int monday) {
		this.monday = monday;
	}

	public int getTuesday() {
		return tuesday;
	}

	public void setTuesday(int tuesday) {
		this.tuesday = tuesday;
	}

	public int getWednesday() {
		return wednesday;
	}

	public void setWednesday(int wednesday) {
		this.wednesday = wednesday;
	}

	public int getThursday() {
		return thursday;
	}

	public void setThursday(int thursday) {
		this.thursday = thursday;
	}

	public int getFriday() {
		return friday;
	}

	public void setFriday(int friday) {
		this.friday = friday;
	}

	public int getSaturday() {
		return saturday;
	}

	public void setSaturday(int saturday) {
		this.saturday = saturday;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public int getWeekNumber() {
		return weekNumber;
	}

	public void setWeekNumber(int weekNumber) {
		this.weekNumber = weekNumber;
	}
}
