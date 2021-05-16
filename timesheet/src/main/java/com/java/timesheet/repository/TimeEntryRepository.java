package com.java.timesheet.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.timesheet.model.TimeEntry;

public interface TimeEntryRepository extends JpaRepository<TimeEntry, Integer> {

	@Query("select t from TimeEntry t where t.managerId = ?1")
	ArrayList<TimeEntry> getTimeSheetDetails(int managerId);
	
	List<TimeEntry> findByManagerIdAndStatusOrEmployeeId(int managerId, String status, int employeeId);
	
	TimeEntry findByEmployeeIdAndWeekNumber(int employeeId, int weekNumber);
}
