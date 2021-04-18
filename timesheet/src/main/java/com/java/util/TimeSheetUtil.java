package com.java.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.sun.el.parser.ParseException;

public class TimeSheetUtil {

	public static Date parseDate(String date) {
	     try {
	         return new SimpleDateFormat("yyyy-MM-dd").parse(date);
	     } catch (Exception e) {
	         return null;
	     }
	  }
	
}
