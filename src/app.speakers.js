function generateSpeakersHtml (speakers) {
	var markdownConverter = new showdown.Converter();

	let speakersHtml = '';
	
	for (var i = 0; i < speakers.length; i++) {
		
		let speaker = speakers[i];

		speakersHtml += '<div class="col-sm-4">'
				+ '<div class="speaker">'
					+ '<div class="photo-wrapper rounded">'
					+ 	'<img data-src="'+ speaker.image + '" alt="' + speaker.speakerName + '" class="img-responsive lazyload" data-sizes="auto" />'
					+ '</div>'
					+ '<h3 class="name">' + speaker.speakerName + '</h3>'
					+ '<p class="text-alt">'
					+ 	'<small>' + markdownConverter.makeHtml(speaker.bioxs) + '</small>'
					+ '</p>'
					+ '<p class="about">' + markdownConverter.makeHtml(speaker.bio) + '</p>'
				+ 	'<ul class="speaker-socials">';


		if (speaker.twitter !== '') {
			speakersHtml += '<li>'
					+ '<a target="_blank" href="' + speaker.twitter + '">'
						+ '<span class="fa fa-twitter"></span>'
					+ '</a>'
				+ '</li>';
		}

		if (speaker.git !== '') {
			speakersHtml += '<li>'
					+ '<a target="_blank" href="' + speaker.git + '">'
						+ '<span class="fa fa-github"></span>'
					+ '</a>'
				+ '</li>';
		}

		if (speaker.website !== '') {
			speakersHtml += '<li>'
					+ '<a target="_blank" href="' + speaker.website + '">'
						+ '<span class="fa fa-link"></span>'
					+ '</a>'
				+ '</li>';
		}

		if (speaker.book !== '') {
			speakersHtml += '<li>'
					+ '<a target="_blank" href="' + speaker.book + '">'
						+ '<span class="fa fa-book"></span>'
					+ '</a>'
				+ '</li>';
		}

		speakersHtml += '</ul>'
				+ '</div>'
			+ '</div>';

		if ((i+1) % 3 === 0) {
			speakersHtml += '<div class="clearfix"></div>';
		}
	}
	
	return speakersHtml;
}

function getView (model) {
	let speakers = model.speakers;
	
	$('#speakerContainer').html(generateSpeakersHtml(speakers));
}

function initSpeakers () {
	$.getJSON('./datas/speakers.js')
		.then(getView);
}

$(document).ready(initSpeakers);
