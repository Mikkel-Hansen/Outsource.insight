let visKlipBtn = document.getElementById("vis-klip-btn"); //get button-element
let visKlipContainer = document.getElementById("vis-klip-container"); //get empty div-element
let fjernPlaceholder = document.getElementById("klip-placeholder"); // get <p>klip-placeholder</p>


if (visKlipBtn) { //only run if button is present
    visKlipBtn.addEventListener("click", function() { //run function on click
        let xmlRequest = new XMLHttpRequest(); // Connect to URL with XMLHttpRequest using AJAX (Should be JSONHttpRequest? Keep up...)
        xmlRequest.open('GET', 'http://insights.outsource.dk/wp-json/wp/v2/posts?categories=10'); // GET request to load posts-data via REST-API from category: 10 (customer name)
        xmlRequest.onload = function() { //run funtion on load
            if (xmlRequest.status >= 200 && xmlRequest.status < 400) { //value between 200-400=succesful retrieval. If succesful, continue running function
                let data = JSON.parse(xmlRequest.responseText); // Create variable containing JSON-data
                createHTML(data); //Create HTML containing the data
                visKlipBtn.remove(); // Remove button after it has been clicked
				fjernPlaceholder.remove(); // Remove placeholder text
            } else { // If unsuccesful, show error message in console
                console.log("Connected to server, but returned an error");
            }
        };
    
    xmlRequest.onerror = function() { // If request to server fails, show error message in console
        console.log("Connection error");
    };
    
    
    xmlRequest.send();
    });    
}

function createHTML(postsData) { // Create following HTML elements from JSON-data
    let HTMLString = '';
    for (i = 0; i < postsData.length; i++) {
        HTMLString += '<div class="klip-beskrivelse">'; // Create div with class for styling in CSS
        HTMLString += '<h3>' + postsData[i].title.rendered + '</h3>'; //Create h3-title from the titles 'location' in the JSON-data
        HTMLString += postsData[i].content.rendered; //Create paragraph from the contents 'location' in the JSON-data
		HTMLString += '<hr>'; // Create seperator
        HTMLString += '</div>'; // Closing div-tag
    }
    visKlipContainer.innerHTML = HTMLString; // Paste HTML elements from strings inside div on page: <div id="vis-klip-container"></div>
}