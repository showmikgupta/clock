'use strict';

function tick() {
	const element = (
		<h1>{new Date().toLocaleTimeString()}</h1>
	);

	ReactDOM.render(
		element,
		document.getElementById('clock')
	);
}

setInterval(tick, 1000);