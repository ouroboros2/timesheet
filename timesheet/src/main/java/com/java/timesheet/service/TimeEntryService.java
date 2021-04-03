package com.java.timesheet.service;

import java.util.ArrayList;

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
}
