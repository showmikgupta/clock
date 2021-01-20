var ms = 0, s = 0, m = 0;
var ms2 = 0, s2 = 0, m2 = 0;
var timer;
var lapTimer;
var stopwatchElement = document.getElementById('stopwatch-clock');
var lapsContainer = document.querySelector('.laps');
var numLaps = 0;

function startStopwatch() {
	if (!timer) {
		timer = setInterval(run, 10);
	}

	if (!lapTimer) {
		lapTimer = setInterval(runLapTimer, 10);
	}

	document.getElementById('start-stopwatch').style.display = 'none';
	document.getElementById('pause-stopwatch').style.display = '';
	document.getElementById('reset-stopwatch').style.display = '';
	document.getElementById('lap-stopwatch').style.display = '';

	stopwatchRunning = true;
	showResetButton = true;
}

function pauseStopwatch() {
	stopStopwatchTimer();
	stopLapTimer();
	document.getElementById('pause-stopwatch').style.display = 'none';
	document.getElementById('start-stopwatch').style.display = '';
}

function resetStopwatch() {
	stopStopwatchTimer();
	stopLapTimer();
	showResetButton = false;
	ms = s = m = 0;
	ms2 = s2 = m2 = 0;
	stopwatchElement.textContent = getTimer();

	document.getElementById('reset-stopwatch').style.display = 'none';
	document.getElementById('pause-stopwatch').style.display = 'none';
	document.getElementById('start-stopwatch').style.display = '';
	lapsContainer.innerHTML = '';
	numLaps = 0;
}

function resetLapTimer() {
	ms2 = s2 = m2 = 0;
}

function lap() {
	var li = document.createElement('li');
	li.innerHTML = ++numLaps + ": " + getLapTimer() + " " + getTimer();
	resetLapTimer();
	lapsContainer.prepend(li);
}

function stopStopwatchTimer() {
	clearInterval(timer);
	timer = false;
	stopwatchRunning = false;
	document.getElementById('lap-stopwatch').style.display = 'none';
}

function stopLapTimer() {
	clearInterval(lapTimer);
	lapTimer = false;
}

function getTimer() {
	return (m < 10 ? "0" + m : m)+ ":" 
		+ (s < 10 ? "0" + s : s) + ":" + (ms < 10 ? "0" + ms : ms);
}

function getLapTimer() {
	return (m2 < 10 ? "0" + m2 : m2)+ ":" 
		+ (s2 < 10 ? "0" + s2 : s2) + ":" + (ms2 < 10 ? "0" + ms2 : ms2);
}

function run() {
	stopwatchElement.textContent = getTimer();
	ms++;

	if (ms == 100) {
		ms = 0;
		s++;
	}

	if (s == 60) {
		s = 0;
		m++;
	}
}

function runLapTimer() {
	ms2++;

	if (ms2 == 100) {
		ms2 = 0;
		s2++;
	}

	if (s2 == 60) {
		s2 = 0;
		m2++;
	}
}