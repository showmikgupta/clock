var setTimerClock = document.getElementById('set-timer-clock');
var activeTimerClock = document.getElementById('active-timer-clock');
var numsEntered = 0;
var hTimer = "00", mTimer = "00", sTimer = "00";
var hours, minutes, seconds;
var timerInterval;
var displayTimer = false;
var timerPaused = false;

function startTimer() {
	timerPaused = false;
	
	if (displayTimer) {
		timerInterval = setInterval(updateTimer, 1000);
		document.getElementById('pause-timer').style.display = '';
		document.getElementById('reset-timer').style.display = '';
		return;
	}

	hours = parseInt(hTimer);
	minutes = parseInt(mTimer);
	seconds = parseInt(sTimer);

	if (hours == 0 && minutes == 0 && seconds == 0) {
		alert("Enter an amount of time to start the timer");
		return;
	}

	if (seconds >= 60) {
		minutes += Math.trunc(seconds / 60);
		seconds %= 60;
	}

	if (minutes >= 60) {
		hours += Math.trunc(minutes / 60);
		minutes %= 60;
	}

	activeTimerClock.innerText = (hours < 10 ? "0" + hours : hours)+ ":" 
	+ (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
	displayTimer = true;
	+ (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
	setTimerClock.style.display = 'none';
	activeTimerClock.style.display = '';
	document.getElementById('start-timer').style.display = 'none';
	document.getElementById('pause-timer').style.display = '';
	document.getElementById('reset-timer').style.display = '';
	document.getElementById('clear-timer').style.display = 'none';
	timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
	timerPaused = true;
	clearInterval(timerInterval);
	document.getElementById('start-timer').style.display = '';
	document.getElementById('pause-timer').style.display = 'none';
}

function resetTimer() {
	clearTimer();
	clearInterval(timerInterval);
	setTimerClock.style.display = '';
	activeTimerClock.style.display = 'none';
	document.getElementById('start-timer').style.display = '';
	document.getElementById('pause-timer').style.display = 'none';
	document.getElementById('reset-timer').style.display = 'none';
}

function clearTimer() {
	displayTimer = false;
	hTimer = mTimer = sTimer = "00";
	numsEntered = 0;
	setTimerClock.innerText = hTimer + "h " + mTimer + "m " +
		sTimer + "s";
	document.getElementById('clear-timer').style.display = 'none';
}

function updateTimer() {
	if (hours == 0 && minutes == 0 && seconds == 0) {
		timerDone();
		return;
	}

	if (seconds == 0) {
		minutes--;
		seconds = 59;
	} else {
		seconds--;
	}

	if (minutes == 0) {
		if (hours > 0) {
			hours--;
			minutes = 59;
		}
	} else {
		// minutes--;
	}

	activeTimerClock.innerText = (hours < 10 ? "0" + hours : hours)+ ":" 
	+ (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

function timerDone() {
	clearInterval(timerInterval);
	alarmSound.play();
	document.getElementById('pause-timer').style.display = 'none';
	document.getElementById('reset-timer').style.display = 'none';
	document.getElementById('stop-timer').style.display = '';
}

function stopTimer() {
	alarmSound.pause()
	alarmSound.currentTime = 0;
	resetTimer();
	document.getElementById('stop-timer').style.display = 'none';
	
}

function setTimer(e) {
	if (e.key >= 0 && e.key <= 9) {
		//console.log(e.key);
		switch (numsEntered) {
			case 0:
				sTimer = "0" + e.key;
				numsEntered++;
				break;
			case 1:
				sTimer = sTimer[1] + e.key;
				numsEntered++;
				break;
			case 2:
				mTimer = "0" + sTimer[0];
				sTimer = sTimer[1] + e.key;
				numsEntered++;
				break;
			case 3:
				mTimer = mTimer[1] + sTimer[0];
				sTimer = sTimer[1] + e.key;
				numsEntered++;
				break;
			case 4:
				hTimer = "0" + mTimer[0];
				mTimer = mTimer[1] + sTimer[0];
				sTimer = sTimer[1] + e.key;
				numsEntered++;
				break;
			case 5:
				hTimer = hTimer[1] + mTimer[0];
				mTimer = mTimer[1] + sTimer[0];
				sTimer = sTimer[1] + e.key;
				numsEntered++
				break;
			default:
				break;
		}

		setTimerClock.innerText = hTimer + "h " + mTimer + "m " +
			sTimer + "s";
		
		document.getElementById('clear-timer').style.display = '';
	} else {
		console.log("bad");
	}
}