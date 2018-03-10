// Global variables----------------------------------------------------------
var
	textBox = document.getElementById('textBox'),
	resultsPanel = document.getElementById('resultsPanel');


// Event handlers------------------------------------------------------------

textBox.addEventListener('input', function() {
	let input = this.value.trim();
	
	if(input.length > 0)
	{
		let user = null;
		resultsPanel.innerHTML = '';
		
		$.ajax({
			url: 'https://api.github.com/users/' + input,
			data: {
				client_id: 'ad6b78c61d1707f68319',
				client_secret: '23b42ef8f03b8b78288ae50dc70910ecde3b7b73'
			},
			error: function() {
				let div = document.createElement('div');
				let h3 = document.createElement('h3');
				h3.innerHTML = `The user ${input} doesn't exist!`;
				div.appendChild(h3);
				resultsPanel.appendChild(div);
			}
		}).done(function(user) {
				console.log(user);
		});

	}
});