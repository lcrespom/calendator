$(function() {

	MONTHS = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	]
	WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

	function fillCalendarCells($month) {
		for (let i = 1; i <= 35; i++) {
			let html = `<div class="cal-day"><div class="cal-cell">${i}</div></div>`
			$month.append(html)
		}
	}

	function addCalendar($cal, name, mnum, year) {
		let $month = $('<div class="cal-month"></div>')
		for (let weekday of WEEKDAYS)
			$month.append(`<span class="cal-weekday">${weekday}</span>`)
		fillCalendarCells($month)
		let $mblock = $(`
			<div class="cal-month-block">
				<h2>${name}</h2>
			</div>
		`)
		$mblock.append($month)
		$cal.append($mblock)
	}

	let today = new Date()
	let month = today.getMonth()
	let year = today.getFullYear()
	let $cal = $('#calendar')
	for (let i = 0; i < 12; i++) {
		let j = month + i
		if (j == 12) year++
		let mnum = j % 12
		let name = `${MONTHS[mnum]} ${year}`
		addCalendar($cal, name, mnum, year)
	}

})
