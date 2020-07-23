const firebase = require("firebase");
require("firebase/database");

const keys = require("./keys");
//const yelpKey = require("./keys");
//console.log(keys);

firebase.initializeApp(keys.firebasekey);

const URL =
	"https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&term=aquarium&location=SanJose";

// DOM elements for side bar and list
const list = document.querySelector("ul");
const shop1 = document.getElementById("shop1");
const shop2 = document.getElementById("shop2");
const shop3 = document.getElementById("shop3");
const shop4 = document.getElementById("shop4");
const shop5 = document.getElementById("shop5");
const shop6 = document.getElementById("shop6");
list.appendChild(shop1);
list.appendChild(shop2);
list.appendChild(shop3);
list.appendChild(shop4);
list.appendChild(shop5);
list.appendChild(shop6);
const clownImage1 = document.getElementById("clown");
const angelImage1 = document.getElementById("angel");
const wrasseImage1 = document.getElementById("wrasse");
const rabbitImage1 = document.getElementById("rabbit");
const clamImage1 = document.getElementById("clam");
const tangImage1 = document.getElementById("tang");

//select all the yelp links with anchor
const yelpLinks = document.querySelectorAll("li a");
//console.log(yelpLinks);

// jquery function to show jellyfish loader

$(window).on("load", function () {
	$(".loader-wrapper").fadeOut("slow");
});

// let h = new Headers();
let req = new Request(URL, {
	headers: { Authorization: `Bearer ${keys.yelp}` },
	params: {
		categories: "local_fish_stores",
	},
});
// Request list data from yelp
fetch(req)
	.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			throw new Error("Not working,Try again");
		}
	})
	.then((data) => {
		//console.log(data);
		let shopsArray = [];
		//console.log(shopsArray);
		for (let i = 0; i < data.businesses.length; i++) {
			let shops = { name: {}, url: {}, image: {}, phone: {} };
			//console.log(shops);
			shops.name = data.businesses[i].name;
			//console.log(shops.name);
			shops.url = data.businesses[i].url;
			//console.log(shops.url);
			shops.image = data.businesses[i].image_url;
			//console.log(shops.image);
			shops.phone = data.businesses[i].display_phone;
			//console.log(shops.phone);
			shopsArray.push(shops);
			// var newListShops = document.createElement("li");
			// var a = document.createElement("a");
			// a.setAttribute("href", yelpLinks[i].url);
			// newListShops.appendChild(a);
			// console.log(newListShops);
			//list.appendChild(newListShops)
			//console.log(newListShops);

			yelpLinks[i].href = shopsArray[i].url;
			yelpLinks[i].textContent = shopsArray[i].name;
		}
		// append links and yelp names to the DOM
		// bug with data takes too long to iterate thru graphs cant load
		// yelpLinks[i].href = shopsArray[i].url;
		// // 			//console.log(yelpLinks[i]);
		// yelpLinks[i].textContent = shopsArray[i].name;
		// // 			console.log(yelpLinks[i]);
		// list.appendChild(yelpLinks[i]);

		// fix by  append links and yelp names to the DOM outside of the loop circle back
		//try async await?

		shop1.appendChild(yelpLinks[0]);
		shop2.appendChild(yelpLinks[1]);
		shop3.appendChild(yelpLinks[2]);
		shop4.appendChild(yelpLinks[3]);
		shop5.appendChild(yelpLinks[4]);
		shop6.appendChild(yelpLinks[5]);

		// add image thumbnails
		clownImage1.src = shopsArray[0].image;
		shop1.append(clownImage1);

		angelImage1.src = shopsArray[1].image;
		shop2.append(angelImage1);

		wrasseImage1.src = "images/tank.png";
		shop3.append(wrasseImage1);

		rabbitImage1.src = "images/torch.png";
		shop4.append(rabbitImage1);

		clamImage1.src = "images/kingaqua.jpg";
		shop5.append(clamImage1);

		tangImage1.src = shopsArray[5].image;
		shop6.append(tangImage1);
	})
	.catch((error) => {
		console.log("Error:", error.message);
	});

// Side bar toggle button open and close add event listeners
const toggleButton = document.querySelector(".sidebar-toggle");
const closeButton = document.querySelector(".close-button");
const sidebar = document.querySelector(".sidebar");

toggleButton.addEventListener("click", function () {
	sidebar.classList.toggle("show-sidebar");
});

closeButton.addEventListener("click", function () {
	sidebar.classList.remove("show-sidebar");
});

// //function to reset the form
// function newSlate() {
// 	param.value = '';
// }

// firebase data ref
var Database = firebase.database();
//console.log(Database);
// var storage = firebase.storage();
// console.log(storage);

//var newDatabase = firebase.database();
//console.log(newDatabase);

// var ref = newDatabase.ref("parameters");
// var data = {
// 	temp: 85,
// 	salinity: 1.025,
// 	alkalinity: 10,
// };
// ref.push(data);
//click event for submit button log data
$(`#message-form`).submit((event) => {
	event.preventDefault();

	// user input of params
	var $alk = $("#alk").val();
	var $salt = $("#salinity").val();
	var $temp = $("#temp").val();
	var $calcium = $("#calcium").val();
	// console.log($alk);
	// console.log($salt);
	// console.log($temp);
	console.log($calcium);

	// clear user input
	$("#alk").val("");
	$("#salinity").val("");
	$("#temp").val("");
	$("#calcium").val("");

	// create or refrence a section for message data in the database
	var messageRefrence = Database.ref("newParam");

	// push method to save data to message section

	messageRefrence.push({
		alkalinity: $alk,
		salinity: $salt,
		temp: $temp,
		calcium: $calcium,
	});
});

// function to retrieve data and post it to logs
function postLogs() {
	Database.ref("newParam").on("value", function (results) {
		const newParam = results.val();
		//console.log(newParam);

		const messageBoard = document.querySelector(".message-board");
		const paramLogsArray = [];

		for (let id in newParam) {
			const hydro = newParam[id].alkalinity;
			//console.log(hydro);
			const param = newParam[id].salinity;
			//console.log(param);
			const temp = newParam[id].temp;
			//console.log(temp);
			const calcium = newParam[id].calcium;

			//create list and add id
			const alkListElment = document.createElement("li");
			const salinityListElment = document.createElement("li");
			const templistElement = document.createElement("li");
			const calciumElement = document.createElement("li");

			alkListElment.setAttribute("data-id", id);
			alkListElment.textContent = `Alkalinity: ${hydro}`;

			paramLogsArray.push(alkListElment);

			salinityListElment.setAttribute("data-id", id);
			salinityListElment.textContent = `Salinity: ${param}`;

			paramLogsArray.push(salinityListElment);

			templistElement.setAttribute("data-id", id);
			templistElement.textContent = `Temperature: ${temp}`;

			paramLogsArray.push(templistElement);

			calciumElement.setAttribute("data-id", id);
			calciumElement.textContent = `Calcium: ${calcium}`;

			paramLogsArray.push(calciumElement);
		}

		//remove li's .empty() removes all of the nodes

		$(".message-board").empty();
		paramLogsArray.forEach((element) => {
			messageBoard.appendChild(element);
		});
	});
}
postLogs();

//clear logs TODO circle back to fix logs remove from firebase db
$("#clear").click((event) => {
	event.preventDefault();
	Database.ref("newParam/").remove();
	$(".message-board").empty();
});

//Charts section
//TODO  Canvas for three data charts
//Attach data to charts from database
//Resize charts
// Add labels
// Customize colors
//Sync X and Y axis for bar and line

//Data ref for chart 1
Database.ref("newParam").on("value", function (results) {
	const alkalinityValue = results.val();
	const calciumValue = results.val();
	var alkalinityData = [];
	var calciumData = [];

	for (let id in alkalinityValue) {
		const alkalinityChart = alkalinityValue[id].alkalinity;

		alkalinityData = alkalinityData.filter((item) => item); //filter array for empty strings
		//console.log(alkalinityData);
		alkalinityData.push(alkalinityChart);
	}
	for (let id in calciumValue) {
		const calciumChart = calciumValue[id].calcium;
		calciumData = calciumData.filter((item) => item);
		calciumData.push(calciumChart);
	}
	console.log(calciumData);

	//Create labels and data variables
	var labels1 = [
		"Jan",
		"Feb",
		"March",
		"April",
		"May",
		"June",
		"July",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec",
	];
	var data1 = alkalinityData;
	var data2 = calciumData;
	var colors1 = [
		"rgba(255, 99, 132, 0.2)",
		"rgba(54, 162, 235, 0.2)",
		"rgba(255, 206, 86, 0.2)",
		"rgba(75, 192, 192, 0.2)",
		"rgba(153, 102, 255, 0.2)",
		"rgba(255, 159, 64, 0.2)",
		"rgba(54, 162, 235, 0.2)",
		"rgba(75, 192, 192, 0.2)",
		"rgba(255, 206, 86, 0.2)",
		"rgba(75, 192, 192, 0.2)",
		"rgba(153, 102, 255, 0.2)",
		"rgba(255, 159, 64, 0.2)",
	];
	var borderColor1 = [
		"rgba(255, 99, 132, 1)",
		"rgba(54, 162, 235, 1)",
		"rgba(255, 206, 86, 1)",
		"rgba(75, 192, 192, 1)",
		"rgba(153, 102, 255, 1)",
		"rgba(255, 159, 64, 1)",
		"rgba(153, 102, 255, 1)",
		"rgba(54, 162, 235, 1)",
		"rgba(54, 162, 235, 1)",
		"rgba(255, 206, 86, 1)",
		"rgba(75, 192, 192, 1)",
		"rgba(153, 102, 255, 1)",
	];
	//Chart 1 DOM
	var alkChart1 = document.getElementById("myChart").getContext("2d");

	alkChart1 = new Chart(alkChart1, {
		type: "line",
		data: {
			labels: labels1,
			datasets: [
				{
					label: "Alkalinity",
					data: data1,
					backgroundColor: colors1,
					borderColor: "#2A1A92",

					yAxisID: "id1",
				},
				{
					label: "Calcium",
					data: data2 /*[440, 420, 430, 440, 455, 440, 450, 430, 425, 440, 400, 430],*/,
					type: "bar",
					backgroundColor: borderColor1,
					fill: true,

					yAxisID: "id2",
				},
			],
		},
		options: {
			responsive: true,
			elements: {
				line: {
					fill: false,
				},
			},
			title: {
				display: true,
				position: "bottom",
				text: "Week",
				fontSize: 14,
			},

			scales: {
				yAxes: [
					{
						display: true,
						position: "left",
						type: "linear",
						scaleLabel: {
							display: true,
							labelString: "ALK",
							beginAtZero: false,
						},

						id: "id1",
					},
					{
						scaleLabel: {
							display: true,
							labelString: "Calcium",
							beginAtZero: true,
						},

						display: true,
						type: "linear",
						position: "right",
						gridLines: {
							display: false,
						},

						id: "id2",
					},
				],
			},
		},
	});
});

//add salinity data from firsebase and push it to the chart

Database.ref("newParam").on("value", function (results) {
	const salinityValue = results.val();
	var salinityData2 = [];
	//console.log(salinityData2);
	for (let id in salinityValue) {
		const salinityChart = salinityValue[id].salinity;
		//console.log(salinityChart);
		//filter empty array so its not pushed to the chart
		salinityData2 = salinityData2.filter((item) => item);
		//console.log(salinityData2);

		salinityData2.push(salinityChart);
	}

	var labels2 = [
		"Jan",
		"Feb",
		"March",
		"April",
		"May",
		"June",
		"July",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec",
	];

	//let colors2 = ["#49A9EA", "#36CAAB"];

	var myChart2 = document.getElementById("myChart2").getContext("2d");

	myChart2 = new Chart(myChart2, {
		type: "line",
		data: {
			labels: labels2,
			datasets: [
				{
					label: "Salinity Chart",
					data: salinityData2,
					borderColor: "#8e5ea2",
					fill: false,
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
					text: "placeholder",
					display: true,
				},
				legend: {
					display: false,
				},
			},
		},
	});
	//console.log(salinityData2);
});

// Fire base data push to chart TODO fix labels to match data
Database.ref("newParam").on("value", function (results) {
	const tempValue = results.val();
	var tempData3 = [];

	for (let id in tempValue) {
		const tempChart = tempValue[id].temp;
		tempData3 = tempData3.filter((item) => item);
		tempData3.push(tempChart);
	}
	var labels3 = [
		"temp below 65 degrees",
		"temp above 85 degrees",
		"Temp 80",
		"Ideal temp",
		"Today's temp",
	];

	var colors3 = [
		"#3e95cd",
		"rgba(255, 99, 132, 0.2)",
		"#3cba9f",
		"rgba(255, 159, 64, 0.2)",
		"rgba(54, 162, 235, 0.2)",
	];

	var myChart3 = document.getElementById("myChart3").getContext("2d");

	myChart3 = new Chart(myChart3, {
		type: "polarArea",
		data: {
			labels: labels3,
			datasets: [
				{
					label: "Temperature Chart",
					//data: tempData3,
					data: [60, 95, 80, 76, tempData3],
					backgroundColor: colors3,
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
					text: "Temp Chart",
					display: true,
				},
				legend: {
					display: false,
				},
			},
		},
	});
});

// //Scratched code not working or too many bugs TODO revisit section
// //scratch geo location return locations not accurate
// // var  = document.querySelector("h1");
// // console.log(x);

// // function getLocation() {
// // 	if (navigator.geolocation) {
// // 		navigator.geolocation.watchPosition(showPosition);
// // 	} else {
// // 		x.innerHTML = "Geolocation is not supported by this browser.";
// // 	}
// // }
// // getLocation();
// // console.log(getLocation);
// // function showPosition(position) {
// // 	x.innerHTML =
// // 		"Latitude: " +
// // 		position.coords.latitude +
// // 		"<br>Longitude: " +
// // 		position.coords.longitude;
// // }
// // console.log(showPosition());

// //
// // yelpLinks[i].href = shopsArray[i].url;
// // 			//console.log(yelpLinks[i]);
// // 			yelpLinks[i].textContent = shopsArray[i].name;
// // 			console.log(yelpLinks[i]);

//Labels are breaking the polar chart data
// function labelData() {
// 	tempData3.forEach((element) => {
// 		if (element < 65) {
// 			return labels3[0];
// 		} else if (element > 90) {
// 			return (labels3[1]);
// 		} else if (element === 75) {
// 			return (labels3[3]);
// 		}
// 	});
// }
// labelData();
// console.log(labelData);

// // var secondColorSet = [
// //     "rgba(153, 102, 255, 0.2)",
// //     "rgba(255, 159, 64, 0.2)",
// //     "rgba(54, 162, 235, 0.2)",
// //     "rgba(75, 192, 192, 0.2)",
// // ];

// // secondColorSet

//Takes too long to return the promise may best guess is loading graphs investigate later
// let shopsArray = [];
// async function yelpData() {
// 	let response = await fetch(req)
// 		.then((response) => {
// 			if (response.ok) {
// 				return response.json();
// 			} else {
// 				throw new Error("Not working,Try again");
// 			}
// 		})
// 		.then((data) => {
// 			for (let i = 0; i < data.businesses.length; i++) {
// 				var shops = { name: {}, url: {}, image: {}, phone: {} };
// 				console.log(shops);
// 				shops.name = data.businesses[i].name;
// 				console.log(shops.name);
// 				shops.url = data.businesses[i].url;
// 				console.log(shops.url);
// 				shops.image = data.businesses[i].image_url;
// 				console.log(shops.image);
// 				shops.phone = data.businesses[i].display_phone;
// 				console.log(shops.phone);
// 				shopsArray.push(shops);
// 			}
// 			return shopsArray; // shopsArray.push(shops);
// 		})
// 		.catch((error) => {
// 			console.log("Error:", error.message);
// 		});

// 	return response;
// }
// console.log(yelpData());
// console.log(shopsArray);

// yelpData().then((result) => {
// 	for (i = 0; i < result.length; i++) {
// 		yelpLinks[i].href = shopsArray[i].url;
// 		console.log(yelpLinks[i]);
// 		yelpLinks[i].textContent = shopsArray[i].name;
// 		console.log(yelpLinks[i]);
// 	}
// 	clownImage1.src = shopsArray[0].image;
// 	shop1.append(clownImage1);

// 	angelImage1.src = shopsArray[1].image;
// 	shop2.append(angelImage1);

// 	wrasseImage1.src = shopsArray[2].image;
// 	shop3.append(wrasseImage1);

// 	rabbitImage1.src = shopsArray[3].image;
// 	shop4.append(rabbitImage1);

// 	clamImage1.src = shopsArray[4].image;
// 	shop5.append(clamImage1);

// 	tangImage1.src = shopsArray[5].image;
// 	shop6.append(tangImage1);
// });

// const wikiURL =
// 	"https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=%27List_of_marine_aquarium_fish_species%27";
// // let response = async function wikiData() {
// // 	let response = await fetch(wikiURL)
// // 		.then((response) => {
// 			if (response.ok) {
// 				console.log(response.json());
// 			} else {
// 				throw new Error("Not working,Try again");
// 			}
// 		})
// 		.then((date) => {
// 			{
// 				return response;
// 			}
// 			//return response;
// 		})
// 		.catch((error) => {
// 			console.log("Error:", error.message);
// 		});
// };
// //wikiData();
// console.log(response);

// return response;
// }
// console.log(yelpData());
// console.log(shopsArray);

// yelpData().then((result) => {
// 	for (i = 0; i < result.length; i++) {
// 		yelpLinks[i].href = shopsArray[i].url;
// 		console.log(yelpLinks[i]);
// 		yelpLinks[i].textContent = shopsArray[i].name;
// 		console.log(yelpLinks[i]);
// 	}

// fetch(wikiURL)
// 	.then((response) => {
// 		if (response.ok) {
// 			return response.json();
// 		} else {
// 			throw new Error("Not working,Try again");
// 		}
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	});
