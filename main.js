if ('geolocation' in navigator){
    //pass callback function into getCurrentPosition, using arrow function syntax (param => expression)
        navigator.geolocation.getCurrentPosition(position =>{
            let lat = +position.coords.latitude.toFixed(4);
            let lon = +position.coords.longitude.toFixed(4);
            console.log(lat + "," + lon);
            let urlCoords = `https://api.weather.gov/points/${lat},${lon}`; // plug coordinates into url
            console.log(`url coords: ${urlCoords}`);
            fetch(`${urlCoords}`).then(function (response){
                return response.json(); // fetch url, obtain promise, convert response to json object
            }).then(function (obj){ // take json object and retreive URL for list of stations
                let urlObservationStations = obj.properties.observationStations;
                console.log(`url observation stations: ${urlObservationStations}`);
                fetch(`${urlObservationStations}`).then(function (response){ // fetch list of staions URL, create json object
                    return response.json();
                }).then(function (obj){
                    let stationID = obj.features[0].properties.stationIdentifier; //choose first station in list of stations, get its ID
                    let currentWeatherURL = `https://api.weather.gov/stations/${stationID}/observations/latest?require_qc=false` //create current weather url with station id
                    fetch(`${currentWeatherURL}`).then(function (response){ //fetch url for current weather, create json object
                        return response.json();
                    }).then(function (obj){
                        console.log(obj); //console.log object with all current weather condition for stations!
                        let currentTemperature = +(1.8*(obj.properties.temperature.value)+32).toFixed(2);
                        document.querySelector('.temperature').innerHTML = `${currentTemperature}&deg`;
                    })
                })
            })
        })
    } else{
        console.log('geolocation not available')
    }
    