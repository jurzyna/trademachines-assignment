// set main global variables
var trademachines;
var elem = {};
var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

(function(){
	'use strict';

	// global object used to initialize functions
	trademachines = {
		// set global DOM elements and global variables

		initDom: function () {	
			elem.postList = document.querySelector('.post-list');
			elem.headerSearch = document.querySelector('.header-search-field');
			elem.ajaxFireCount = 0;
			elem.tagList;
			elem.postImageList;
		},
		// here we can put all the events
	    events: function () {
	    	// search event
	    	elem.headerSearch.onkeyup = ajaxSearch;
	    	function ajaxSearch(e) {
	    		var searchVal = e.target.value;
	    		trademachines.loadAJAX(searchVal);
	    	}
	    },
	    loadAJAX: function(searchVal = false){
	    	
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
				} else{
					console.log('Server returned an error');
				}
				
			};
			// when nothing returns
			ourRequest.onerror = function(){
				console.log('AJAX failed');
			}

			// senging the request
			ourRequest.send();
	    },
	    renderList: function(data, searchVal= false){
	    	// preparing the regexpression for the input fields
	    	var searchExp = new RegExp(searchVal, '');
	    	// output variables will be used to print HTML into the List
	    	var output = "";
	    	// setting up flags to prevent the 2 list (tags abd images) from beeing recreated on every renderList call
	    	if(elem.ajaxFireCount == 0){
	    		elem.tagList = trademachines.getRandomNounList(data.length);
	    		elem.postImageList = trademachines.getRandomImages(data.length);
	    	}
	    	elem.ajaxFireCount ++;
	    	// adding short names for our tags abd image lists
	    	var randomNames = elem.tagList;
	    	var randomImages = elem.postImageList;

	    	// looping through our returned ajax data object
	    	for (var post in data) {
	    		var postData = data[post];
	    		var tagItem = randomNames['item' + post];

	    		// filtering the list
	    		if ((postData.title.search(searchExp) != -1) || (searchVal == false)){
		    		output += '<li class="media post-list-item">';
		    		output += '<div class="media-body">';
		    		output += `<h5>${postData.title}</h5>`;
		    		output += `<ul class="nav tag-list">`;
		    		for (var i = 0; tagItem.length > i; i++){
		    			output += `<li class="nav-item tag-list-item"><a class="nav-link active" href="#"><i class="icon-tag"></i>${tagItem[i]}</a></li>`;
		    		}
		    		output += '</ul>';
		    		output += `<p>${postData.body}</p>`;
		    		output += '<div class="post-list-action"><a href="#" class="btn btn-primary">Call to Action</a></div>';
		    		output += '</div>';
		    		output += `<div class="post-list-image"><img class="img-fluid" src="${randomImages[post]}" alt="Generic placeholder image"></div>`;
		    		output += '<li>';
		    	}
	    	}
	    	// printing the output into DOM
			elem.postList.innerHTML = output;

	    },

	    // function used for getting a random number in a specified range
	    getRandomInt: function(min, max) {
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		// generating the Tag list
		getRandomNounList: function(arrayLength = 5) {
		 	var nouns = ['women', 'men', 'children', 'teeth', 'feet', 'people', 'leaves', 'mice', 'geese', 'halves', 'knives', 'wives', 'lives', 'elves', 'loaves', 'potatoes', 'tomatoes', 'cacti', 'foci', 'fungi', 'nuclei', 'syllabuses', 'analyses', 'diagnoses', 'oases', 'theses', 'crises', 'phenomena', 'criteria', 'data'];
		 	var list = [];
		 	var listObj = {};
		 	function randomNoun(){
				return nouns[Math.floor(Math.random() * nouns.length)];
			}
			for ( var i = 0; arrayLength > i; i++){
				var nameList = [];
				for ( var ii = 0; trademachines.getRandomInt(1, 3) > ii; ii++){
					nameList.push(randomNoun());
				}

				listObj['item' + i] = nameList;
			}
			return listObj;
		},

		//generating the image list
		getRandomImages: function(arrayLength = 5) {
			var images = [];

			for (var i = 0; arrayLength > i; i++){
				images.push(`https://unsplash.it/200/200?image=${trademachines.getRandomInt(800, 900)}`);
			}
			return images
		}
	};

	// Loading function on DOM Ready
	domReady(function() {
		trademachines.initDom();
	    trademachines.events();
	    trademachines.loadAJAX();
	});
})(document);
