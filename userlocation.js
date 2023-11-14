// Initialize a global object to store user location information
let userLocation = { lon: "", lat: "" };

// Function to get the user's location using async/await and Promises
async function getLocation() {
    return new Promise((resolve, reject) => {
        // Check if the geolocation feature is supported in the browser
        if (navigator.geolocation) {
            // Use geolocation API to get the current position
            navigator.geolocation.getCurrentPosition(
                // Success callback function when the position is obtained
                (position) => {
                    // Update the global userLocation object with latitude and longitude
                    userLocation.lat = position.coords.latitude;
                    userLocation.lon = position.coords.longitude;

                    // Resolve the Promise with the userLocation
                    resolve(userLocation);
                },
                // Error callback function when there is an issue obtaining the position
                (error) => {
                    // Log the error to the console
                    console.log(error);

                    // Reject the Promise with the error
                    reject(error);
                }
            );
        } else {
            // If the device does not support geolocation, reject the Promise with an error message
            reject('Device not ready');
        }
    });
}






//put below into a different file............................


// Example usage: Get the location and perform app logic with the obtained data
async function exampleFunction() {
    try {
        // Use async/await to wait for the getLocation Promise to resolve
        const location = await getLocation();

        console.log(location.lon)
        // Call your app's functions with the obtained location data
        // processLocation(location);

        // Additional app logic can be placed here, using the location data
    } catch (error) {
        // Handle errors if there are any during location retrieval
        console.error('Error getting location:', error);
    }
}



