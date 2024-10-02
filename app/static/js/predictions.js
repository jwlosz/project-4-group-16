$(document).ready(function() {
    console.log("Page Loaded");

    $("#ht_predict").click(function() {
        // alert("button clicked!");
        makeHypertensionPrediction();
    });

    $("#s_predict").click(function() {
        // alert("button clicked!");
        makeStrokePrediction();
    });

    $("#d_predict").click(function() {
        // alert("button clicked!");
        makeDiabetesPrediction();
    });
});

/**
 * Calls the hypertension prediction API endpoint to get the probability of having hypertension.
 *
 * Collects all the input fields from the hypertension form and sends them to the API endpoint.
 * On success, updates the text of the #ht_output element.
 */
function makeHypertensionPrediction() {
    let age = $("#ht_age").val();
    let cp = $("#cp").val();
    let trestbps = $("#trestbps").val();
    let chol = $("#chol").val();
    let thal = $("#thal").val();


    // check if inputs are valid

    // create the payload
    let payload = {
        "age": age,
        "cp": cp,
        "trestbps": trestbps,
        "chol": chol,
        "thal": thal
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/hypertensionPrediction",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            let prob = parseFloat(returnedData["preds"]);

            if (prob > 0.5) {
                $("#ht_output").text(`You have or will develop hypertension with probability of ${prob}!`);
            } else {
                $("#ht_output").text(`You do not have or will not develop hypertension with probability of ${1 - prob}.`);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}

/**
 * Calls the stroke prediction API endpoint to get the probability of having a stroke.
 *
 * Collects all the input fields from the stroke form and sends them to the API endpoint.
 * On success, updates the text of the #s_output element.
 */
function makeStrokePrediction() {
    let age = $("#s_age").val();
    let hypertension = $("#s_hypertension").val();
    let heart_disease = $("#s_heartDisease").val();
    let married = $("#s_married").val();
    let avg_glucose_level = $("#s_avgGlucose").val();
    let bmi = $("#s_bmi").val();
    let smoking_status = $("#s_smokingStatus").val();
    let work_type = $("#s_workType").val();
    let residence_type = $("#s_residenceType").val();

    // create the payload
    let payload = {
        "age": age,
        "hypertension": hypertension,
        "heart_disease": heart_disease,
        "married": married,
        "avg_glucose_level": avg_glucose_level,
        "bmi": bmi,
        "smoking_status": smoking_status,
        "work_type": work_type,
        "residence_type": residence_type
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/strokePrediction",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            let prob = parseFloat(returnedData["preds"]);

            if (prob > 0.5) {   
                $("#s_output").text(`You have had or will have a stroke with probability of ${prob}!`);
            } else {
                $("#s_output").text(`You haven't had or will not have a stroke with probability of ${1 - prob}.`);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}


/**
 * Calls the diabetes prediction API endpoint to get the probability of having diabetes.
 *
 * Collects all the input fields from the diabetes form and sends them to the API endpoint.
 * On success, updates the text of the #d_output element.
 */
function makeDiabetesPrediction() {
    let gender = $("#d_gender").val();
    let age = $("#d_age").val();
    let highBP = $("#d_highBP").val();
    let highChol = $("#d_highChol").val();
    let smoker = $("#d_smoker").val();
    let BMI = $("#d_bmi").val();
    let genHlth = $("#d_genHlth").val();
    let mntHlth = $("#d_mentHlth").val();
    let physHlth = $("#d_physHlth").val();

    // create the payload
    let payload = {
        "gender": gender,
        "age": age,
        "highBP": highBP,
        "highChol": highChol,
        "smoker": smoker,
        "BMI": BMI,
        "genHlth": genHlth,
        "mntHlth": mntHlth,
        "physHlth": physHlth
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/diabetesPrediction",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            let prob = parseFloat(returnedData["preds"]);

            if (prob > 0.5) {
                $("#d_output").text(`You have or will develop diabetes with probability of ${prob}!`);
            } else {
                $("#d_output").text(`You do not have or will not develop diabetes with probability of ${1 - prob}.`);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}
