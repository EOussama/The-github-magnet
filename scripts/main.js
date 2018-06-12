$(document).ready(function() {
	const
		$textBox = $('#textBox'),
		$resultsPanel = $('#resultsPanel'),
		$errorPanel = $('#errorPanel'),
		$errorText = $('#errorText'),
		$profilePanel = $('#profilePanel'),
		$spinner = $('div.spinner');
	
	$resultsPanel.hide();
	$errorPanel.hide();

	$textBox.on('input', function() {
		const $input = $(this).val().trim();

		if($input.length > 0)
		{
			let user = null;
			
			$resultsPanel.addClass('loading');
			$spinner.addClass('loading');
			$.ajax({
				url: 'https://api.github.com/users/' + $input,
				data: {
					client_id: 'ad6b78c61d1707f68319',
					client_secret: '23b42ef8f03b8b78288ae50dc70910ecde3b7b73'
				},
				error: function() {
					$resultsPanel.hide();
					$errorPanel.show();

					$errorText.html(`<i class="fas fa-exclamation-triangle"></i> The user <span>${$input}</span> does not exist!`);
					$resultsPanel.removeClass('loading');
					$spinner.removeClass('loading');
				}
			}).done(function(user) {
				$errorPanel.hide();
				$resultsPanel.show();
				
				$profilePanel.html(`
					<div id="profileLeft">
						<img src="${user.avatar_url}" alt="${user.login}'s avatar"><br>
						<a href="${user.html_url}" target="_blank"><button>Profile</button></a>
					</div>
					<div id="profileRight">
						<div class="profileHeader">
							<h2>${user.login}</h2>
							<div id="profileStats">
								<a href="https://github.com/${user.login}?tab=repositories" target="_blank"><span class="badge">Repos ${user.public_repos}</span></a>
								<a href="https://gist.github.com/${user.login}" target="_blank"><span class="badge">Gists ${user.public_gists}</span></a>
								<a href="https://github.com/${user.login}?tab=followers" target="_blank"><span class="badge">Followers ${user.followers}</span></a>
								<a href="https://github.com/${user.login}?tab=following" target="_blank"><span class="badge">Following ${user.following}</span></a>
							</div>
						</div>
						<hr>
						<ul>
							<li><span><i class="fas fa-user"></i>  Name:</span> ${user.name === null ? "Unknown" : user.name}<li>
							<li><span><i class="fas fa-compass"></i>  Location:</span> ` + (user.location === null ? "Unknown" : user.location) + `<li>
							<li><span><i class="fas fa-calendar-alt"></i>  Joined at:</span> ${user.created_at === null ? "Unknown" : user.created_at}<li>
							<li><span><i class="fas fa-building"></i>  Company:</span> ${user.company === null ? "Unknown" : user.company}<li>
							<li><span><i class="fas fa-at"></i>  E-mail:</span> ${user.email === null ? "Unknown" : user.email}<li>
							<li><span><i class="fas fa-info-circle"></i>  Bio:</span> ${user.bio === null ? "Unknown" : user.bio}<li>
						</ul>
					</div>
				`);

				$resultsPanel.removeClass('loading');
				$spinner.removeClass('loading');
			});
		} else {
			$resultsPanel.hide()
			$errorPanel.hide();
		}
	});
});
