$(function() {
	
	function fillCalendarCells($cal) {
		for (let i = 1; i <= 35; i++) {
			html = `<div class="cal-day"><div class="cal-cell">${i}</div></div>`
			$cal.append(html)
		}
	}

	fillCalendarCells($('.calendar'))
})
