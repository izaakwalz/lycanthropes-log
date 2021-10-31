'strict';

const EventLog = [
	{ events: ['pizza', 'beer', 'work', 'laptop'], warewolf: false },
	{ events: ['work', 'sleep', 'pizza', 'laptop', 'beer'], warewolf: false },
	{ events: ['pizza', 'ice-cream', 'work', 'playing game'], warewolf: false },
	{ events: ['work', 'playing game', 'pizza', 'sleep'], warewolf: false },
	{ events: ['work', 'coffee', 'reading', 'pizza'], warewolf: true },
	{ events: ['work', 'playing game', 'beer', 'sleep'], warewolf: false },
	{ events: ['pizza', 'ice-cream', 'work', 'playing game'], warewolf: false },
	{ events: ['ice-cream', 'chips', 'beer', 'work', 'playing game'], warewolf: false },
	{ events: ['beer', 'pizza', 'laptop', 'reading', 'sleep'], warewolf: false },
	{ events: ['pizza', 'coffee', 'chips', 'work'], warewolf: true },
	{ events: ['sleep', 'ice-cream', 'work', 'laptop', 'beer'], warewolf: false },
	{ events: ['work', 'ice-cream', 'playing game', 'chips'], warewolf: false },
	{ events: ['pizza', 'playing game', 'chips', 'ice-cream'], warewolf: false },
	{ events: ['pizza', 'beer', 'work', 'ice-cream'], warewolf: false },
	{ events: ['laptop', 'coffee', 'work', 'pizza'], warewolf: true },
	{ events: ['beer', 'work', 'pizza', 'playing game', 'ice-cream'], warewolf: false },
	{ events: ['work', 'sleep', 'playing game', 'ice-cream', 'beer'], warewolf: false },
	{ events: ['laptop', 'beer', 'work', 'chips'], warewolf: false },
	{ events: ['playing game', 'coffee', 'work', 'pizza'], warewolf: true },
	{ events: ['playing game', 'work', 'laptop', 'sleep'], warewolf: false },
];

/**
 *
 * @param {*} activities - array of events
 * @param {*} events  get corelations of events
 * @returns events
 */
const activityEvents = (activities, events = []) => {
	activities.forEach((activity) =>
		activity.events.forEach((event) => {
			if (events.indexOf(event) === -1) {
				events.push(event);
			}
		})
	);

	return events;
};

/**
 *
 * @param {*} param0
 * @description - Zero correlation means the variables are not related
 * a correlation of one indicates that the two are perfectly related.
 * Negative one (-1) also means that the variables are perfectly related but
 * that they are opposites when one is true, the other is false
 * @returns this returns a number between -0 and 1 that describes the correlation
 */
const phi = ([w, x, y, z]) => {
	const numerator = z * w - y * x;
	const denominator = (y + z) * (w + x) * (x + z) * (w + y);

	return (numerator / denominator).toFixed(2); // change to two decimal point e.g(0.01)
};

/**
 *
 * @param {string} event - name of co-related event
 * @param {*} activity array of events log
 * @returns array of numbers
 */
const table = (event, activity) => {
	let table = [0, 0, 0, 0];

	for (let i = 0; i < activity.length; i++) {
		let index = 0;
		if (activity[i].events.includes(event)) index += 1;
		if (activity[i].warewolf) index += 2; // true or false
		table[index] += 1; // adding 1 to all the index
	}
	return table;
};
/**
 *
 * @param {string} phinumber - corelation phi number
 * @param {string} event - corelation evnt
 * @returns boolean event
 */
const corelations = (phinumber, event) => {
	const activityResult =
		phinumber >= 0.02
			? `${event} will completly turn you to a warewolf`
			: phinumber >= 0.01
			? `${event} shows waek positive signs of a warewolf`
			: phinumber <= -0.01
			? `${event} have a negative effect might turn to a warewolf `
			: phinumber <= 0.0
			? `${event} have no relation to a warewolf`
			: `${event} makes you warm blooded`;
	return activityResult;
};

/**
 *
 * @param {*} events - array of events
 * @param {*} activities variable
 * @returns array of objects
 */
const phiTable = (events = activityEvents(EventLog), activities) => {
	activities = events.map((event) => {
		const days = table(event, EventLog).toString();
		return {
			event,
			days,
			corelations: phi(table(event, EventLog)),
			warewolf: corelations(phi(table(event, EventLog)), event),
		};
	});

	return activities;
};

console.table(phiTable());
