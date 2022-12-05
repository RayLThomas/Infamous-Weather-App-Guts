// Created with Open Weather Map free API
// For the Odin Project cirriculumn
//
// API Documentation: https://openweathermap.org/forecast5#JSON

const container = document.getElementById('weatherContainer');
let city = document.createElement('h1');
let highTemp = document.createElement('p');
let lowTemp = document.createElement('p');
let sun = document.createElement('p');
let description = document.createElement('p');

// the order "nodes" determines how they are rendered
let createdNodes = [city, highTemp, lowTemp, description, sun];

// utility functions
const appendChildren = (arr) => {
    for (let el of arr) {      
        container.appendChild(el) 
    };
}

const formatUnixTimestampToTime = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000).toLocaleTimeString('en-US');
}

// async/await cannot save a variable to the globaly so it must be 
// wrapped in an async function that we'll call 'main'
const getJsonData = async (url) => {
    let response = await fetch(url, {mode: 'cors'});
    let data = await response.json();
    return data;
}

// without this async wrapper function we could not save the asynchronous api call 
// to a varaible 
const main = async () => {
    let zip = await prompt('Enter your US zipcode:');

    // Not concerned with exposing the api key in this case
    // but we could store all useful variables required build the api url string
    // if we wanted to expand in the functionality in the future.
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?cnt=1&zip=${zip}&countrycode=001&units=imperial&appid=16fc94590908912c3c39b422e4c5cb18`;

    try {
        jsondata = await getJsonData(apiUrl);

        city.textContent = `Today in ${jsondata.city.name}:`;
        sun.textContent = `${jsondata.city.name}'s sunrise today is at ${formatUnixTimestampToTime(jsondata.city.sunrise)}. Today's sunset begins at ${formatUnixTimestampToTime(jsondata.city.sunset)}.`;
        highTemp.textContent = `High: ${jsondata.list[0].main.temp_max}`;
        lowTemp.textContent = `Low: ${jsondata.list[0].main.temp_min}`;
        description.textContent = `Today we will observe ${jsondata.list[0].weather[0].description}.`

        appendChildren(createdNodes);

    } catch (error) {
        console.log('Error:', error);
        alert('hmm that didn\'nt work. Please click \'ok\' and try again.');
        main();
    }
}

main();

