package com.java.timesheet.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.timesheet.model.TimeEntry;

@RestController
public class AjaxController {

	@PostMapping("/viewTask/save")
	public String save(@RequestBody TimeEntry timeEntry) {
		
		//System.out.println("Display Text");
		
		
		
		//ModelAndView model = new ModelAndView("blank");
		String success = "sample";
		return success;	
	}
}
