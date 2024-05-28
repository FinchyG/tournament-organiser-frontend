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
    
    // variables to store REST API endpoints
    var login_details_url = "https://render-sqlite-deploy.onrender.com/login_details/";
    var tournament_details_url = "https://render-sqlite-deploy.onrender.com/tournament_details/";

    // functions to interact with REST API web service

    function get_login_details(username, password) {

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

    function get_tournament_details() {
        
        function onSuccess(data){
            document.getElementById("tournament_name").value = data.data[0].tournament_name;
            document.getElementById("tournament_date").value = data.data[0].tournament_date;
            document.getElementById("location_name").value = data.data[0].location_name;
            document.getElementById("location_postcode").value = data.data[0].location_postcode;
        }

        $.ajax(tournament_details_url, { type: "GET", success: onSuccess });
    }

    function put_save_tournament_details(tournament_name, tournament_date, location_name, location_postcode) {
        console.log("inner controller function activated");
        
        function onSuccess(data){
            document.getElementById("tournament_name").setAttribute("readonly", true);
            document.getElementById("tournament_date").setAttribute("readonly", true);
            document.getElementById("location_name").setAttribute("readonly", true);
            document.getElementById("location_postcode").setAttribute("readonly", true);
        }

        let put_tournament_details_url = tournament_details_url + "1";
        $.ajax(put_tournament_details_url, { type: "PUT", data: {tournament_name: tournament_name, 
            tournament_date: tournament_date, location_name: location_name, location_postcode:
            location_postcode}, success: onSuccess });
    }

    // functions to interact with controller
        
    this.login_to_app = function () {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        get_login_details(username, password);
    };

    this.populate_tournament_details = function() {
        get_tournament_details();
    }    

    this.edit_tournament_details = function() {
        document.getElementById("tournament_name").removeAttribute("readonly");
        document.getElementById("tournament_date").removeAttribute("readonly");
        document.getElementById("location_name").removeAttribute("readonly");
        document.getElementById("location_postcode").removeAttribute("readonly");
    }

    this.save_tournament_details = function() {
        let tournament_name = document.getElementById("tournament_name").value;
        let tournament_date = document.getElementById("tournament_date").value;
        let location_name = document.getElementById("location_name").value;
        let location_postcode = document.getElementById("location_postcode").value;

        put_save_tournament_details(tournament_name, tournament_date, location_name, location_postcode);
    }

}