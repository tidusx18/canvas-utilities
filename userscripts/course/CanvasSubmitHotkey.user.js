// ==UserScript==
// @name         Canvas Submit/Save Hotkey (Ctrl + s)
// @namespace    https://github.com/redice44
// @version      0.0.1
// @author       Daniel Vicotirano <victoriano518@gmail.com>
// @description  Overrides browser default action for "Ctrl + s" hotkey to submit/save the current form/page.
// @match        https://[YOUR-URL]/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	function submitPage(e) {
		var selectors = [
			'button[type="submit"]', // General 'Save' buttons
			'\.button_type_submit', // Module Item Edit
			'\.add_item_button', // Add Module Item
			'\.create_assignment', // Edit Assignment Item
			'\.submit' // Pages
		];

		if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
			for(let selector of selectors) {
				let selected = document.querySelector(selector);
				if(selected) {
					// console.log(selected);
					selected.click();
				} else {
					console.log('No matching Submit button found.');
				}
			}
		}
	}

	document.addEventListener("KeyDown", function(event) {
		submitPage(event);
	}, false);

	window.addEventListener('load', function(event) {
		if(tinymce) {
			tinymce.on('AddEditor', function(e) {
				console.log('TinyMCE Editor Added with ID: ', e.editor.id);
				// Set listenser on editor
				e.editor.on('keydown', function(event) {
					submitPage(event);
				});
			});
		}
	});
})();