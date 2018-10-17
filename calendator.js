$(function() {

	MONTHS = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	]
	WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

	function isLeapYear(year) {
  		return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
	}

	function daysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate()
	}

	function getMonthWeeks(mnum, year) {
		// All months cover 5 weeks, except February,
		// but only if it starts on a Monday and is not a leap year
		if (mnum != 1 || isLeapYear(year)) return 5
		let d = new Date(year, mnum, 1)
		return d.getDay() == 1 ? 4 : 5
	}

	function fillCalendarCells($month, mnum, year) {
		let totalDays = getMonthWeeks(mnum, year) * 7
		let d = new Date(year, mnum, 1)
		let daynum = 2 - d.getDay()
		let dim = daysInMonth(mnum, year)
		for (let i = 1; i <= totalDays; i++) {
			let daylabel = daynum
			if (daynum <= 0 || daynum > dim) daylabel = ''
			let html = `<div class="cal-day"><div class="cal-cell">${daylabel}</div></div>`
			daynum++
			$month.append(html)
		}
	}

	function addCalendar($cal, name, mnum, year) {
		let $month = $('<div class="cal-month"></div>')
		for (let weekday of WEEKDAYS)
			$month.append(`<span class="cal-weekday">${weekday}</span>`)
		fillCalendarCells($month, mnum, year)
		let $mblock = $(`
			<div class="cal-month-block">
				<h2>${name}</h2>
			</div>
		`)
		$mblock.append($month)
		$cal.append($mblock)
	}

	function main() {
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
	}

	main()

})
