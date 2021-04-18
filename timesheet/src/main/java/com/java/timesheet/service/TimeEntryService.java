package com.java.timesheet.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.timesheet.model.TimeEntry;
import com.java.timesheet.repository.TimeEntryRepository;

@Service
public class TimeEntryService {

	@Autowired
	private TimeEntryRepository timeEntryRepository;

	public ArrayList<TimeEntry> getEmployeeTimesheetDetails(int employeeId, int managerId) {

		ArrayList<TimeEntry> timeEntries = timeEntryRepository.getTimeSheetDetails(employeeId, managerId);
		return timeEntries;
	}
	
	public void saveTimeEntry(TimeEntry timeEntry) {
		
		timeEntry.setTimeEntryId(5);
		timeEntry.setCategory("Billable");
		//timeEntry.setEmployeeId(1);
		//timeEntry.setManagerId(5554);
		//timeEntry.setCategory("Billable");
		//timeEntry.setStatus("pending");
		
		timeEntryRepository.save(timeEntry);
		
		
	}
}
