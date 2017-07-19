//confirm js and html are correctly linked by console.log("linked")
console.log("linked");

//console.log("document ready") when document ready
$(document).ready(function() {
	console.log("document ready");
	runWhenReady();
});

function runWhenReady() {
	var catList = $("#cats");
	updateList();
	
	function updateList() {
		var ajax = $.get("https://ga-cat-rescue.herokuapp.com/api/cats")
			.done(function(data) {
				console.log(data);
				var parsedCats = JSON.parse(data);
				console.log(parsedCats);
				for(var c=0; c<parsedCats.length; c++) {
					var catsForFreeNth = $("<li>"+parsedCats[c].name+" - "+parsedCats[c].note+"</li>");
					catsForFreeNth.innerHTML = parsedCats[c].name+" - "+parsedCats[c].note;
					console.log(catsForFreeNth.innerHTML);
					catsForFreeNth.appendTo(catList);
				}
			});
	}		

	$("form").on("submit", function(event) {
		var catNameInput = $("#cat-name");
		var catNoteInput = $("#cat-note");
		var usersCatName = catNameInput.val();
		var usersCatNote = catNoteInput.val();
		var newCat = {
			name: usersCatName,
			note: usersCatNote
		};
		var stringifiedCat = JSON.stringify(newCat);
		$.post("https://ga-cat-rescue.herokuapp.com/api/cats",
		stringifiedCat,
		function(data, status) {
			console.log("Data: " + data + "\nStatus: " + status);
			catList.empty();
			updateList();
		});
		event.preventDefault();
	});
}





