// Execute in strict mode
"use strict";

// Declare a Controller object for use by the HTML view
var controller;

window.addEventListener("load", () => {
    console.log("page loaded");
    // Create the Tournament_Organiser object for use by the HTML view
    controller = new Tournament_Organiser();
});

function Tournament_Organiser() {
    
    var login_details_url = "https://render-sqlite-deploy.onrender.com/login_details/";

    // functions to interact with REST API web service

    function get_login_details(username, password) {
        let entered_username = username;
        console.log("called again");
        console.log(username);
        console.log(password);
        function onSuccess(data) {
            if (typeof data.data == "undefined") {
                document.getElementById("username").value = "invalid username entered";
                document.getElementById("password").value = "";
            } else if (data.data.password != password) {
                document.getElementById("password").value = "invalid password entered";
                document.getElementById("username").value = "";
            } else {
                window.location.href = "home.html";
            }           
        }
        let login_details_get_url = login_details_url + username;
        $.ajax(login_details_get_url, { type: "GET", success: onSuccess });        
    }

    // functions to interact with controller
        
    this.login_to_app = function () {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        get_login_details(username, password);
    };
}