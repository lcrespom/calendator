$(function() {
	let $cal = $('.calendar')
	for (let i = 1; i <= 35; i++) {
		html = `<div class="cal-day"><div class="cal-text">${i}</div></div>`
		$cal.append(html)
	}
})
