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
			elem.viewSwitchGrid = document.querySelector('.js-switch-grid');
			elem.viewSwitchList = document.querySelector('.js-switch-list');
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

			elem.viewSwitchGrid.addEventListener('click', function (e) {
				if (!elem.postList.classList.contains('grid-view')) {
					elem.postList.classList.add('grid-view');
				}
				elem.postList.classList.remove('list-view');
			});
			elem.viewSwitchList.addEventListener('click', function (e) {
				if (!elem.postList.classList.contains('list-view')) {
					elem.postList.classList.add('list-view');
				}
				elem.postList.classList.remove('grid-view');
			});
			function switchListView(e) {}
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
					output += '<li class="ccol-xs-6 col-sm-4 col-lg-4 media post-list-item">';
					output += "<div class=\"post-list-image\"><img class=\"img-fluid\" src=\"" + randomImages[post] + "\" alt=\"Generic placeholder image\"></div>";
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
				images.push("https://unsplash.it/300/300?image=" + trademachines.getRandomInt(800, 900));
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
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJ0cmFkZW1hY2hpbmVzIiwiZWxlbSIsImRvbVJlYWR5IiwiY2FsbGJhY2siLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdERvbSIsInBvc3RMaXN0IiwicXVlcnlTZWxlY3RvciIsImhlYWRlclNlYXJjaCIsInZpZXdTd2l0Y2hHcmlkIiwidmlld1N3aXRjaExpc3QiLCJhamF4RmlyZUNvdW50IiwidGFnTGlzdCIsInBvc3RJbWFnZUxpc3QiLCJldmVudHMiLCJvbmtleXVwIiwiYWpheFNlYXJjaCIsImUiLCJzZWFyY2hWYWwiLCJ0YXJnZXQiLCJ2YWx1ZSIsImxvYWRBSkFYIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGQiLCJyZW1vdmUiLCJzd2l0Y2hMaXN0VmlldyIsIm91clJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJvbmxvYWQiLCJzdGF0dXMiLCJvdXJEYXRhIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwicmVuZGVyTGlzdCIsImNvbnNvbGUiLCJsb2ciLCJvbmVycm9yIiwic2VuZCIsImRhdGEiLCJzZWFyY2hFeHAiLCJSZWdFeHAiLCJvdXRwdXQiLCJnZXRSYW5kb21Ob3VuTGlzdCIsImxlbmd0aCIsImdldFJhbmRvbUltYWdlcyIsInJhbmRvbU5hbWVzIiwicmFuZG9tSW1hZ2VzIiwicG9zdCIsInBvc3REYXRhIiwidGFnSXRlbSIsInRpdGxlIiwic2VhcmNoIiwiaSIsImJvZHkiLCJpbm5lckhUTUwiLCJnZXRSYW5kb21JbnQiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJhcnJheUxlbmd0aCIsIm5vdW5zIiwibGlzdCIsImxpc3RPYmoiLCJyYW5kb21Ob3VuIiwibmFtZUxpc3QiLCJpaSIsInB1c2giLCJpbWFnZXMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFJQSxhQUFKO0FBQ0EsSUFBSUMsT0FBTyxF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LEVBQWtDQSxHQUFsQyxFQUFzQztBQUNyQyxRQUFJYyxXQUFXLEVBQWY7QUFDQSxTQUFNLElBQUlDLEtBQUssQ0FBZixFQUFrQnhFLGNBQWM0RCxZQUFkLENBQTJCLENBQTNCLEVBQThCLENBQTlCLElBQW1DWSxFQUFyRCxFQUF5REEsSUFBekQsRUFBOEQ7QUFDN0RELGNBQVNFLElBQVQsQ0FBY0gsWUFBZDtBQUNBOztBQUVERCxZQUFRLFNBQVNaLENBQWpCLElBQXNCYyxRQUF0QjtBQUNBO0FBQ0QsVUFBT0YsT0FBUDtBQUNBLEdBbEljOztBQW9JZjtBQUNBcEIsbUJBQWlCLDJCQUEwQjtBQUFBLE9BQWpCaUIsV0FBaUIsdUVBQUgsQ0FBRzs7QUFDMUMsT0FBSVEsU0FBUyxFQUFiOztBQUVBLFFBQUssSUFBSWpCLElBQUksQ0FBYixFQUFnQlMsY0FBY1QsQ0FBOUIsRUFBaUNBLEdBQWpDLEVBQXFDO0FBQ3BDaUIsV0FBT0QsSUFBUCx3Q0FBaUR6RSxjQUFjNEQsWUFBZCxDQUEyQixHQUEzQixFQUFnQyxHQUFoQyxDQUFqRDtBQUNBO0FBQ0QsVUFBT2MsTUFBUDtBQUNBO0FBNUljLEVBQWhCOztBQStJQTtBQUNBeEUsVUFBUyxZQUFXO0FBQ25CRixnQkFBY08sT0FBZDtBQUNHUCxnQkFBY2dCLE1BQWQ7QUFDQWhCLGdCQUFjdUIsUUFBZDtBQUNILEVBSkQ7QUFLQSxDQXpKRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXQgbWFpbiBnbG9iYWwgdmFyaWFibGVzXG52YXIgdHJhZGVtYWNoaW5lcztcbnZhciBlbGVtID0ge307XG52YXIgZG9tUmVhZHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiaW50ZXJhY3RpdmVcIiB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgPyBjYWxsYmFjaygpIDogZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY2FsbGJhY2spO1xufTtcblxuKGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly8gZ2xvYmFsIG9iamVjdCB1c2VkIHRvIGluaXRpYWxpemUgZnVuY3Rpb25zXG5cdHRyYWRlbWFjaGluZXMgPSB7XG5cdFx0Ly8gc2V0IGdsb2JhbCBET00gZWxlbWVudHMgYW5kIGdsb2JhbCB2YXJpYWJsZXNcblxuXHRcdGluaXREb206IGZ1bmN0aW9uICgpIHtcdFxuXHRcdFx0ZWxlbS5wb3N0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWxpc3QnKTtcblx0XHRcdGVsZW0uaGVhZGVyU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1zZWFyY2gtZmllbGQnKTtcblx0XHRcdGVsZW0udmlld1N3aXRjaEdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc3dpdGNoLWdyaWQnKTtcblx0XHRcdGVsZW0udmlld1N3aXRjaExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc3dpdGNoLWxpc3QnKTtcblx0XHRcdGVsZW0uYWpheEZpcmVDb3VudCA9IDA7XG5cdFx0XHRlbGVtLnRhZ0xpc3Q7XG5cdFx0XHRlbGVtLnBvc3RJbWFnZUxpc3Q7XG5cdFx0fSxcblx0XHQvLyBoZXJlIHdlIGNhbiBwdXQgYWxsIHRoZSBldmVudHNcblx0ICAgIGV2ZW50czogZnVuY3Rpb24gKCkge1xuXHQgICAgXHQvLyBzZWFyY2ggZXZlbnRcblx0ICAgIFx0ZWxlbS5oZWFkZXJTZWFyY2gub25rZXl1cCA9IGFqYXhTZWFyY2g7XG5cdCAgICBcdGZ1bmN0aW9uIGFqYXhTZWFyY2goZSkge1xuXHQgICAgXHRcdHZhciBzZWFyY2hWYWwgPSBlLnRhcmdldC52YWx1ZTtcblx0ICAgIFx0XHR0cmFkZW1hY2hpbmVzLmxvYWRBSkFYKHNlYXJjaFZhbCk7XG5cdCAgICBcdH1cblxuXHQgICAgXHRlbGVtLnZpZXdTd2l0Y2hHcmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdCAgICBcdFx0aWYoIWVsZW0ucG9zdExpc3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLXZpZXcnKSl7XG5cdCAgICBcdFx0XHRlbGVtLnBvc3RMaXN0LmNsYXNzTGlzdC5hZGQoJ2dyaWQtdmlldycpO1xuXHQgICAgXHRcdH1cblx0ICAgIFx0XHRlbGVtLnBvc3RMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2xpc3QtdmlldycpO1xuXHQgICAgXHR9KTtcblx0ICAgIFx0ZWxlbS52aWV3U3dpdGNoTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHQgICAgXHRcdGlmKCFlbGVtLnBvc3RMaXN0LmNsYXNzTGlzdC5jb250YWlucygnbGlzdC12aWV3Jykpe1xuXHQgICAgXHRcdFx0ZWxlbS5wb3N0TGlzdC5jbGFzc0xpc3QuYWRkKCdsaXN0LXZpZXcnKTtcblx0ICAgIFx0XHR9XG5cdCAgICBcdFx0ZWxlbS5wb3N0TGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLXZpZXcnKTtcblx0ICAgIFx0fSk7XG5cdCAgICBcdGZ1bmN0aW9uIHN3aXRjaExpc3RWaWV3KGUpe1xuXHQgICAgXHRcdFxuXHQgICAgXHR9XG5cdCAgICB9LFxuXHQgICAgbG9hZEFKQVg6IGZ1bmN0aW9uKHNlYXJjaFZhbCA9IGZhbHNlKXtcblx0ICAgIFx0XG5cdCAgICBcdC8vIENyZWF0ZSBhIGNvbm5lY3Rpb24gYnkgdXNpbmcgYnVpbHQgaW4gdG9vbCBYTUxIdHRwUmVxdWVzdFxuXHRcdFx0dmFyIG91clJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHQgICAgXHQvLyBTZXQgdXAgYSBjb25uZWN0aW9uIGVpdGhlciBHRVQgb3IgUE9TVFxuXHRcdFx0b3VyUmVxdWVzdC5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzJyk7XG5cblx0XHRcdC8vIHdoZW4gc29tZXRoaW5nIHJldHVyc1xuXHRcdFx0b3VyUmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIGNoZWNraW5nIGlkIHRoZSBhamF4IHJlc3BvbnNlIHdoYXQgc3VjY2Vzc2d1bGxcblx0XHRcdFx0aWYgKG91clJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIG91clJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdC8vIFRlbGwgdGhlIGJyb3dzZXIgd2hhdCBraW5kIG9mIGRhdGEgaXQgc2hvdWxkIGV4cGVjdCBhbmQgaG93IHRvIGludGVycHJldCBpdFxuXHRcdFx0XHRcdHZhciBvdXJEYXRhID0gSlNPTi5wYXJzZShvdXJSZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0Ly8gcnVubmluZyB0aGUgcmVuZGVyIGZ1bmN0aW9uLCBwYXNzaW5nIHRoZSBkYXRhIGFuZCB0aGUgdmFsdWVcblx0XHRcdFx0XHR0cmFkZW1hY2hpbmVzLnJlbmRlckxpc3Qob3VyRGF0YSwgc2VhcmNoVmFsKTtcblx0XHRcdFx0fSBlbHNle1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZXJ2ZXIgcmV0dXJuZWQgYW4gZXJyb3InKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH07XG5cdFx0XHQvLyB3aGVuIG5vdGhpbmcgcmV0dXJuc1xuXHRcdFx0b3VyUmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ0FKQVggZmFpbGVkJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNlbmdpbmcgdGhlIHJlcXVlc3Rcblx0XHRcdG91clJlcXVlc3Quc2VuZCgpO1xuXHQgICAgfSxcblx0ICAgIHJlbmRlckxpc3Q6IGZ1bmN0aW9uKGRhdGEsIHNlYXJjaFZhbD0gZmFsc2Upe1xuXHQgICAgXHQvLyBwcmVwYXJpbmcgdGhlIHJlZ2V4cHJlc3Npb24gZm9yIHRoZSBpbnB1dCBmaWVsZHNcblx0ICAgIFx0dmFyIHNlYXJjaEV4cCA9IG5ldyBSZWdFeHAoc2VhcmNoVmFsLCAnJyk7XG5cdCAgICBcdC8vIG91dHB1dCB2YXJpYWJsZXMgd2lsbCBiZSB1c2VkIHRvIHByaW50IEhUTUwgaW50byB0aGUgTGlzdFxuXHQgICAgXHR2YXIgb3V0cHV0ID0gXCJcIjtcblx0ICAgIFx0Ly8gc2V0dGluZyB1cCBmbGFncyB0byBwcmV2ZW50IHRoZSAyIGxpc3QgKHRhZ3MgYWJkIGltYWdlcykgZnJvbSBiZWVpbmcgcmVjcmVhdGVkIG9uIGV2ZXJ5IHJlbmRlckxpc3QgY2FsbFxuXHQgICAgXHRpZihlbGVtLmFqYXhGaXJlQ291bnQgPT0gMCl7XG5cdCAgICBcdFx0ZWxlbS50YWdMaXN0ID0gdHJhZGVtYWNoaW5lcy5nZXRSYW5kb21Ob3VuTGlzdChkYXRhLmxlbmd0aCk7XG5cdCAgICBcdFx0ZWxlbS5wb3N0SW1hZ2VMaXN0ID0gdHJhZGVtYWNoaW5lcy5nZXRSYW5kb21JbWFnZXMoZGF0YS5sZW5ndGgpO1xuXHQgICAgXHR9XG5cdCAgICBcdGVsZW0uYWpheEZpcmVDb3VudCArKztcblx0ICAgIFx0Ly8gYWRkaW5nIHNob3J0IG5hbWVzIGZvciBvdXIgdGFncyBhYmQgaW1hZ2UgbGlzdHNcblx0ICAgIFx0dmFyIHJhbmRvbU5hbWVzID0gZWxlbS50YWdMaXN0O1xuXHQgICAgXHR2YXIgcmFuZG9tSW1hZ2VzID0gZWxlbS5wb3N0SW1hZ2VMaXN0O1xuXG5cdCAgICBcdC8vIGxvb3BpbmcgdGhyb3VnaCBvdXIgcmV0dXJuZWQgYWpheCBkYXRhIG9iamVjdFxuXHQgICAgXHRmb3IgKHZhciBwb3N0IGluIGRhdGEpIHtcblx0ICAgIFx0XHR2YXIgcG9zdERhdGEgPSBkYXRhW3Bvc3RdO1xuXHQgICAgXHRcdHZhciB0YWdJdGVtID0gcmFuZG9tTmFtZXNbJ2l0ZW0nICsgcG9zdF07XG5cblx0ICAgIFx0XHQvLyBmaWx0ZXJpbmcgdGhlIGxpc3Rcblx0ICAgIFx0XHRpZiAoKHBvc3REYXRhLnRpdGxlLnNlYXJjaChzZWFyY2hFeHApICE9IC0xKSB8fCAoc2VhcmNoVmFsID09IGZhbHNlKSl7XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gJzxsaSBjbGFzcz1cImNjb2wteHMtNiBjb2wtc20tNCBjb2wtbGctNCBtZWRpYSBwb3N0LWxpc3QtaXRlbVwiPic7XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gYDxkaXYgY2xhc3M9XCJwb3N0LWxpc3QtaW1hZ2VcIj48aW1nIGNsYXNzPVwiaW1nLWZsdWlkXCIgc3JjPVwiJHtyYW5kb21JbWFnZXNbcG9zdF19XCIgYWx0PVwiR2VuZXJpYyBwbGFjZWhvbGRlciBpbWFnZVwiPjwvZGl2PmA7XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gJzxkaXYgY2xhc3M9XCJtZWRpYS1ib2R5XCI+Jztcblx0XHQgICAgXHRcdG91dHB1dCArPSBgPGg1PiR7cG9zdERhdGEudGl0bGV9PC9oNT5gO1xuXHRcdCAgICBcdFx0b3V0cHV0ICs9IGA8dWwgY2xhc3M9XCJuYXYgdGFnLWxpc3RcIj5gO1xuXHRcdCAgICBcdFx0Zm9yICh2YXIgaSA9IDA7IHRhZ0l0ZW0ubGVuZ3RoID4gaTsgaSsrKXtcblx0XHQgICAgXHRcdFx0b3V0cHV0ICs9IGA8bGkgY2xhc3M9XCJuYXYtaXRlbSB0YWctbGlzdC1pdGVtXCI+PGEgY2xhc3M9XCJuYXYtbGluayBhY3RpdmVcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiaWNvbi10YWdcIj48L2k+JHt0YWdJdGVtW2ldfTwvYT48L2xpPmA7XG5cdFx0ICAgIFx0XHR9XG5cdFx0ICAgIFx0XHRvdXRwdXQgKz0gJzwvdWw+Jztcblx0XHQgICAgXHRcdG91dHB1dCArPSBgPHA+JHtwb3N0RGF0YS5ib2R5fTwvcD5gO1xuXHRcdCAgICBcdFx0b3V0cHV0ICs9ICc8ZGl2IGNsYXNzPVwicG9zdC1saXN0LWFjdGlvblwiPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5DYWxsIHRvIEFjdGlvbjwvYT48L2Rpdj4nO1xuXHRcdCAgICBcdFx0b3V0cHV0ICs9ICc8L2Rpdj4nO1xuXHRcdCAgICBcdFx0b3V0cHV0ICs9ICc8bGk+Jztcblx0XHQgICAgXHR9XG5cdCAgICBcdH1cblx0ICAgIFx0Ly8gcHJpbnRpbmcgdGhlIG91dHB1dCBpbnRvIERPTVxuXHRcdFx0ZWxlbS5wb3N0TGlzdC5pbm5lckhUTUwgPSBvdXRwdXQ7XG5cblx0ICAgIH0sXG5cblx0ICAgIC8vIGZ1bmN0aW9uIHVzZWQgZm9yIGdldHRpbmcgYSByYW5kb20gbnVtYmVyIGluIGEgc3BlY2lmaWVkIHJhbmdlXG5cdCAgICBnZXRSYW5kb21JbnQ6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdFx0ICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcblx0XHR9LFxuXG5cdFx0Ly8gZ2VuZXJhdGluZyB0aGUgVGFnIGxpc3Rcblx0XHRnZXRSYW5kb21Ob3VuTGlzdDogZnVuY3Rpb24oYXJyYXlMZW5ndGggPSA1KSB7XG5cdFx0IFx0dmFyIG5vdW5zID0gWyd3b21lbicsICdtZW4nLCAnY2hpbGRyZW4nLCAndGVldGgnLCAnZmVldCcsICdwZW9wbGUnLCAnbGVhdmVzJywgJ21pY2UnLCAnZ2Vlc2UnLCAnaGFsdmVzJywgJ2tuaXZlcycsICd3aXZlcycsICdsaXZlcycsICdlbHZlcycsICdsb2F2ZXMnLCAncG90YXRvZXMnLCAndG9tYXRvZXMnLCAnY2FjdGknLCAnZm9jaScsICdmdW5naScsICdudWNsZWknLCAnc3lsbGFidXNlcycsICdhbmFseXNlcycsICdkaWFnbm9zZXMnLCAnb2FzZXMnLCAndGhlc2VzJywgJ2NyaXNlcycsICdwaGVub21lbmEnLCAnY3JpdGVyaWEnLCAnZGF0YSddO1xuXHRcdCBcdHZhciBsaXN0ID0gW107XG5cdFx0IFx0dmFyIGxpc3RPYmogPSB7fTtcblx0XHQgXHRmdW5jdGlvbiByYW5kb21Ob3VuKCl7XG5cdFx0XHRcdHJldHVybiBub3Vuc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBub3Vucy5sZW5ndGgpXTtcblx0XHRcdH1cblx0XHRcdGZvciAoIHZhciBpID0gMDsgYXJyYXlMZW5ndGggPiBpOyBpKyspe1xuXHRcdFx0XHR2YXIgbmFtZUxpc3QgPSBbXTtcblx0XHRcdFx0Zm9yICggdmFyIGlpID0gMDsgdHJhZGVtYWNoaW5lcy5nZXRSYW5kb21JbnQoMSwgMykgPiBpaTsgaWkrKyl7XG5cdFx0XHRcdFx0bmFtZUxpc3QucHVzaChyYW5kb21Ob3VuKCkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGlzdE9ialsnaXRlbScgKyBpXSA9IG5hbWVMaXN0O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGxpc3RPYmo7XG5cdFx0fSxcblxuXHRcdC8vZ2VuZXJhdGluZyB0aGUgaW1hZ2UgbGlzdFxuXHRcdGdldFJhbmRvbUltYWdlczogZnVuY3Rpb24oYXJyYXlMZW5ndGggPSA1KSB7XG5cdFx0XHR2YXIgaW1hZ2VzID0gW107XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBhcnJheUxlbmd0aCA+IGk7IGkrKyl7XG5cdFx0XHRcdGltYWdlcy5wdXNoKGBodHRwczovL3Vuc3BsYXNoLml0LzMwMC8zMDA/aW1hZ2U9JHt0cmFkZW1hY2hpbmVzLmdldFJhbmRvbUludCg4MDAsIDkwMCl9YCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaW1hZ2VzXG5cdFx0fVxuXHR9O1xuXG5cdC8vIExvYWRpbmcgZnVuY3Rpb24gb24gRE9NIFJlYWR5XG5cdGRvbVJlYWR5KGZ1bmN0aW9uKCkge1xuXHRcdHRyYWRlbWFjaGluZXMuaW5pdERvbSgpO1xuXHQgICAgdHJhZGVtYWNoaW5lcy5ldmVudHMoKTtcblx0ICAgIHRyYWRlbWFjaGluZXMubG9hZEFKQVgoKTtcblx0fSk7XG59KSgpO1xuIl19
