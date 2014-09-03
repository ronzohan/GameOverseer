var Timer;
var TotalSeconds;
var Seconds;
var Hours;
var Days;
var Minutes;
var TimeStr;
var TimerID;

function addTimer(TDate, FMessage, TimID){
	FinishMessage = FMessage;
	TimerID = TimID;
	var TargetDate = TDate;
	var dtarg = new Date(TargetDate);
	var dnow = new Date();
	diff = new Date(dtarg - dnow);
	if(diff < 0){
		Timer.innerHTML = FinishMessage;
	}
	Time = Math.floor(diff.valueOf()/1000);
	CreateTimer(TimerID, Time);
	UpdateTimer();
}

function CreateTimer(TimerID, Time) {
	Timer = document.getElementById(TimerID);
	TotalSeconds = Time;

	UpdateTimer();
	window.setTimeout("Tick()", 1000);
}

function Tick() {
	if (TotalSeconds <= 0) {
		Timer.innerHTML = FinishMessage;
		return;
	}

	TotalSeconds -= 1;
	UpdateTimer();
	window.setTimeout("Tick()", 1000);
}
 
function UpdateTimer() {
	Seconds = TotalSeconds;

	Days = Math.floor(Seconds / 86400);
	Seconds -= Days * (86400);

	Hours = Math.floor(Seconds / 3600);
	Seconds -= Hours * (3600);

	Minutes = Math.floor(Seconds / 60);
	Seconds -= Minutes * (60);

	TimeStr = ((Days > 0) ? Days + " days " : "") + (((Hours > 0) && (Days <= 0)) ? Hours + " h " : "") + (((Minutes > 0) && (Days <= 0)) ? Minutes + " m " : "") + (((Seconds > 0) && (Days <= 0) && (Hours <= 0) && (Minutes <= 0)) ? Seconds + " s " : "");

	Timer.innerHTML = TimeStr;
}

function UpdateTimer() {
	Seconds = TotalSeconds;

	Days = Math.floor(Seconds / 86400);
	Seconds -= Days * (86400);

	Hours = Math.floor(Seconds / 3600);
	Seconds -= Hours * (3600);

	Minutes = Math.floor(Seconds / 60);
	Seconds -= Minutes * (60);

	TimeStr = ((Days > 0) ? Days + " days " : "") + (((Hours > 0) && (Days <= 0)) ? Hours + " h " : "") + (((Minutes > 0) && (Days <= 0)) ? Minutes + " m " : "") + (((Seconds > 0) && (Days <= 0) && (Hours <= 0) && (Minutes <= 0)) ? Seconds + " s " : "");


	Timer.innerHTML = TimeStr;
}

addTimer(TargetDate, FinishMessage, TimerID);


