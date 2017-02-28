"use strict";

// set main global variables
var trademachines;
var elem = {};
var domReady = function domReady(callback) {
	document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

(function () {
	'use strict';

	// global object used to initialize functions

	trademachines = {
		// set global DOM elements and global variables

		initDom: function initDom() {
			elem.postList = document.querySelector('.post-list');
			elem.headerSearch = document.querySelector('.header-search-field');
			elem.ajaxFireCount = 0;
			elem.tagList;
			elem.postImageList;
		},
		// here we can put all the events
		events: function events() {
			// search event
			elem.headerSearch.onkeyup = ajaxSearch;
			function ajaxSearch(e) {
				var searchVal = e.target.value;
				trademachines.loadAJAX(searchVal);
			}
		},
		loadAJAX: function loadAJAX() {
			var searchVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


			// Create a connection by using built in tool XMLHttpRequest
			var ourRequest = new XMLHttpRequest();

			// Set up a connection either GET or POST
			ourRequest.open('GET', 'https://jsonplaceholder.typicode.com/posts');

			// when something returs
			ourRequest.onload = function () {
				// checking id the ajax response what successgull
				if (ourRequest.readyState == 4 && ourRequest.status == 200) {
					// Tell the browser what kind of data it should expect and how to interpret it
					var ourData = JSON.parse(ourRequest.responseText);
					// running the render function, passing the data and the value
					trademachines.renderList(ourData, searchVal);
				} else {
					console.log('Server returned an error');
				}
			};
			// when nothing returns
			ourRequest.onerror = function () {
				console.log('AJAX failed');
			};

			// senging the request
			ourRequest.send();
		},
		renderList: function renderList(data) {
			var searchVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			// preparing the regexpression for the input fields
			var searchExp = new RegExp(searchVal, '');
			// output variables will be used to print HTML into the List
			var output = "";
			// setting up flags to prevent the 2 list (tags abd images) from beeing recreated on every renderList call
			if (elem.ajaxFireCount == 0) {
				elem.tagList = trademachines.getRandomNounList(data.length);
				elem.postImageList = trademachines.getRandomImages(data.length);
			}
			elem.ajaxFireCount++;
			// adding short names for our tags abd image lists
			var randomNames = elem.tagList;
			var randomImages = elem.postImageList;

			// looping through our returned ajax data object
			for (var post in data) {
				var postData = data[post];
				var tagItem = randomNames['item' + post];

				// filtering the list
				if (postData.title.search(searchExp) != -1 || searchVal == false) {
					output += '<li class="media post-list-item">';
					output += '<div class="media-body">';
					output += "<h5>" + postData.title + "</h5>";
					output += "<ul class=\"nav tag-list\">";
					for (var i = 0; tagItem.length > i; i++) {
						output += "<li class=\"nav-item tag-list-item\"><a class=\"nav-link active\" href=\"#\"><i class=\"icon-tag\"></i>" + tagItem[i] + "</a></li>";
					}
					output += '</ul>';
					output += "<p>" + postData.body + "</p>";
					output += '<div class="post-list-action"><a href="#" class="btn btn-primary">Call to Action</a></div>';
					output += '</div>';
					output += "<div class=\"post-list-image\"><img class=\"img-fluid\" src=\"" + randomImages[post] + "\" alt=\"Generic placeholder image\"></div>";
					output += '<li>';
				}
			}
			// printing the output into DOM
			elem.postList.innerHTML = output;
		},

		// function used for getting a random number in a specified range
		getRandomInt: function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		// generating the Tag list
		getRandomNounList: function getRandomNounList() {
			var arrayLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

			var nouns = ['women', 'men', 'children', 'teeth', 'feet', 'people', 'leaves', 'mice', 'geese', 'halves', 'knives', 'wives', 'lives', 'elves', 'loaves', 'potatoes', 'tomatoes', 'cacti', 'foci', 'fungi', 'nuclei', 'syllabuses', 'analyses', 'diagnoses', 'oases', 'theses', 'crises', 'phenomena', 'criteria', 'data'];
			var list = [];
			var listObj = {};
			function randomNoun() {
				return nouns[Math.floor(Math.random() * nouns.length)];
			}
			for (var i = 0; arrayLength > i; i++) {
				var nameList = [];
				for (var ii = 0; trademachines.getRandomInt(1, 3) > ii; ii++) {
					nameList.push(randomNoun());
				}

				listObj['item' + i] = nameList;
			}
			return listObj;
		},

		//generating the image list
		getRandomImages: function getRandomImages() {
			var arrayLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

			var images = [];

			for (var i = 0; arrayLength > i; i++) {
				images.push("https://unsplash.it/200/200?image=" + trademachines.getRandomInt(800, 900));
			}
			return images;
		}
	};

	// Loading function on DOM Ready
	domReady(function () {
		trademachines.initDom();
		trademachines.events();
		trademachines.loadAJAX();
	});
})(document);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJ0cmFkZW1hY2hpbmVzIiwiZWxlbSIsImRvbVJlYWR5IiwiY2FsbGJhY2siLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdERvbSIsInBvc3RMaXN0IiwicXVlcnlTZWxlY3RvciIsImhlYWRlclNlYXJjaCIsImFqYXhGaXJlQ291bnQiLCJ0YWdMaXN0IiwicG9zdEltYWdlTGlzdCIsImV2ZW50cyIsIm9ua2V5dXAiLCJhamF4U2VhcmNoIiwiZSIsInNlYXJjaFZhbCIsInRhcmdldCIsInZhbHVlIiwibG9hZEFKQVgiLCJvdXJSZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwib3VyRGF0YSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsInJlbmRlckxpc3QiLCJjb25zb2xlIiwibG9nIiwib25lcnJvciIsInNlbmQiLCJkYXRhIiwic2VhcmNoRXhwIiwiUmVnRXhwIiwib3V0cHV0IiwiZ2V0UmFuZG9tTm91bkxpc3QiLCJsZW5ndGgiLCJnZXRSYW5kb21JbWFnZXMiLCJyYW5kb21OYW1lcyIsInJhbmRvbUltYWdlcyIsInBvc3QiLCJwb3N0RGF0YSIsInRhZ0l0ZW0iLCJ0aXRsZSIsInNlYXJjaCIsImkiLCJib2R5IiwiaW5uZXJIVE1MIiwiZ2V0UmFuZG9tSW50IiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYXJyYXlMZW5ndGgiLCJub3VucyIsImxpc3QiLCJsaXN0T2JqIiwicmFuZG9tTm91biIsIm5hbWVMaXN0IiwiaWkiLCJwdXNoIiwiaW1hZ2VzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSUEsYUFBSjtBQUNBLElBQUlDLE9BQU8sRUFBWDtBQUNBLElBQUlDLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxRQUFULEVBQW1CO0FBQzlCQyxVQUFTQyxVQUFULEtBQXdCLGFBQXhCLElBQXlDRCxTQUFT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ckIsV0FBT0gsTUFBTUosS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWdCRSxNQUFNbkIsTUFBakMsQ0FBTixDQUFQO0FBQ0E7QUFDRCxRQUFNLElBQUlTLElBQUksQ0FBZCxFQUFpQlMsY0FBY1QsQ0FBL0IsRUFBa0NBLEdBQWxDLEVBQXNDO0FBQ3JDLFFBQUljLFdBQVcsRUFBZjtBQUNBLFNBQU0sSUFBSUMsS0FBSyxDQUFmLEVBQWtCakUsY0FBY3FELFlBQWQsQ0FBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsSUFBbUNZLEVBQXJELEVBQXlEQSxJQUF6RCxFQUE4RDtBQUM3REQsY0FBU0UsSUFBVCxDQUFjSCxZQUFkO0FBQ0E7O0FBRURELFlBQVEsU0FBU1osQ0FBakIsSUFBc0JjLFFBQXRCO0FBQ0E7QUFDRCxVQUFPRixPQUFQO0FBQ0EsR0FoSGM7O0FBa0hmO0FBQ0FwQixtQkFBaUIsMkJBQTBCO0FBQUEsT0FBakJpQixXQUFpQix1RUFBSCxDQUFHOztBQUMxQyxPQUFJUSxTQUFTLEVBQWI7O0FBRUEsUUFBSyxJQUFJakIsSUFBSSxDQUFiLEVBQWdCUyxjQUFjVCxDQUE5QixFQUFpQ0EsR0FBakMsRUFBcUM7QUFDcENpQixXQUFPRCxJQUFQLHdDQUFpRGxFLGNBQWNxRCxZQUFkLENBQTJCLEdBQTNCLEVBQWdDLEdBQWhDLENBQWpEO0FBQ0E7QUFDRCxVQUFPYyxNQUFQO0FBQ0E7QUExSGMsRUFBaEI7O0FBNkhBO0FBQ0FqRSxVQUFTLFlBQVc7QUFDbkJGLGdCQUFjTyxPQUFkO0FBQ0dQLGdCQUFjYyxNQUFkO0FBQ0FkLGdCQUFjcUIsUUFBZDtBQUNILEVBSkQ7QUFLQSxDQXZJRCxFQXVJR2pCLFFBdklIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNldCBtYWluIGdsb2JhbCB2YXJpYWJsZXNcbnZhciB0cmFkZW1hY2hpbmVzO1xudmFyIGVsZW0gPSB7fTtcbnZhciBkb21SZWFkeSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiA/IGNhbGxiYWNrKCkgOiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBjYWxsYmFjayk7XG59O1xuXG4oZnVuY3Rpb24oKXtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vIGdsb2JhbCBvYmplY3QgdXNlZCB0byBpbml0aWFsaXplIGZ1bmN0aW9uc1xuXHR0cmFkZW1hY2hpbmVzID0ge1xuXHRcdC8vIHNldCBnbG9iYWwgRE9NIGVsZW1lbnRzIGFuZCBnbG9iYWwgdmFyaWFibGVzXG5cblx0XHRpbml0RG9tOiBmdW5jdGlvbiAoKSB7XHRcblx0XHRcdGVsZW0ucG9zdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC1saXN0Jyk7XG5cdFx0XHRlbGVtLmhlYWRlclNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItc2VhcmNoLWZpZWxkJyk7XG5cdFx0XHRlbGVtLmFqYXhGaXJlQ291bnQgPSAwO1xuXHRcdFx0ZWxlbS50YWdMaXN0O1xuXHRcdFx0ZWxlbS5wb3N0SW1hZ2VMaXN0O1xuXHRcdH0sXG5cdFx0Ly8gaGVyZSB3ZSBjYW4gcHV0IGFsbCB0aGUgZXZlbnRzXG5cdCAgICBldmVudHM6IGZ1bmN0aW9uICgpIHtcblx0ICAgIFx0Ly8gc2VhcmNoIGV2ZW50XG5cdCAgICBcdGVsZW0uaGVhZGVyU2VhcmNoLm9ua2V5dXAgPSBhamF4U2VhcmNoO1xuXHQgICAgXHRmdW5jdGlvbiBhamF4U2VhcmNoKGUpIHtcblx0ICAgIFx0XHR2YXIgc2VhcmNoVmFsID0gZS50YXJnZXQudmFsdWU7XG5cdCAgICBcdFx0dHJhZGVtYWNoaW5lcy5sb2FkQUpBWChzZWFyY2hWYWwpO1xuXHQgICAgXHR9XG5cdCAgICB9LFxuXHQgICAgbG9hZEFKQVg6IGZ1bmN0aW9uKHNlYXJjaFZhbCA9IGZhbHNlKXtcblx0ICAgIFx0XG5cdCAgICBcdC8vIENyZWF0ZSBhIGNvbm5lY3Rpb24gYnkgdXNpbmcgYnVpbHQgaW4gdG9vbCBYTUxIdHRwUmVxdWVzdFxuXHRcdFx0dmFyIG91clJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHQgICAgXHQvLyBTZXQgdXAgYSBjb25uZWN0aW9uIGVpdGhlciBHRVQgb3IgUE9TVFxuXHRcdFx0b3VyUmVxdWVzdC5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzJyk7XG5cblx0XHRcdC8vIHdoZW4gc29tZXRoaW5nIHJldHVyc1xuXHRcdFx0b3VyUmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIGNoZWNraW5nIGlkIHRoZSBhamF4IHJlc3BvbnNlIHdoYXQgc3VjY2Vzc2d1bGxcblx0XHRcdFx0aWYgKG91clJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIG91clJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdC8vIFRlbGwgdGhlIGJyb3dzZXIgd2hhdCBraW5kIG9mIGRhdGEgaXQgc2hvdWxkIGV4cGVjdCBhbmQgaG93IHRvIGludGVycHJldCBpdFxuXHRcdFx0XHRcdHZhciBvdXJEYXRhID0gSlNPTi5wYXJzZShvdXJSZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0Ly8gcnVubmluZyB0aGUgcmVuZGVyIGZ1bmN0aW9uLCBwYXNzaW5nIHRoZSBkYXRhIGFuZCB0aGUgdmFsdWVcblx0XHRcdFx0XHR0cmFkZW1hY2hpbmVzLnJlbmRlckxpc3Qob3VyRGF0YSwgc2VhcmNoVmFsKTtcblx0XHRcdFx0fSBlbHNle1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZXJ2ZXIgcmV0dXJuZWQgYW4gZXJyb3InKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH07XG5cdFx0XHQvLyB3aGVuIG5vdGhpbmcgcmV0dXJuc1xuXHRcdFx0b3VyUmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ0FKQVggZmFpbGVkJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNlbmdpbmcgdGhlIHJlcXVlc3Rcblx0XHRcdG91clJlcXVlc3Quc2VuZCgpO1xuXHQgICAgfSxcblx0ICAgIHJlbmRlckxpc3Q6IGZ1bmN0aW9uKGRhdGEsIHNlYXJjaFZhbD0gZmFsc2Upe1xuXHQgICAgXHQvLyBwcmVwYXJpbmcgdGhlIHJlZ2V4cHJlc3Npb24gZm9yIHRoZSBpbnB1dCBmaWVsZHNcblx0ICAgIFx0dmFyIHNlYXJjaEV4cCA9IG5ldyBSZWdFeHAoc2VhcmNoVmFsLCAnJyk7XG5cdCAgICBcdC8vIG91dHB1dCB2YXJpYWJsZXMgd2lsbCBiZSB1c2VkIHRvIHByaW50IEhUTUwgaW50byB0aGUgTGlzdFxuXHQgICAgXHR2YXIgb3V0cHV0ID0gXCJcIjtcblx0ICAgIFx0Ly8gc2V0dGluZyB1cCBmbGFncyB0byBwcmV2ZW50IHRoZSAyIGxpc3QgKHRhZ3MgYWJkIGltYWdlcykgZnJvbSBiZWVpbmcgcmVjcmVhdGVkIG9uIGV2ZXJ5IHJlbmRlckxpc3QgY2FsbFxuXHQgICAgXHRpZihlbGVtLmFqYXhGaXJlQ291bnQgPT0gMCl7XG5cdCAgICBcdFx0ZWxlbS50YWdMaXN0ID0gdHJhZGVtYWNoaW5lcy5nZXRSYW5kb21Ob3VuTGlzdChkYXRhLmxlbmd0aCk7XG5cdCAgICBcdFx0ZWxlbS5wb3N0SW1hZ2VMaXN0ID0gdHJhZGVtYWNoaW5lcy5nZXRSYW5kb21JbWFnZXMoZGF0YS5sZW5ndGgpO1xuXHQgICAgXHR9XG5cdCAgICBcdGVsZW0uYWpheEZpcmVDb3VudCArKztcblx0ICAgIFx0Ly8gYWRkaW5nIHNob3J0IG5hbWVzIGZvciBvdXIgdGFncyBhYmQgaW1hZ2UgbGlzdHNcblx0ICAgIFx0dmFyIHJhbmRvbU5hbWVzID0gZWxlbS50YWdMaXN0O1xuXHQgICAgXHR2YXIgcmFuZG9tSW1hZ2VzID0gZWxlbS5wb3N0SW1hZ2VMaXN0O1xuXG5cdCAgICBcdC8vIGxvb3BpbmcgdGhyb3VnaCBvdXIgcmV0dXJuZWQgYWpheCBkYXRhIG9iamVjdFxuXHQgICAgXHRmb3IgKHZhciBwb3N0IGluIGRhdGEpIHtcblx0ICAgIFx0XHR2YXIgcG9zdERhdGEgPSBkYXRhW3Bvc3RdO1xuXHQgICAgXHRcdHZhciB0YWdJdGVtID0gcmFuZG9tTmFtZXNbJ2l0ZW0nICsgcG9zdF07XG5cblx0ICAgIFx0XHQvLyBmaWx0ZXJpbmcgdGhlIGxpc3Rcblx0ICAgIFx0XHRpZiAoKHBvc3REYXRhLnRpdGxlLnNlYXJjaChzZWFyY2hFeHApICE9IC0xKSB8fCAoc2VhcmNoVmFsID09IGZhbHNlKSl7XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gJzxsaSBjbGFzcz1cIm1lZGlhIHBvc3QtbGlzdC1pdGVtXCI+Jztcblx0XHQgICAgXHRcdG91dHB1dCArPSAnPGRpdiBjbGFzcz1cIm1lZGlhLWJvZHlcIj4nO1xuXHRcdCAgICBcdFx0b3V0cHV0ICs9IGA8aDU+JHtwb3N0RGF0YS50aXRsZX08L2g1PmA7XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gYDx1bCBjbGFzcz1cIm5hdiB0YWctbGlzdFwiPmA7XG5cdFx0ICAgIFx0XHRmb3IgKHZhciBpID0gMDsgdGFnSXRlbS5sZW5ndGggPiBpOyBpKyspe1xuXHRcdCAgICBcdFx0XHRvdXRwdXQgKz0gYDxsaSBjbGFzcz1cIm5hdi1pdGVtIHRhZy1saXN0LWl0ZW1cIj48YSBjbGFzcz1cIm5hdi1saW5rIGFjdGl2ZVwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJpY29uLXRhZ1wiPjwvaT4ke3RhZ0l0ZW1baV19PC9hPjwvbGk+YDtcblx0XHQgICAgXHRcdH1cblx0XHQgICAgXHRcdG91dHB1dCArPSAnPC91bD4nO1xuXHRcdCAgICBcdFx0b3V0cHV0ICs9IGA8cD4ke3Bvc3REYXRhLmJvZHl9PC9wPmA7XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gJzxkaXYgY2xhc3M9XCJwb3N0LWxpc3QtYWN0aW9uXCI+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPkNhbGwgdG8gQWN0aW9uPC9hPjwvZGl2Pic7XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gJzwvZGl2Pic7XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gYDxkaXYgY2xhc3M9XCJwb3N0LWxpc3QtaW1hZ2VcIj48aW1nIGNsYXNzPVwiaW1nLWZsdWlkXCIgc3JjPVwiJHtyYW5kb21JbWFnZXNbcG9zdF19XCIgYWx0PVwiR2VuZXJpYyBwbGFjZWhvbGRlciBpbWFnZVwiPjwvZGl2PmA7XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gJzxsaT4nO1xuXHRcdCAgICBcdH1cblx0ICAgIFx0fVxuXHQgICAgXHQvLyBwcmludGluZyB0aGUgb3V0cHV0IGludG8gRE9NXG5cdFx0XHRlbGVtLnBvc3RMaXN0LmlubmVySFRNTCA9IG91dHB1dDtcblxuXHQgICAgfSxcblxuXHQgICAgLy8gZnVuY3Rpb24gdXNlZCBmb3IgZ2V0dGluZyBhIHJhbmRvbSBudW1iZXIgaW4gYSBzcGVjaWZpZWQgcmFuZ2Vcblx0ICAgIGdldFJhbmRvbUludDogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0XHQgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuXHRcdH0sXG5cblx0XHQvLyBnZW5lcmF0aW5nIHRoZSBUYWcgbGlzdFxuXHRcdGdldFJhbmRvbU5vdW5MaXN0OiBmdW5jdGlvbihhcnJheUxlbmd0aCA9IDUpIHtcblx0XHQgXHR2YXIgbm91bnMgPSBbJ3dvbWVuJywgJ21lbicsICdjaGlsZHJlbicsICd0ZWV0aCcsICdmZWV0JywgJ3Blb3BsZScsICdsZWF2ZXMnLCAnbWljZScsICdnZWVzZScsICdoYWx2ZXMnLCAna25pdmVzJywgJ3dpdmVzJywgJ2xpdmVzJywgJ2VsdmVzJywgJ2xvYXZlcycsICdwb3RhdG9lcycsICd0b21hdG9lcycsICdjYWN0aScsICdmb2NpJywgJ2Z1bmdpJywgJ251Y2xlaScsICdzeWxsYWJ1c2VzJywgJ2FuYWx5c2VzJywgJ2RpYWdub3NlcycsICdvYXNlcycsICd0aGVzZXMnLCAnY3Jpc2VzJywgJ3BoZW5vbWVuYScsICdjcml0ZXJpYScsICdkYXRhJ107XG5cdFx0IFx0dmFyIGxpc3QgPSBbXTtcblx0XHQgXHR2YXIgbGlzdE9iaiA9IHt9O1xuXHRcdCBcdGZ1bmN0aW9uIHJhbmRvbU5vdW4oKXtcblx0XHRcdFx0cmV0dXJuIG5vdW5zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5vdW5zLmxlbmd0aCldO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBhcnJheUxlbmd0aCA+IGk7IGkrKyl7XG5cdFx0XHRcdHZhciBuYW1lTGlzdCA9IFtdO1xuXHRcdFx0XHRmb3IgKCB2YXIgaWkgPSAwOyB0cmFkZW1hY2hpbmVzLmdldFJhbmRvbUludCgxLCAzKSA+IGlpOyBpaSsrKXtcblx0XHRcdFx0XHRuYW1lTGlzdC5wdXNoKHJhbmRvbU5vdW4oKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsaXN0T2JqWydpdGVtJyArIGldID0gbmFtZUxpc3Q7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbGlzdE9iajtcblx0XHR9LFxuXG5cdFx0Ly9nZW5lcmF0aW5nIHRoZSBpbWFnZSBsaXN0XG5cdFx0Z2V0UmFuZG9tSW1hZ2VzOiBmdW5jdGlvbihhcnJheUxlbmd0aCA9IDUpIHtcblx0XHRcdHZhciBpbWFnZXMgPSBbXTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGFycmF5TGVuZ3RoID4gaTsgaSsrKXtcblx0XHRcdFx0aW1hZ2VzLnB1c2goYGh0dHBzOi8vdW5zcGxhc2guaXQvMjAwLzIwMD9pbWFnZT0ke3RyYWRlbWFjaGluZXMuZ2V0UmFuZG9tSW50KDgwMCwgOTAwKX1gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBpbWFnZXNcblx0XHR9XG5cdH07XG5cblx0Ly8gTG9hZGluZyBmdW5jdGlvbiBvbiBET00gUmVhZHlcblx0ZG9tUmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0dHJhZGVtYWNoaW5lcy5pbml0RG9tKCk7XG5cdCAgICB0cmFkZW1hY2hpbmVzLmV2ZW50cygpO1xuXHQgICAgdHJhZGVtYWNoaW5lcy5sb2FkQUpBWCgpO1xuXHR9KTtcbn0pKGRvY3VtZW50KTtcbiJdfQ==
