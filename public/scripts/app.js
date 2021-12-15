

let app;
let map;
let neighborhood_markers = 
[
    {location: [44.942068, -93.020521], marker: null},
    {location: [44.977413, -93.025156], marker: null},
    {location: [44.931244, -93.079578], marker: null},
    {location: [44.956192, -93.060189], marker: null},
    {location: [44.978883, -93.068163], marker: null},
    {location: [44.975766, -93.113887], marker: null},
    {location: [44.959639, -93.121271], marker: null},
    {location: [44.947700, -93.128505], marker: null},
    {location: [44.930276, -93.119911], marker: null},
    {location: [44.982752, -93.147910], marker: null},
    {location: [44.963631, -93.167548], marker: null},
    {location: [44.973971, -93.197965], marker: null},
    {location: [44.949043, -93.178261], marker: null},
    {location: [44.934848, -93.176736], marker: null},
    {location: [44.913106, -93.170779], marker: null},
    {location: [44.937705, -93.136997], marker: null},
    {location: [44.949203, -93.093739], marker: null}
];

function init() {

    
    
    let crime_url = 'http://localhost:8000';

    app = new Vue({
        el: '#app',
        data: {
            map: {
                center: {
                    lat: 44.955139,
                    lng: -93.102222,
                    address: ""
                },
                zoom: 12,
                bounds: {
                    nw: {lat: 45.008206, lng: -93.217977},
                    se: {lat: 44.883658, lng: -92.993787}
                }
            }
        }
    });

    

    map = L.map('leafletmap').setView([app.map.center.lat, app.map.center.lng], app.map.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 11,
        maxZoom: 18
    }).addTo(map);
    map.setMaxBounds([[44.883658, -93.217977], [45.008206, -92.993787]]);
    
    let district_boundary = new L.geoJson();
    district_boundary.addTo(map);


    var testIcon = L.icon({
        iconUrl: 'mapicon.png',
    
        iconSize: [38,95],
        iconAnchor: [22,94],
        popupAnchor: [-3,76]

    });

    southEastMarker = L.marker([44.942068, -93.020521], {icon: testIcon}).addTo(map);
    eastSideMarker = L.marker([44.977413, -93.025156], {icon: testIcon}).addTo(map);
    westSideMarker = L.marker([44.931244, -93.079578], {icon: testIcon}).addTo(map);
    daytonMarker = L.marker([44.956192, -93.060189], {icon: testIcon}).addTo(map);
    phalenMarker = L.marker([44.978883, -93.068163], {icon: testIcon}).addTo(map);
    northEndMarker = L.marker([44.975766, -93.113887], {icon: testIcon}).addTo(map);
    frogtownMarker = L.marker([44.959639, -93.121271], {icon: testIcon}).addTo(map);
    summitMarker = L.marker([44.947700, -93.128505], {icon: testIcon}).addTo(map);
    westSeventhMarker = L.marker([44.930276, -93.119911], {icon: testIcon}).addTo(map);
    comoMarker = L.marker([44.982752, -93.147910], {icon: testIcon}).addTo(map);
    midwayMarker = L.marker([44.963631, -93.167548], {icon: testIcon}).addTo(map);
    anthonyMarker = L.marker([44.973971, -93.197965], {icon: testIcon}).addTo(map);
    unionMarker = L.marker([44.949043, -93.178261], {icon: testIcon}).addTo(map);
    macalesterMarker = L.marker([44.934848, -93.176736], {icon: testIcon}).addTo(map);
    highlandMarker = L.marker([44.913106, -93.170779], {icon: testIcon}).addTo(map);
    summitHillMarker = L.marker([44.937705, -93.136997], {icon: testIcon}).addTo(map);
    capitolMarker = L.marker([44.949203, -93.093739], {icon: testIcon}).addTo(map);

    

    
    southEastMarker.bindPopup("30 Crimes");
    southEastMarker.on('click', onClick);

    eastSideMarker.bindPopup("47 Crimes");
    eastSideMarker.on('click', onClick);

    westSideMarker.bindPopup("46 Crimes");
    westSideMarker.on('click', onClick);

    daytonMarker.bindPopup("60 Crimes");
    daytonMarker.on('click', onClick);

    phalenMarker.bindPopup("62 Crimes");
    phalenMarker.on('click', onClick);

    northEndMarker.bindPopup("116 Crimes");
    northEndMarker.on('click', onClick);

    frogtownMarker.bindPopup("200 Crimes");
    frogtownMarker.on('click', onClick);

    summitMarker.bindPopup("35 Crimes");
    summitMarker.on('click', onClick);

    westSeventhMarker.bindPopup("46 Crimes");
    westSeventhMarker.on('click', onClick);

    comoMarker.bindPopup("35 Crimes");
    comoMarker.on('click', onClick);

    midwayMarker.bindPopup("53 Crimes");
    midwayMarker.on('click', onClick);

    anthonyMarker.bindPopup("15 Crimes");
    anthonyMarker.on('click', onClick);

    unionMarker.bindPopup("70 Crimes");
    unionMarker.on('click', onClick);

    macalesterMarker.bindPopup("29 Crimes");
    macalesterMarker.on('click', onClick);

    highlandMarker.bindPopup("46 Crimes");
    highlandMarker.on('click', onClick);

    summitHillMarker.bindPopup("21 Crimes");
    summitHillMarker.on('click', onClick);

    capitolMarker.bindPopup("89 Crimes");
    capitolMarker.on('click', onClick);

    function onClick(e) {
        var popup = e.target.getPopup();
        var content = popup.getContent();
     
        //console.log(content);
     }
     


    getJSON('data/StPaulDistrictCouncil.geojson').then((result) => {
        // St. Paul GeoJSON
        $(result.features).each(function(key, value) {
            district_boundary.addData(value);
        });
    }).catch((error) => {
        console.log('Error:', error);
    });

    let isLatLng = true;

    map.getContainer().addEventListener("wheel", recenterMap);
    map.addEventListener("mouseup", recenterMap);
    
    function recenterMap() {

        let list = document.getElementById('result');
        
        var new_center = map.getCenter();
        //console.log("Current center is: " + new_center);

        
        //console.log( "\n\n\n" +isLatLng+"\n\n\n");
        if(isLatLng == false) {
            getAddress(event);
        } else {
            list.textContent = ("Map is currently centered at: " + ' (' + new_center.lat + ", " + new_center.lng + ") ");
        }
    }


    let isLat = true;

    var address_lookup = document.getElementById('address');
    address_lookup.addEventListener('click', swapAddressLatLng, false);

    var lookup = document.getElementById('lookup');
    lookup.addEventListener('click', geoLocate, false);

    function swapAddressLatLng(event) {
        if(isLatLng == true) {
            isLatLng = false;
        } else {
            isLatLng = true;
        }
        recenterMap();
    }
    

    function getAddress(event) {
        
        let url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + map.getCenter().lat + '&lon=' + map.getCenter().lng;
        //console.log(url);
        
        getJSONAddress(url, (data) => {
            let list = document.getElementById('result');
          
            //console.log(data)
            list.textContent = data.display_name;
            //console.log(data.display_name);
            
        });
        
        
    }

    function getJSONAddress(url, callback) {
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

    //app.addEventListener('load', getIncidents, false);

    getIncidents();

    var update = document.getElementById('update');
    update.addEventListener('click', getIncidents, false);


    function getIncidents(event) {
        //console.log("test");
        let codeJSON;

        getCodeName((codeData) => {
            //console.log(codeData);
            codeJSON = codeData;
            //console.log(codeJSON);
        });

        let neighborhoodJSON;

        getNeighborhoodName((neighborhoodData) => {
            //console.log(codeData);
            neighborhoodJSON = neighborhoodData;
            //console.log(codeJSON);
        });
        
        
        crimeFunction((data) => {
            
            
            setTimeout(() => {
            
            
                //console.log(data)
                var dataString = "";

                dataString += "<table>\n<tr>\n<th>Case Number</th>\n<th>Date-time</th>\n<th>Incident Type</th>\n<th>Incident</th>\n<th>Police Grid</th>\n<th>Neighborhood</th>\n<th>Block</th>\n</tr>";
                for(let i = 0; i < data.length; i++) {
                    //console.log(data[i]);
                    //console.log(data[i].case_number);
                    dataString += "<tr"

                    if ((data[i].code > 0 && (data[i].code <= 453)) || (data[i].code >= 810 && data[i].code <= 863)) {
                        dataString += " style=\"background-color:#d46159\"";
                    } else if (data[i].code >= 500 && (data[i].code <= 722)) {
                        dataString += " style=\"background-color:#73d9eb\"";
                    } else if (data[i].code >= 900 && data[i].code <= 1436) {
                        dataString += " style=\"background-color:#73d9eb\"";
                    } else {
                        dataString += " style=\"background-color:moccasin\"";
                    }
                    
                    dataString += "><td>" + data[i].case_number + "</td>\n" + "<td>" + data[i].date_time + "</td>\n" + "<td>";

                    let codeString = "error";
                    //console.log(codeJSON);
                    for(let j = 0; j < codeJSON.length; j++) {
                        if(codeJSON[j].code == data[i].code) {
                            codeString = codeJSON[j].incident_type;
                        }
                    }

                    dataString += codeString;

                    dataString += "</td>\n" + "<td>" + data[i].incident + "</td>\n" + "<td>" + data[i].police_grid + "</td>\n" + "<td>";
                    
                    let neighborhoodString = "error";
                    //console.log(codeJSON);
                    for(let j = 0; j < neighborhoodJSON.length; j++) {
                        if(neighborhoodJSON[j].neighborhood_number == data[i].neighborhood_number) {
                            neighborhoodString = neighborhoodJSON[j].neighborhood_name;
                        }
                    }

                    dataString += neighborhoodString;

                    dataString += "</td>\n" + "<td>" + data[i].block + "</td>\n" + "</tr>\n"
                }
                dataString += "</table>";
                
                testMessage.innerHTML = 'DATA';

                testMessage.innerHTML = testMessage.innerHTML.replace(/DATA/g, dataString);

            }, 500);
            
        });
        
        
    }

    function getCodeName(callback) {
        var req =new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                // successfully received data!
                data = JSON.parse(req.response);
                callback(data);

            }
        };

        req.open('GET', crime_url + "/api/codes", true);
        req.send();


    }

    function getNeighborhoodName(callback) {
        var req =new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                // successfully received data!
                data = JSON.parse(req.response);
                callback(data);

            }
        };

        req.open('GET', crime_url + "/api/neighborhoods", true);
        req.send();


    }

    

    function crimeFunction(callback) {
        var req =new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                // successfully received data!
                data = JSON.parse(req.response);
                callback(data);

            }
        };
        var limit = document.getElementById("limit");
        //console.log("TTTTT" + limit.value + "TTTTTT");
        
        let realLimit = limit.value + "";
        
        if(realLimit.length > 0) {
            realLimit = parseInt(realLimit);
        } else {
            realLimit = 1000;
        }

        if(typeof realLimit != "number" || Number.isNaN(realLimit)) {
            realLimit = 1000;
        }
        if(realLimit < 0) {
            realLimit = 1000;
        }

        var start_date = document.getElementById("start_date").value;
        var end_date= document.getElementById("end_date").value;
        //console.log(start_date);

        if(start_date.length != 10) {
            start_date = "2000-01-01";
        } else if(start_date.charAt(4) != "-" || start_date.charAt(7) != "-") {
            //console.log("success");
            start_date = "2000-01-01";
        } else {
            let badFormat = 0;
            for(let i = 0; i < 4; i++) {
                if(start_date.charAt(i) >= "0" && start_date.charAt(i) <= "9") {

                } else {
                    badFormat = 1;
                }
            }
            for(let i = 5; i < 7; i++) {
                if(start_date.charAt(i) >= "0" && start_date.charAt(i) <= "9") {

                } else {
                    badFormat = 1;
                }
            }
            for(let i = 8; i < 10; i++) {
                if(start_date.charAt(i) >= "0" && start_date.charAt(i) <= "9") {

                } else {
                    badFormat = 1;
                }
            }
            if(badFormat == 1) {
                start_date = "2000-01-01";
            }
        }
        if(end_date.length != 10) {
            end_date = "3000-01-01";
        } else if(end_date.charAt(4) != "-" || end_date.charAt(7) != "-") {
            //console.log("success");
            end_date = "3000-01-01";
        } else {
            let badFormat = 0;
            for(let i = 0; i < 4; i++) {
                if(end_date.charAt(i) >= "0" && end_date.charAt(i) <= "9") {

                } else {
                    badFormat = 1;
                }
            }
            for(let i = 5; i < 7; i++) {
                if(end_date.charAt(i) >= "0" && end_date.charAt(i) <= "9") {

                } else {
                    badFormat = 1;
                }
            }
            for(let i = 8; i < 10; i++) {
                if(end_date.charAt(i) >= "0" && end_date.charAt(i) <= "9") {

                } else {
                    badFormat = 1;
                }
            }
            if(badFormat == 1) {
                end_date = "3000-01-01";
            }
        }

        var neighborhoodString = "";

        var n1 = document.getElementById("Southeast");
        if(n1.checked == true) {
            neighborhoodString += "1,";
        }
        var n2 = document.getElementById("Greater East Side");
        if(n2.checked == true) {
            neighborhoodString += "2,";
        }
        var n3 = document.getElementById("West Side");
        if(n3.checked == true) {
            neighborhoodString += "3,";
        }
        var n4 = document.getElementById("Dayton's Bluff");
        if(n4.checked == true) {
            neighborhoodString += "4,";
        }
        var n5 = document.getElementById("Payne - Phalen");
        if(n5.checked == true) {
            neighborhoodString += "5,";
        }
        var n6 = document.getElementById("North End");
        if(n6.checked == true) {
            neighborhoodString += "6,";
        }
        var n7 = document.getElementById("Frogtown");
        if(n7.checked == true) {
            neighborhoodString += "7,";
        }
        var n8 = document.getElementById("Summit - University");
        if(n8.checked == true) {
            neighborhoodString += "8,";
        }
        var n9 = document.getElementById("West Seventh - Fort Road");
        if(n9.checked == true) {
            neighborhoodString += "9,";
        }
        var n10 = document.getElementById("Como Park");
        if(n10.checked == true) {
            neighborhoodString += "10,";
        }
        var n11 = document.getElementById("Hamline - Midway");
        if(n11.checked == true) {
            neighborhoodString += "11,";
        }
        var n12 = document.getElementById("Saint Anthony Park");
        if(n12.checked == true) {
            neighborhoodString += "12,";
        }
        var n13 = document.getElementById("Union Park");
        if(n13.checked == true) {
            neighborhoodString += "13,";
        }
        var n14 = document.getElementById("Macalester - Groveland");
        if(n14.checked == true) {
            neighborhoodString += "14,";
        }
        var n15 = document.getElementById("Highland");
        if(n15.checked == true) {
            neighborhoodString += "15,";
        }
        var n16 = document.getElementById("Summit Hill");
        if(n16.checked == true) {
            neighborhoodString += "16,";
        }
        var n17 = document.getElementById("Capitol River");
        if(n17.checked == true) {
            neighborhoodString += "17,";
        }

        if(neighborhoodString.length > 0) {
            neighborhoodString = neighborhoodString.substring(0, neighborhoodString.length - 1);
            neighborhoodString = "&neighborhood=" + neighborhoodString;
        }

        var codeString = "";

        var c1 = document.getElementById("100");
        if(c1.checked == true) {
            codeString += "100,110,120,";
        }
        var c2 = document.getElementById("200");
        if(c2.checked == true) {
            codeString += "210,220,";
        }
        var c3 = document.getElementById("300");
        if(c3.checked == true) {
            codeString += "300,311,312,313,314,321,322,323,324,331,333,334,341,342,343,344,351,352,353,354,361,363,364,371,372,373,374,";
        }
        var c4 = document.getElementById("500");
        if(c4.checked == true) {
            codeString += "500,510,511,513,515,516,520,521,523,525,526,530,531,533,535,536,540,541,543,545,546,550,551,553,555,556,560,561,563,565,566,";
        }
        var c5 = document.getElementById("600");
        if(c5.checked == true) {
            codeString += "600,603,611,612,613,614,621,622,623,630,631,632,633,640,641,642,643,651,652,653,661,662,663,671,672,673,681,682,683,691,692,693,";
        }
        var c6 = document.getElementById("800");
        if(c6.checked == true) {
            codeString += "400,410,411,412,420,421,422,430,431,432,440,441,442,450,451,452,453,810,861,862,863,";
        }
        var c7 = document.getElementById("900");
        if(c7.checked == true) {
            codeString += "900,901,903,905,911,913,915,921,922,923,925,931,933,941,942,951,961,971,972,975,981,982,";
        }
        var c8 = document.getElementById("1400");
        if(c8.checked == true) {
            codeString += "1400,1401,1410,1415,1416,1420,1425,1426,1430,1435,1436,";
        }
        var c9 = document.getElementById("1800");
        if(c9.checked == true) {
            codeString += "1800,1810,1811,1812,1813,1814,1815,1820,1822,1823,1824,1825,1830,1835,1840,1841,1842,1843,1844,1845,1850,1855,1860,1865,1870,1880,1885,";
        }
        var c10 = document.getElementById("2619");
        if(c10.checked == true) {
            codeString += "2619,3100,9954,9959,9986,";
        }
        
        
        if(codeString.length > 0) {
            codeString = codeString.substring(0, codeString.length - 1);
            codeString = "&code=" + codeString;
        }
        
        
        //console.log(neighborhoodString);

        //console.log(crime_url + '/api/incidents?limit=' + realLimit + "&start_date=" + start_date + "&end_date=" + end_date);

        req.open('GET', (crime_url + '/api/incidents?limit=' + realLimit + "&start_date=" + start_date + "&end_date=" + end_date + neighborhoodString + codeString), true);
        req.send();


    }

    var testMessage = document.getElementById("testID");
    

    

    
    
}

function getJSON(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            dataType: "json",
            url: url,
            success: function(data) {
                resolve(data);
            },
            error: function(status, message) {
                reject({status: status.status, message: status.statusText});
            }
        });
    });
}








// -----------------------------------------------------------

/*function init() {
    // TODO: add event listener for a click on the 'lookup' button
    //       should call the `geoLocate()` function when clicked
    var lookup = document.getElementById('lookup');
    lookup.addEventListener('click', geoLocate, false);
}*/

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
    
    getJSONLocate(url, (data) => {
        let list = document.getElementById('result');
        let i;
      
        let location = data[0];
        let item = document.createElement('li');
        item.textContent = location.display_name + ' (' + location.lat + ', ' + location.lon + ')';
        list.appendChild(item);
        var latlng = L.latLng(location.lat, location.lon);
        map.setView(latlng, 15, this.options);
        //console.log(latlng);

        
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

function getJSONLocate(url, callback) {
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
