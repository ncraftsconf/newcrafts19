$(document).ready(() => {
    $.get('./schedule.json')
    .then(resp => {
        let scheduleNav = '';
        let scheduleContent = '';

        const days = resp.days;
        for (var i = 0; i < resp.days.length; i++)
        {
            scheduleNav += `
                <li>
                    <a href='#day${i}' data-toggle='tab'${ i === 0 ? ' id="first_day"' : '' }>
                        <h4 class='highlight'>${days[i].title}</h4>
                        <p class='text-alt'>${days[i].date}</p>
                    </a>
                </li>
            `;

            scheduleContent += `
                <div id="day${i}" class='tab-pane fade in'>
            `;

            const rooms = days[i].rooms;

            if (rooms.length > 1) {

                scheduleContent += `
                    <ul class="nav nav-schedule">
                `;

                for (var j = 0; j < rooms.length; j++)
                {
                    scheduleContent += `
                        <li${ j === 0 ? ' class="active"' : '' }>><a href='#day${i}_room${j}' data-toggle='tab'>${rooms[j].room}</a></li>
                    `;
                }

                scheduleContent += `
                    </ul>
                `;
            }
                            
            scheduleContent += `
                <div class="tab-content tab-content-schedule">
            `;
            
            for (var j = 0; j < rooms.length; j++)
            {
                const events = rooms[j].events;

                scheduleContent += `
                    <div id="day${i}_room${j}" class="tab-pane fade in${ j === 0 ? ' active' : '' }">
                        <div class='panel-group' id='day${i}_room${j}_timeline'>
                `;

                for (var k = 0; k < events.length; k++)
                {
                    scheduleContent += `
                        <div class="panel schedule-item">
                            <div class="lecture-icon-wrapper"${events[k].image !== '' ? ` style="background-image: url(${events[k].image}); background-size:cover"` : ''}>
                                ${events[k].type === 'conference' && events[k].image === '' ? '<span class="fa fa-microphone"></span>' : ''}
                                ${events[k].type === 'break' ? '<span class="fa fa-coffee"></span>' : ''}
                                ${events[k].type === 'lunch' ? '<span class="fa fa-cutlery"></span>' : ''}
                            </div>
                    `;

                    if (events[k].description !== '') {
                        scheduleContent += `
                            <a data-toggle='collapse' data-parent='#day${i}_room${j}_timeline' href='#day${i}_room${j}_timeline_time${k}' class='schedule-item-toggle collapsed'>
                                <strong class="time highlight"><i class="icon icon-office-24"></i>${events[k].time}</strong>
                                <h6 class="title">${events[k].title}<i class="icon icon-arrows-06"></i></h6>
                            </a>

                            <div id='day${i}_room${j}_timeline_time${k}' class='panel-collapse collapse schedule-item-body '>
                                <article>
                                    <p class='description'>
                                        ${events[k].description}    
                                    </p>
                                    <strong class='highlight speaker-name'>${events[k].author}</strong>
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

        $('#schedule-nav').append(scheduleNav);
        $('#schedule-content').append(scheduleContent);
        
        console.log(scheduleNav);
        console.log(scheduleContent);
        
        $('#first_day').click();
    });
});
