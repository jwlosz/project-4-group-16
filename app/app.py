# Flask app for deploying ml models and dashboards

#####################################################################
# IMPORTS
#####################################################################

from flask import Flask, render_template, redirect, request, jsonify
from modelHelper import ModelHelper

#####################################################################
# SETUP
#####################################################################

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


#####################################################################
# ROUTES
#####################################################################


# Home
@app.route("/")
def home():
    # Return template and data
    return render_template("home.html")


# About Us
@app.route("/about_us")
def about_us():
    # Return template and data
    return render_template("about_us.html")


@app.route("/works_cited")
def works_cited():
    # Return template and data
    return render_template("works_cited.html")


# Diabetes Dashboard
@app.route("/diabetes_dashboard")
def diabetes_dash():
    # Return template and data
    return render_template("diabetes_dashboard.html")


@app.route("/stroke_hyper_dashboard")
def stroke_hyper_dash():
    return render_template("stroke_hyper_dashboard.html")


@app.route("/strokePrediction", methods=["POST"])
def predict_stroke():
    content = request.json["data"]

    age = float(content["age"])
    hypertension = int(content["hypertension"])
    heart_disease = int(content["heard_disease"])
    ever_married = int(content["ever_married"])
    work_type = int(content["work_type"])
    residence_type = int(content["residence_type"])
    avg_glucose_level = float(content["avg_glucose_level"])
    bmi = float(content["bmi"])
    smoking_status = int(content["smoking_status"])

    preds = ModelHelper.predict_stroke(age, hypertension, heart_disease,
                                       ever_married, work_type, residence_type,
                                       avg_glucose_level, bmi, smoking_status)

    return jsonify({"ok": True, "preds": str(preds)})


@app.route("/hypertensionPrediction", methods=["POST"])
def predict_hypertension():
    content = request.json["data"]

    age = float(content["age"])
    cp = int(content["cp"])
    trestbps = int(content["trestbps"])
    chol = int(content["chol"])
    thal = int(content["thal"])

    preds = ModelHelper.predict_hypertension(age, cp, trestbps, chol, thal)
    return jsonify({"ok": True, "preds": preds})


@app.route("/diabetesPrediction", methods=["POST"])
def predict_diabetes():
    content = request.json["data"]
    # @TODO make prediction

    return content


#####################################################################
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r


# main
if __name__ == "__main__":
    app.run(debug=True)
