package com.java.timesheet.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.timesheet.model.Project;
import com.java.timesheet.model.TimeEntry;
import com.java.timesheet.repository.TimeEntryRepository;

@Service
public class TimeEntryService {

	@Autowired
	private TimeEntryRepository timeEntryRepository;

	public ArrayList<TimeEntry> getEmployeeTimesheetDetails(int managerId) {

		ArrayList<TimeEntry> timeEntries = timeEntryRepository.getTimeSheetDetails(managerId);
		return timeEntries;
	}
	
	public void saveTimeEntry(TimeEntry timeEntry, Project project) {
		
		String projectCode = project.getProjectCode() + Integer.toString(project.getProjectId());
		
		timeEntry.setCategory(project.getCategory());
		timeEntry.setStartDate(project.getStartDate());
		timeEntry.setEndDate(project.getEndDate());
		timeEntry.setManagerId(5554);
		timeEntry.setEmployeeId(5556);
		timeEntry.setStatus("pending");
		timeEntry.setProjectCode(projectCode);
		
		timeEntryRepository.save(timeEntry);
		
		
	}
}
