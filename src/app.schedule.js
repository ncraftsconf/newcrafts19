function generateNaviationHtml (days) {
	let scheduleNav = '';
	
	for (var i = 0; i < days.length; i++) {
		scheduleNav += `
			<li>
				<a href='#day${i}' data-toggle='tab' id="nav_day${i}">
					<h4 class='highlight'>${days[i].title}</h4>
					<p class='text-alt'>${days[i].date}</p>
				</a>
			</li>
		`;	
	}
	
	return scheduleNav;
}

function generateEventsHtml (days) {
	var markdownConverter = new showdown.Converter();
	
	let scheduleContent = '';
	
	for (var i = 0; i < days.length; i++) {
		scheduleContent += `
			<div id="day${i}" class='tab-pane fade in'>
		`;

		const rooms = days[i].rooms;

		if (rooms.length > 1) {

			scheduleContent += `
				<ul class="nav nav-schedule">
			`;

			for (var j = 0; j < rooms.length; j++) {
				scheduleContent += `
					<li${ j === 0 ? ' class="active"' : '' }><a href='#day${i}_room${j}' data-toggle='tab'>${rooms[j].room}</a></li>
				`;
			}

			scheduleContent += `
				</ul>
			`;
		}

		scheduleContent += `
			<div class="tab-content tab-content-schedule">
		`;

		for (var j = 0; j < rooms.length; j++) {
			const events = rooms[j].events;

			scheduleContent += `
				<div id="day${i}_room${j}" class="tab-pane fade in${ j === 0 ? ' active' : '' }">
					<div class='panel-group' id='day${i}_room${j}_timeline'>
			`;

			for (var k = 0; k < events.length; k++) {
				scheduleContent += `
					<div class="panel schedule-item">
						<div class="lecture-icon-wrapper"${events[k].speakerPhoto !== '' ? ` style="background-image: url(${events[k].speakerPhoto}); background-size:cover"` : ''}>
							${events[k].type === 'conference' && events[k].speakerPhoto === '' ? '<span class="fa fa-microphone"></span>' : ''}
							${events[k].type === 'break' ? '<span class="fa fa-coffee"></span>' : ''}
							${events[k].type === 'lunch' ? '<span class="fa fa-cutlery"></span>' : ''}
						</div>
				`;

				if (events[k].description !== '' || events[k].speakerName !== '') {
					scheduleContent += `
						<a data-toggle='collapse' data-parent='#day${i}_room${j}_timeline' href='#day${i}_room${j}_timeline_time${k}' class='schedule-item-toggle collapsed'>
							<strong class="time highlight"><i class="icon icon-office-24"></i>${events[k].time}</strong>
							<h6 class="title">${events[k].title}<i class="icon icon-arrows-06"></i></h6>
							<strong class='highlight speaker-name'>${events[k].speakerName}</strong>
						</a>

						<div id='day${i}_room${j}_timeline_time${k}' class='panel-collapse collapse schedule-item-body${ events.length === 1 && k === 0 ? ' in' : '' }'>
							<article>
								<p class='description'>
									${ markdownConverter.makeHtml(events[k].description) }    
								</p>
							
								${ events[k].twitter && events[k].twitter !== '' ? '<strong class="highlight speaker-name"><a href="'+events[k].twitter+'" target="_blank"><span class="fa fa-twitter"></span></a></strong>' : '' }
							</article>
						</div>
					`;
				}
				else {
					scheduleContent += `
						<a data-parent='#day${i}_room${j}_timeline' class='schedule-item-toggle collapsed'>
							<strong class="time highlight"><i class="icon icon-office-24"></i>${events[k].time}</strong>
							<h6 class="title">${events[k].title}</h6>
						</a>
					`;
				}

				scheduleContent += `
					</div>
				`;
			}

			scheduleContent += `
					</div>
				</div>
			`;
		}
				
		scheduleContent += `
				</div>
			</div>
		`;
	}
	
	return scheduleContent;
}

function getView(model) {
	const days = model.days;

	$('#schedule-nav').html(generateNaviationHtml(days));
	$('#schedule-content').html(generateEventsHtml(days));

	Ventcamp.tabNavToSelect();
	$('#nav_day1').click();
}

function initSchedule() {
	$.getJSON('./datas/schedule.js').then(getView);
}

$(document).ready(initSchedule);