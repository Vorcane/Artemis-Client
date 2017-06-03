/*global $, console, chrome, URL */
var domain = null,
    grade = null,
    qualystart = "<a href='https://www.ssllabs.com/ssltest/analyze.html?d=",
    qualymiddle = "' target='_blank'>",
    qualyend = "</a>";

var server = "http://www.lachlanblackhall.net/extension/query.php"; // Server where the php file is located
chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) { //Part of the black magic that is the chrome extension API
    "use strict";
    var url = new URL(tabs[0].url); // Grabs the current URL
    domain = url.hostname; // Extracts just the domain from the URL
    // domain = "[DOMAIN HERE]" // This can be used to override the domain forcing it to check a specific website
    $.post(server, {domain: domain}) // Initiates the post request sending the domain name
        .done(function (data) { // Success condition
            data = data.charAt(0);
            if (data === "A" || data === "B") {
                $('#result-div').html(qualystart + domain + qualymiddle + "<img src='icons/Secure.png'></img>" + qualyend); // Writes the grade to the website
            } else if (data === "C" || data === "D") {
                $('#result-div').html(qualystart + domain + qualymiddle + "<img src='icons/Mild.png'></img>" + qualyend); // Writes the grade to the website
            } else if (data === "E" || data === "F") {
                $('#result-div').html(qualystart + qualymiddle + "<img src='icons/Insecure.png'></img>" + qualyend); // Writes the grade to the website
            }
        })
        .fail(function (data) { // Fail condition
            $('result-div').html("I seem to have failed. Pleas wait 30 seconds and try me again")
            console.log("Extension recieved this data: " + data);
        });
});