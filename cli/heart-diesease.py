import streamlit as st
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import lightgbm as lgb
import pickle

# Load the pre-trained model
with open(r'C:\Users\strong\Desktop\Work\OutSource\heart_disease_classification\models\heart-disease-prediction-model\heart_disease_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Function to preprocess user input
def preprocess_input(user_input):
    label_encoder = LabelEncoder()

    user_input['sex'] = label_encoder.fit_transform([user_input['sex']])[0]
    user_input['chest_pain_type'] = label_encoder.fit_transform([user_input['chest_pain_type']])[0]
    user_input['fasting_blood_sugar'] = label_encoder.fit_transform([user_input['fasting_blood_sugar']])[0]
    user_input['resting_electrocardiogram'] = label_encoder.fit_transform([user_input['resting_electrocardiogram']])[0]
    user_input['exercise_induced_angina'] = label_encoder.fit_transform([user_input['exercise_induced_angina']])[0]
    user_input['st_slope'] = label_encoder.fit_transform([user_input['st_slope']])[0]
    user_input['thalassemia'] = label_encoder.fit_transform([user_input['thalassemia']])[0]

    return user_input

# Streamlit app UI
st.title("Heart Disease Prediction")

# User inputs
age = st.number_input('Age', min_value=1, max_value=120, value=50)
sex = st.selectbox('Sex', ['male', 'female'])
chest_pain_type = st.selectbox('Chest Pain Type', ['asymptomatic', 'non-anginal pain', 'atypical angina', 'typical angina'])
resting_blood_pressure = st.number_input('Resting Blood Pressure', min_value=80, max_value=200, value=120)
cholesterol = st.number_input('Cholesterol', min_value=100, max_value=500, value=200)
fasting_blood_sugar = st.selectbox('Fasting Blood Sugar', ['greater than 120mg/ml', 'lower than 120mg/ml'])
resting_electrocardiogram = st.selectbox('Resting Electrocardiogram', ['normal', 'ST-T wave abnormality', 'left ventricular hypertrophy'])
max_heart_rate_achieved = st.number_input('Max Heart Rate Achieved', min_value=50, max_value=250, value=150)
exercise_induced_angina = st.selectbox('Exercise Induced Angina', ['yes', 'no'])
st_depression = st.number_input('ST Depression', min_value=0.0, max_value=10.0, value=1.0)
st_slope = st.selectbox('Slope of the Peak Exercise ST Segment', ['upsloping', 'flat', 'downsloping'])
num_major_vessels = st.number_input('Number of Major Vessels', min_value=0, max_value=4, value=1)
thalassemia = st.selectbox('Thalassemia', ['normal', 'fixed defect', 'reversible defect'])

# Create the user input dataframe
user_input = pd.DataFrame({
    'age': [age],
    'sex': [sex],
    'chest_pain_type': [chest_pain_type],
    'resting_blood_pressure': [resting_blood_pressure],
    'cholesterol': [cholesterol],
    'fasting_blood_sugar': [fasting_blood_sugar],
    'resting_electrocardiogram': [resting_electrocardiogram],
    'max_heart_rate_achieved': [max_heart_rate_achieved],
    'exercise_induced_angina': [exercise_induced_angina],
    'st_depression': [st_depression],
    'st_slope': [st_slope],
    'num_major_vessels': [num_major_vessels],
    'thalassemia': [thalassemia]
})

# Add a button to trigger the prediction
if st.button("Predict"):
    # Preprocess the input data
    user_input = preprocess_input(user_input)
    
    # Make the prediction
    prediction = model.predict(user_input)
    prediction_proba = model.predict_proba(user_input)

    # Show the result
    if prediction[0] == 1:
        st.write("Prediction: **Heart Disease**")
    else:
        st.write("Prediction: **No Heart Disease**")

    st.write(f"Probability: {prediction_proba[0][prediction[0]] * 100:.2f}%")
