function setAlarm(button) {
	var enteredTime = document.getElementById('alarmTime').valueAsNumber;

	if (isNaN(enteredTime)) {
		alert("Invalid date and/or time entered");
		return;
	}

	var alarm = new Date(enteredTime);
	alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(),
		alarm.getUTCDate(), alarm.getUTCHours(), alarm.getUTCMinutes(),
		alarm.getUTCSeconds());
	var diff = alarmTime.getTime() - (new Date().getTime());

	if (diff < 0) {
		alert('Entered time has already passed');
		return;
	}

	alarmTimer = setTimeout(initAlarm, diff);
	alarmRunning = true;

	button.innerText = 'Cancel Alarm';
	button.setAttribute('onclick', 'cancelAlarm(this);');
	timeRemainingTimer = setInterval(timeRemaining, 100);
	document.getElementById('time-remaining').style.display = '';
};

function cancelAlarm(button) {
	alarmRunning = false;
	button.innerText = 'Set Alarm'
	button.setAttribute('onclick', 'setAlarm(this);');
	document.getElementById('time-remaining').style.display = 'none';
	clearTimeout(alarmTimer);
	clearInterval(timeRemainingTimer);
};

function initAlarm() {
	alarmSound.play();
	document.getElementById('alarm-options').style.display = '';
};

function stopAlarm() {
	clearInterval(timeRemainingTimer);
	alarmSound.pause();
	alarmSound.currentTime = 0;
	document.getElementById('alarm-options').style.display = 'none';
	// document.getElementById('time-remaining').style.display = 'none';
	var setAlarmButton = document.getElementById('set-alarm-button');
	cancelAlarm(setAlarmButton);
};

function snoozeAlarm() {
	stopAlarm();
	setTimeout(initAlarm, 300000);
	alert("Snoozed alarm for 5 minutes");
};

function timeRemaining() {
	var currentTime = new Date();
	var diff = alarmTime.getTime() - currentTime.getTime();
	diff /= 60000;
	// console.log(diff);

	var minutes, hours, days, months, years;
	minutes = diff;
	hours = minutes / 60;
	days = hours / 24;
	// console.log(minutes);

	if (minutes < 10) {
		minutes = minutes.toPrecision(1);
	} else {
		minutes = minutes.toPrecision(2);
	}

	if (hours < 10) {
		hours = hours.toPrecision(1);
	} else {
		hours = hours.toPrecision(2);
	}

	if (days < 10) {
		days = days.toPrecision(1);
	} else if (days < 100) {
		days = days.toPrecision(2);
	} else {
		days = days.toPrecision(3);
	}

	if (minutes < 1) {
		document.getElementById('time-remaining').innerHTML = 'Time Remaining: < 1 min';
	} else if (minutes < 60) {
		if (minutes < 10) {
			document.getElementById('time-remaining').innerHTML = 'Time Remaining: 00:0' +
			minutes;
		} else {
			document.getElementById('time-remaining').innerHTML = 'Time Remaining: 00:' +
			minutes;
		}
	} else if (minutes >= 60 && hours < 24) {
		var mins = minutes % 60;

		if (hours < 10) {
			document.getElementById('time-remaining').innerHTML = 'Time Remaining: 0' +
			hours + ":" + (mins < 10 ? ('0' + mins) : mins);
		} else {
			document.getElementById('time-remaining').innerHTML = 'Time Remaining: ' +
			hours + ":" + (mins < 10 ? ('0' + mins) : mins);
		}
	} else {
		document.getElementById('time-remaining').innerHTML = 'Time Remaining: ' +
			days + (days > 1 ? ' days' : ' day');
	}
};