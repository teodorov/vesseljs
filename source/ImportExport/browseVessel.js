//@EliasHasle

//Depends on Vessel and the other core classes.

/*
Handy function for letting the user load a ship design from a local file. (Based on Elias Hasles browseFile function.)

Typical usage:
<a onclick="browseVessel(useVessel)">Click here</a>
where useVessel takes the loaded ship design as a parameter adn does something with it.

According to the ECMAScript standard, it is required that the file browsing is initiated by the user. Google Chrome seems to handle indirect initiation very well, such as having this function in a click handler.
*/

"use strict";
var browseVessel = function() {
	var browseButton;
	return function (callback) {
		browseButton = document.createElement("input");
		Object.assign(browseButton, {
			type: "file",
			multiple: false,
			style: "display: none",
			accept: ".json, application/json",
			onchange: function(e) {
				//console.log("Change event triggered on browse.");
				let file = browseButton.files[0];
				let reader = new FileReader();
				reader.onload = function(event) {
					let result = event.target.result;
					let specification = JSON.parse(result);
					let vessel = new Vessel(specification);
					callback(vessel);
				}
				reader.readAsText(file);
			}
		});
		browseButton.click();
	};
}();