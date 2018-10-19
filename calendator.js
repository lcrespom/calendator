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

	function formGroup(label, type = 'text', value = '', before = '', after = '') {
		return $(`
		<div class="form-group">
			<label>${label}</label>
			${before}
			<input type="${type}" value="${value}" class="form-control"/>
			${after}
		</div>
		`)
	}

	function randomColor() {
		let [r, g, b] = hsl2rgb(Math.random(), 1, 0.5)
		return rgb2hex(r, g, b)
	}

	function addEventInputs() {
		let $inputs = $(`<div class="cal-event-inputs"></div>`)
		$inputs
			.append(formGroup('Name'))
			.append(formGroup('Color', 'color', randomColor()))
			.append(formGroup('Start', 'date'))
			.append(formGroup('Duration', 'number', '', '', 'days'))
			.append(formGroup('Repeat', 'number', '', 'every', 'days'))
			.append(formGroup('For', 'number', '', '', 'times'))
			.append(`<div class="form-group">
						<label />
						<button class="btn btn-sm btn-warning">Remove event</button>
					</div>`)
		$('#event-list')
			.prepend($inputs)
			.prepend('<hr/>')
	}


	//-------------------- Misc utilities --------------------

	// Obtained from https://stackoverflow.com/a/9493060/2342681
	function hsl2rgb(h, s, l) {
		let r, g, b
		if (s == 0) {
			r = g = b = l // achromatic
		} else {
			let hue2rgb = (p, q, t) => {
				if (t < 0) t += 1
				if (t > 1) t -= 1
				if (t < 1 / 6) return p + (q - p) * 6 * t
				if (t < 1 / 2) return q
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
				return p
			}
			let q = l < 0.5 ? l * (1 + s) : l + s - l * s
			let p = 2 * l - q
			r = hue2rgb(p, q, h + 1 / 3)
			g = hue2rgb(p, q, h)
			b = hue2rgb(p, q, h - 1 / 3)
		}
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
	}

	function rgb2hex(r, g, b) {
		let d2h = d => {
			let h = d.toString(16)
			return h.length > 1 ? h : '0' + h
		}
		return `#${d2h(r)}${d2h(g)}${d2h(b)}`
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