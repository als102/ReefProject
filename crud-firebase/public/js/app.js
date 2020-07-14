const firebase = require('firebase');
require('firebase/database');

const firebaseConfig = require('./keys');

firebase.initializeApp(firebaseConfig);

const yelpKey =
	'M26cPdfZHgmyzDL35vMoA21fb7Y245Ga8LYPBrnKU3vsGk3QJ9qyhpW3dbyYO0jLWAkcamllM7_EpyymbO_brn5nOb7ipxNLCBxC0CpzTwiOiIns8q-fzjASbQ0NX3Yx';
const URL =
	'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=10&term=aquarium&location=SanFrancisco';
let h = new Headers();

let req = new Request(URL, {
	headers: { Authorization: `Bearer ${yelpKey}` },
	params: {
		categories: 'local_fish_stores',
	},
});

fetch(req)
	.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			throw new Error('Not working');
		}
	})
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log('Error:', error.message);
	});

//Select the DOM for form select items
// const form = document.querySelector('.reef-form');
// const param = document.getElementById('params');
// console.log(param);
// const submit = document.querySelector('.submit-btn');

// const list = document.querySelector('.tank-list');
// const $clear = $('.clear-btn');
// console.log($clear);
// const search = document.querySelector('#userinput');

// Event listeners submit
// form.addEventListener('submit', addItem);
// // clear button
// //clear.addEventListener('click', clearItems);

// $clear.on('click', function (event) {
// 	event.preventDefault();
// 	const items = document.querySelectorAll('.checklist');
// 	if (items.length > 0) {
// 		items.forEach(function (item) {
// 			list.removeChild(list.childNodes[i]);
// 			//list.removeChild(item);
// 		});
// 	}
// });

// function addItem() {
// 	event.preventDefault();
// 	const value = param.value;
// 	console.log(param.value);
// 	const element = document.createElement('li');
// 	element.classList.add('.checklist');
// 	element.textContent = value;
// 	//console.log(element);
// 	list.appendChild(element);
// 	container.classList.add('show-container');
// 	newSlate();
// }

// function clearItems(event) {
// 	event.preventDefault();
// 	const items = document.querySelectorAll('.checklist');
// 	if (items.length > 0) {
// 		items.forEach(function (item) {
// 			list.removeChild(list.childNodes[i]);
// 			list.removeChild(item);
// 		});
// 	}
// }

// //function to reset the form
// function newSlate() {
// 	param.value = '';
// }

var messageDatabase = firebase.database();
console.log(messageDatabase);

$(`#message-form`).submit((event) => {
	event.preventDefault();

	// user input
	var $message = $('#message').val();
	console.log($message);
	// clear user input
	$('#message').val('');

	// create or refrence a section for message data in our database
	var messageRefrence = messageDatabase.ref('messages');

	// push method to save data to message section
	messageRefrence.push({
		alkalinity: $message,
		param: 9 - 10,
	});
});

function getPost() {
	messageDatabase.ref('messages').on('value', function (results) {
		const allmessages = results.val();
		//console.log(allmessages);

		const messageBoard = document.querySelector('.message-board');
		const messagesArray = [];

		for (let id in allmessages) {
			const message = allmessages[id].alkalinity;
			const param = allmessages[id].param;

			const messageListElment = document.createElement('li');

			//create a delete element

			const deleteElement = document.createElement('i');
			deleteElement.classList.add('fa', 'fa-trash', 'pull-right', 'delete');

			messageListElment.setAttribute('data-id', id);
			messageListElment.textContent = message;
			messageListElment.appendChild(deleteElement);

			messagesArray.push(messageListElment);
		}

		//remove li's to avoid dupes
		// .empty() is a method that removes all of the nodes

		$('.message-board').empty();
		messagesArray.forEach((element) => {
			messageBoard.appendChild(element);
		});
	});
}
getPost();

//charts section
//to do  attach data to charts from data base
//resize charts
//add labels
// customize colors

let labels1 = ['yes', 'yes in green'];
let data1 = [69, 39];
let colors1 = ['#49A9EA', '#36CAAB'];

let myChart1 = document.getElementById('myChart').getContext('2d');

let chart1 = new Chart(myChart1, {
	type: 'bar',
	data: {
		labels: labels1,
		datasets: [
			{
				data: data1,
				backgroundColor: colors1,
			},
		],
	},
	options: {
		layout: {
			padding: {
				left: 50,
				right: 0,
				top: 0,
				bottom: 0,
			},
			title: {
				text: 'placeholder',
				display: true,
			},
			legend: {
				display: false,
			},
		},
	},
});
let labels2 = ['place', 'yes in green'];
let data2 = [1, 2];
let colors2 = ['#49A9EA', '#36CAAB'];

let myChart2 = document.getElementById('myChart2').getContext('2d');

let chart2 = new Chart(myChart2, {
	type: 'doughnut',
	data: {
		labels: labels2,
		datasets: [
			{
				data: data2,
				backgroundColor: colors2,
			},
		],
	},
	options: {
		layout: {
			padding: {
				left: 50,
				right: 0,
				top: 0,
				bottom: 0,
			},
			title: {
				text: 'placeholder',
				display: true,
			},
			legend: {
				display: false,
			},
		},
	},
});
