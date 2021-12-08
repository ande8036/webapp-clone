function init() {
    // TODO: add event listener for a click on the 'lookup' button
    //       should call the `geoLocate()` function when clicked
    var lookup = document.getElementById('lookup');
    lookup.addEventListener('click', geoLocate, false);
}

function geoLocate(event) {
    // Perform geolocation using the Nominatim API
    //  - get plain text location value from text input 'location'
    //  - build URL for using with API
    //console.log("test successful");
    let location = document.getElementById('location');
    let url = 'https://nominatim.openstreetmap.org/search?q=' + location.value +
              '&format=json&limit=25&accept-language=en'
    
    // TODO: download geolocation data using the API url
    //       should call the `getJSON()` function
    
    getJSON(url, (data) => {
        let list = document.getElementById('result');
        let i;
        for(i=0; i < data.length; i++) {
            let location = data[i];
            let item = document.createElement('li');
            item.textContent = location.display_name + ' (' + location.lat + ', ' + location.lon + ')';
            list.appendChild(item);
        }
    });

    // TODO: once data is downloaded and available, you should dynamically
    //       build items in the unordered list `result`. Each item should
    //       have the full name of the location (display_name), followed
    //       by the latitude and longitude
    //       Example: location = St. Paul
    //        - Saint Paul, Ramsey County, Minnesota, United States of
    //          America (44.9504037, -93.1015026)
    //        - Saint-Paul, Neufchâteau, Vosges, Grand Est, Metropolitan
    //          France, 88170, France (48.3285226, 5.888596)
    //        - ...
}

function getJSON(url, callback) {
    // TODO: use `XMLHttpRequest()` to perform a GET request to the specified
    //       URL. Create a callback for when the readyState has changed. Once
    //       data has successfully downloaded, convert the response text to a
    //       JS Object (use `JSON.parse(text)`), then trigger the specified
    //       callback function with the data.
    var req =new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            // successfully received data!
            let data = JSON.parse(req.response);
            callback(data);
        }
    };

    req.open('GET', url, true);
    req.send();
}
