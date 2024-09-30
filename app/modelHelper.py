# Class to access ML models

#####################################################################
# IMPORTS
#####################################################################

import pickle
import numpy as np
import pandas as pd

#####################################################################
# CLASS
#####################################################################


class ModelHelper:

    # init
    def __init__(self):
        pass

    # Load model
    def load_model(self, model_name):
        """A function to open and return a requested ml model

        Args:
            model_name (String): Filepath for the model to load

        Returns:
            Model: The loaded model
        """
        with open(model_name, 'rb') as file:
            model = pickle.load(file)
            return model

    # Predict
    def predict(self, model_name, X):
        """A function to make a prediction with a requested ml model

        Args:
            model_name (String): Filepath for the model to use
            X (DataFrame): The data to predict on

        Returns:
            float: The probability of a positive prediction
        """
        model = self.load_model(model_name)
        return model.predict_proba(X)[0][1]

    # predict diabetes
    def predict_diabetes(self, x):
        # @TODO add diabetes model
        pass

    # predict hypertension
    def predict_hypertension(self, age, cp, trestbps, chol, thal):
        """Predict probability of hypertension given age, cp, trestbps,
        chol, and thal.

        Args:
            age (float): Age of the patient
            cp (int): Chest pain type
            trestbps (int): Resting blood pressure
            chol (int): Serum cholesterol
            thal (int): Maximum heart rate

        Returns:
            float: Probability of hypertension
        """
        df = pd.DataFrame()
        df["age"] = [age]
        df["cp"] = [cp]
        df["trestbps"] = [trestbps]
        df["chol"] = [chol]
        df["thal"] = [thal]

        df = df.loc[:, ['age', 'cp', 'trestbps', 'chol', 'thal']]

        return self.predict("static/ml/hypertension_model.h5", df)

    # predict stroke
    def predict_stroke(self, age, hypertension, heart_disease, ever_married,
                       work_type, Residence_type, avg_glucose_level, bmi,
                       smoking_status):
        """Predict probability of stroke given age, hypertension,
        heart_disease, ever_married, work_type, Residence_type,
        avg_glucose_level, bmi, and smoking_status.

        Args:
            age (float): Age of the patient
            hypertension (int): Whether the patient has hypertension
            heart_disease (int): Whether the patient has heart disease
            ever_married (int): Whether the patient has ever been married
            work_type (int): Work type of the patient
            Residence_type (int): Residence type of the patient
            avg_glucose_level (float): Average glucose level of the patient
            bmi (float): BMI of the patient
            smoking_status (int): Smoking status of the patient

        Returns:
            float: Probability of stroke
        """
        df = pd.DataFrame
        df["age"] = [age]
        df["hypertension"] = [hypertension]
        df["heart_disease"] = [heart_disease]
        df["ever_married"] = [ever_married]
        df["work_type"] = [work_type]
        df["Residence_type"] = [Residence_type]
        df["avg_glucose_level"] = [avg_glucose_level]
        df["bmi"] = [bmi]
        df["smoking_status"] = [smoking_status]

        df = df.loc[:, ['age', 'hypertension', 'heart_disease', 'ever_married',
                        'work_type', 'Residence_type', 'avg_glucose_level',
                        'bmi', 'smoking_status']]

        return self.predict("static/ml/stroke_model.h5", df)
