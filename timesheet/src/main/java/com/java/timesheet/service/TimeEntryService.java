package com.java.timesheet.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.timesheet.model.Employee;
import com.java.timesheet.model.Project;
import com.java.timesheet.model.TimeEntry;
import com.java.timesheet.repository.TimeEntryRepository;
import com.java.util.CustomEmpSub;

@Service
public class TimeEntryService {

	@Autowired
	private TimeEntryRepository timeEntryRepository;

	public List<CustomEmpSub> getEmployeeTimesheetDetails(int managerId, List<Employee> employees) {
		
		List<CustomEmpSub> generalTimeEntry = new ArrayList<>();
		
		for(int i = 0; i < employees.size(); i++) {
			// 1 employee with different week submissions that are pending	
			int employeeId = employees.get(i).getEmployeeId();
			List <TimeEntry> timeEntry = timeEntryRepository.findByManagerIdAndStatusOrEmployeeId(managerId, "pending", employeeId);
			//List <TimeEntry> allSpecificEmpPendingList = new ArrayList<>(); 
			
			//Create a Hashmap which can have different week but list of TimeEntries
			Map<Integer, List<TimeEntry>> map = new HashMap<Integer,  List<TimeEntry>>();
			if(!timeEntry.isEmpty()) {
				
				for(int m = 0; m < timeEntry.size(); m++) {
					
					List<TimeEntry> empTimeEntry;
					
					if(!map.containsKey(timeEntry.get(m).getWeekNumber())) {
						empTimeEntry = new ArrayList<TimeEntry>();
						timeEntry.get(m).setTotal();
						empTimeEntry.add(timeEntry.get(m));
						map.put(timeEntry.get(m).getWeekNumber(), empTimeEntry);
					} else {
						empTimeEntry = map.get(timeEntry.get(m).getWeekNumber());
						timeEntry.get(m).setTotal();
						empTimeEntry.add(timeEntry.get(m));
						map.put(timeEntry.get(m).getWeekNumber(), empTimeEntry);
					}
				}
			}
			
			 for(Entry<Integer, List<TimeEntry>> entry: map.entrySet()) {
				 CustomEmpSub customEmpSub = new CustomEmpSub();
				 customEmpSub.setEmployeeId(employeeId);   
				 customEmpSub.setFirstName(employees.get(i).getFirstName());
				 customEmpSub.setLastName(employees.get(i).getLastName());
				 customEmpSub.setTimeEntries(entry.getValue());
				 
				 generalTimeEntry.add(customEmpSub);
			    }
		}
		
		/*
		ArrayList<TimeEntry> timeEntries = timeEntryRepository.getTimeSheetDetails(managerId);
		return timeEntries;
		*/
		return generalTimeEntry;
	}
	
	public void saveTimeEntry(TimeEntry timeEntry, Project project) {
		
		String projectCode = project.getProjectCode() + Integer.toString(project.getProjectId());
		
		timeEntry.setCategory(project.getCategory());
		timeEntry.setStartDate(project.getStartDate());
		timeEntry.setEndDate(project.getEndDate());
		timeEntry.setStatus("pending");
		timeEntry.setProjectCode(projectCode);
		timeEntry.setWeekNumber(timeEntry.getWeekNumber());
		
		timeEntryRepository.save(timeEntry);
		
		
	}
}
