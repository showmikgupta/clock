var alarmSound = new Audio();
alarmSound.src = "alarm.mp3";
var alarmTimer;
var alarmTime;
var timeRemainingTimer;
var alarmRunning = false;
var stopwatchRunning = false;
var showResetButton = false;

function openHome() {
	var elements = document.getElementsByClassName('stopwatch-item');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = 'none';
		return;
	});

	elements = document.getElementsByClassName('alarm-button');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = 'none';
		return;
	});

	elements = document.getElementsByClassName('timer-item');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = 'none';
		return;
	});

	document.getElementById('current-time').style.display = '';
	document.getElementById('clock').style.display = '';
};

function openAlarm() {
	//get all buttons related to timer functionality
	var elements = document.getElementsByClassName('stopwatch-item');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = 'none';
		return;
	});

	elements = document.getElementsByClassName('timer-item');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = 'none';
		return;
	});

	document.getElementById('alarm-options').style.display = '';

	elements = document.getElementsByClassName('alarm-button');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = '';
		return;
	});

	if (alarmRunning) {
		var button = document.getElementById('set-alarm-button');
		button.innerText = 'Cancel Alarm';
		button.setAttribute('onclick', 'cancelAlarm(this);');
		document.getElementById('time-remaining').style.display = '';
	}

	document.getElementById('alarm-options').style.display = 'none';

	document.getElementById('current-time').style.display = '';
	document.getElementById('clock').style.display = '';
};

function openStopwatch() {
	//get all buttons related to alarm functionality
	var elements = document.getElementsByClassName('alarm-button');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = 'none';
		return;
	});

	document.getElementById('time-remaining').style.display = 'none';

	elements = document.getElementsByClassName('timer-item');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = 'none';
		return;
	});

	if (stopwatchRunning) {
		document.getElementById('pause-stopwatch').style.display = '';
		document.getElementById('reset-stopwatch').style.display = '';
		document.getElementById('lap-stopwatch').style.display = '';
	} else {
		if (showResetButton) {
			document.getElementById('reset-stopwatch').style.display = '';
		}

		document.getElementById('start-stopwatch').style.display = '';
	}

	document.getElementById('stopwatch-clock').style.display = '';
	document.getElementById('lap-times').style.display = '';
	document.getElementById('current-time').style.display = 'none';
	document.getElementById('clock').style.display = 'none';
	// document.getElementById('pause-stopwatch').style.display = '';
};

function openTimer() {
	var elements = document.getElementsByClassName('alarm-button');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = 'none';
		return;
	});

	var elements = document.getElementsByClassName('stopwatch-item');

	//set all the buttons to display='none'
	Array.prototype.map.call(elements, function(element){
		element.style.display = 'none';
		return;
	});

	if (hTimer !== '00' || mTimer !== '00' || sTimer !== '00') {
		document.getElementById('clear-timer').style.display = '';
	}

	if (displayTimer) {
		activeTimerClock.style.display = '';
		setTimerClock.style.display = 'none';

		if (timerPaused) {
			document.getElementById('pause-timer').style.display = 'none';
			document.getElementById('start-timer').style.display = '';
		} else {
			document.getElementById('pause-timer').style.display = '';
			document.getElementById('start-timer').style.display = 'none';
		}

		document.getElementById('reset-timer').style.display = '';
		document.getElementById('clear-timer').style.display = 'none';
	} else {
		document.getElementById('set-timer-clock').style.display = '';
		document.getElementById('start-timer').style.display = '';
	}

	document.getElementById('current-time').style.display = 'none';
	document.getElementById('clock').style.display = 'none';

	document.addEventListener("keyup", setTimer);
};