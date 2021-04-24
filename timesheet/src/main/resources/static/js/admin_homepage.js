var days = 0;
var begin, end;

if (Date.today().is().sunday())
	begin = new Date();
else
	begin = new Date().last().sunday();

if (Date.today().is().saturday())
	end = new Date();
else
	end = new Date().next().saturday();

displayWeek();

function displayWeek() {
	$("#weekfromdate").text("Week " + begin.getWeek());
	$("#daterange").text(begin.toDateString() + " - " + end.toDateString());
}