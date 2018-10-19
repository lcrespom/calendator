$(function() {

	//-------------------- Calendar panel --------------------

	MONTHS = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	]
	WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

	function daysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate()
	}

	function dayOfWeek(date) {
		let dow = date.getDay()
		if (dow == 0) dow = 7	// Adjust week to Mon ... Sun pattern
		return dow - 1
	}

	function getMonthWeeks(month, year) {
		let dim = daysInMonth(month, year)
		let dow = dayOfWeek(new Date(year, month, 1))
		return Math.ceil((dim + dow) / 7)
	}

	function fillCalendarCells($month, mnum, year) {
		let totalDays = getMonthWeeks(mnum, year) * 7
		let daynum = 1 - dayOfWeek(new Date(year, mnum, 1))
		let dim = daysInMonth(mnum, year)
		for (let i = 1; i <= totalDays; i++) {
			let $daycell = $('<div class="cal-day"></div>')
			if (daynum > 0 && daynum <= dim) {
				id = `day-${year}-${mnum}-${daynum}`
				$daycell.append(
					`<div class="cal-cell" id="${id}">${daynum}</div></div>`
				)
			}
			else
				$daycell.addClass('cal-empty')
			daynum++
			$month.append($daycell)
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

	//-------------------- Event panel --------------------

	function setupEventPanel() {
		$('#cal-add-event').click(_ => addEventInputs())
	}

	function formGroup(label, type = 'text', value = "") {
		return $(`
		<div class="form-group">
			<label>${label}</label>
			<input type="${type}" value="${value}" class="form-control"/>
		</div>
		`)
	}

	function addEventInputs() {
		// let $inputs = $(`<div class="cal-event-inputs"></div>`)
		// $inputs.append(formGroup('Name'))
		$('#events').append(`
<hr/>
<div class="cal-event-inputs">
	<div class="form-group">
		<label>Name</label>
		<input type="text" class="form-control"/>
	</div>
	<div class="form-group">
		<label>Color</label>
		<input type="color" value="#ff0000" class="form-control">
	</div>
	<div class="form-group">
		<label>Start</label>
		<input type="date" class="form-control"/>
	</div>
	<div class="form-group">
		<label>Duration</label>
		<input type="number" class="form-control"/> days
	</div>
	<div class="form-group">
		<label>Repeat</label>
		every <input type="number" class="form-control"/> days
	</div>
	<div class="form-group">
		<label>For</label>
		<input type="number" class="form-control"/> times
	</div>
	<div class="form-group">
		<label></label>
		<button class="btn btn-sm btn-warning">Remove event</button>
	</div>
</div>
`)
	}

	//-------------------- Main --------------------

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
		setupEventPanel()
	}

	main()

})

/*
TODO
- Add inputs to fill events
	- Name / color / Start date / x days / repeat every y days / z times
- Draw events in calendar
- Infinte scroll: add more months
*/