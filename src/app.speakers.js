$(document).ready(() => {
            $.getJSON('//raw.githubusercontent.com/ncraftsconf/newcrafts19/master/schedule.json')
                .then(resp => {
                    let speakers = [];

                    for (var i = 0; i < resp.days.length; i++)
                    {
                        for (var j = 0; j < resp.days[i].rooms.length; j++)
                        {
                            for (var k = 0; k < resp.days[i].rooms[j].events.length; k++)
                            {
                                let speaker = {
                                    speakerPhoto: resp.days[i].rooms[j].events[k].speakerPhoto,
                                    speakerName: resp.days[i].rooms[j].events[k].speakerName,
                                };

                                speakers.push(speaker);
                            }
                        }
                    }

                    // Remove duplicates
                    speakers = speakers.filter((speaker, index, self) =>
                        index === self.findIndex((s) => (
                            s.speakerName === speaker.speakerName
                        ))
                    );

                    for (var i = 0; i < speakers.length; i++) {
                        let speaker = speakers[i];

                        let speakerHtml = `
                            <div class="col-sm-4">
                                <div class="speaker">
                                    <div class="photo-wrapper rounded">
                                        <img data-src="${ speaker.speakerPhoto }" alt="${ speaker.speakerName }" class="img-responsive lazyload" data-sizes="auto" />
                                    </div>
                                    <h3 class="name">${ speaker.speakerName }</h3>
                                    <p class="text-alt">
                                        <small>${ speaker.shortDescription }</small>
                                    </p>
                                    <p class="about">
                                        ${ speaker.fullDescription }
                                    </p>
                                    <ul class="speaker-socials">
                                        <li>
                                            <a target="_blank" href="${ speaker.twitter }">
                                                <span class="fa fa-twitter"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" href="${ speaker.github }">
                                                <span class="fa fa-github"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        `;

                        if ((i+1) % 3 === 0) {
                            speakerHtml += `
                                <div class="clearfix"></div>
                            `;
                        }

                        $('#speakerContainer').append(speakerHtml);
                    }
    });
});