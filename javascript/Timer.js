var Timer;
var TotalSeconds;

function CreateTimer(TimerID, Time){
    var oop=this;
	this.Timer = document.getElementById(TimerID);
	this.TotalSeconds = Time;
	this.update();
	oop.to=setTimeout(function(){ oop.tick(); }, 1000);
}

CreateTimer.prototype={

 tick:function(){
    var oop=this;
	if (this.TotalSeconds <= 0){
		this.Timer.innerHTML = FinishMessage;
		return;
	}
	this.TotalSeconds -= 1;
	this.update()
	oop.to=setTimeout(function(){ oop.tick(); }, 1000);
 },

 update:function(){
 	var Seconds = this.TotalSeconds,Days = Math.floor(Seconds / 86400);
	Seconds -= Days * 86400;
	var Hours = Math.floor(Seconds / 3600);
	Seconds -= Hours * (3600);
	var Minutes = Math.floor(Seconds / 60);
	Seconds -= Minutes * (60);
	var TimeStr = ((Days > 0) ? Days + " days " : "") + (((Hours > 0) && (Days <= 0)) ? Hours + " h " : "") + (((Minutes > 0) && (Days <= 0)) ? Minutes + " m " : "") + (((Seconds > 0) && (Days <= 0) && (Hours <= 0) && (Minutes <= 0)) ? Seconds + " s " : "");
	this.Timer.innerHTML = TimeStr;
 }
 

}
	
