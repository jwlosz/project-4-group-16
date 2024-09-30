$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});


// call Flask API endpoint
function makePredictions() {
    let sex_flag = $("#gender").val();
    let age = $("#age").val();
    let fare = $("#fare").val();
    let familySize = $("#familySize").val();
    var p_class = $("#pclass").val();
    var embarked = $("#embarked").val();
    var has_cabin = $("#has_cabin").val();


    // check if inputs are valid

    // create the payload
    var payload = {
        "sex_flag": sex_flag,
        "age": age,
        "fare": fare,
        "familySize": familySize,
        "p_class": p_class,
        "embarked": embarked,
        "has_cabin": has_cabin
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            var prob = parseFloat(returnedData["prediction"]);

            if (prob > 0.5) {
                $("#output").text(`You Survived with probability ${prob}!`);
            } else {
                $("#output").text(`You did not survive with probability ${prob}, sorry. :(`);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}
