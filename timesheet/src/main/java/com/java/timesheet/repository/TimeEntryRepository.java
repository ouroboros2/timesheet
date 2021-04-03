package com.java.timesheet.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.timesheet.model.TimeEntry;

public interface TimeEntryRepository extends JpaRepository<TimeEntry, Integer> {

	@Query("select t from TimeEntry t where t.employeeId = ?1 and t.managerId= ?2")
	ArrayList<TimeEntry> getTimeSheetDetails(int employeeId, int managerId);
}
