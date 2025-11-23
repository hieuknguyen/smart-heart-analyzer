import streamlit as st
from skimage.io import imread
from skimage import color, measure
from skimage.filters import threshold_otsu, gaussian
from skimage.transform import resize
from skimage.metrics import structural_similarity
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn import linear_model, tree, ensemble
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
import joblib
import pandas as pd
import numpy as np
import os
from natsort import natsorted

class ECG:
    def getImage(self, image):
        """Get uploaded ECG image"""
        image = imread(image)
        return image

    def GrayImgae(self, image):
        """Convert to grayscale"""
        image_gray = color.rgb2gray(image)
        image_gray = resize(image_gray, (1572, 2213))
        return image_gray

    def DividingLeads(self, image):
        """Divide ECG image into 13 leads"""
        Lead_1 = image[300:600, 150:643]
        Lead_2 = image[300:600, 646:1135]
        Lead_3 = image[300:600, 1140:1625]
        Lead_4 = image[300:600, 1630:2125]
        Lead_5 = image[600:900, 150:643]
        Lead_6 = image[600:900, 646:1135]
        Lead_7 = image[600:900, 1140:1625]
        Lead_8 = image[600:900, 1630:2125]
        Lead_9 = image[900:1200, 150:643]
        Lead_10 = image[900:1200, 646:1135]
        Lead_11 = image[900:1200, 1140:1625]
        Lead_12 = image[900:1200, 1630:2125]
        Lead_13 = image[1250:1480, 150:2125]

        Leads = [
            Lead_1, Lead_2, Lead_3, Lead_4, Lead_5, Lead_6,
            Lead_7, Lead_8, Lead_9, Lead_10, Lead_11, Lead_12, Lead_13
        ]

        fig, ax = plt.subplots(4, 3)
        fig.set_size_inches(10, 10)
        x_counter = 0
        y_counter = 0

        for x, y in enumerate(Leads[:len(Leads)-1]):
            ax[x_counter][y_counter].imshow(y)
            ax[x_counter][y_counter].axis('off')
            ax[x_counter][y_counter].set_title(f"Leads {x+1}")
            y_counter += 1
            if (x + 1) % 3 == 0:
                x_counter += 1
                y_counter = 0

        fig.savefig('Leads_1-12_figure.png')
        fig1, ax1 = plt.subplots()
        fig1.set_size_inches(10, 10)
        ax1.imshow(Lead_13)
        ax1.set_title("Leads 13")
        ax1.axis('off')
        fig1.savefig('Long_Lead_13_figure.png')

        return Leads

    def PreprocessingLeads(self, Leads):
        """Preprocess extracted leads"""
        fig2, ax2 = plt.subplots(4, 3)
        fig2.set_size_inches(10, 10)
        x_counter = 0
        y_counter = 0

        for x, y in enumerate(Leads[:len(Leads)-1]):
            grayscale = color.rgb2gray(y)
            blurred_image = gaussian(grayscale, sigma=1)
            global_thresh = threshold_otsu(blurred_image)
            binary_global = blurred_image < global_thresh
            binary_global = resize(binary_global, (300, 450))
            ax2[x_counter][y_counter].imshow(binary_global, cmap="gray")
            ax2[x_counter][y_counter].axis('off')
            ax2[x_counter][y_counter].set_title(f"Preprocessed Lead {x+1}")
            y_counter += 1
            if (x + 1) % 3 == 0:
                x_counter += 1
                y_counter = 0

        fig2.savefig('Preprossed_Leads_1-12_figure.png')

        # Lead 13
        fig3, ax3 = plt.subplots()
        fig3.set_size_inches(10, 10)
        grayscale = color.rgb2gray(Leads[-1])
        blurred_image = gaussian(grayscale, sigma=1)
        global_thresh = threshold_otsu(blurred_image)
        binary_global = blurred_image < global_thresh
        ax3.imshow(binary_global, cmap='gray')
        ax3.set_title("Leads 13")
        ax3.axis('off')
        fig3.savefig('Preprossed_Leads_13_figure.png')

    def SignalExtraction_Scaling(self, Leads):
        """Extract signals using contouring"""
        fig4, ax4 = plt.subplots(4, 3)
        x_counter = 0
        y_counter = 0
        for x, y in enumerate(Leads[:len(Leads)-1]):
            grayscale = color.rgb2gray(y)
            blurred_image = gaussian(grayscale, sigma=0.7)
            global_thresh = threshold_otsu(blurred_image)
            binary_global = blurred_image < global_thresh
            binary_global = resize(binary_global, (300, 450))
            contours = measure.find_contours(binary_global, 0.8)
            contours_shape = sorted([x.shape for x in contours])[::-1][0:1]
            for contour in contours:
                if contour.shape in contours_shape:
                    test = resize(contour, (255, 2))
            ax4[x_counter][y_counter].invert_yaxis()
            ax4[x_counter][y_counter].plot(test[:, 1], test[:, 0], linewidth=1, color='black')
            ax4[x_counter][y_counter].axis('image')
            ax4[x_counter][y_counter].set_title(f"Contour {x+1}")
            y_counter += 1
            if (x + 1) % 3 == 0:
                x_counter += 1
                y_counter = 0

            scaler = MinMaxScaler()
            fit_transform_data = scaler.fit_transform(test)
            Normalized_Scaled = pd.DataFrame(fit_transform_data[:, 0], columns=['X']).T
            file_name = f'Scaled_1DLead_{x+1}.csv'
            Normalized_Scaled.to_csv(file_name, index=False)

        fig4.savefig('Contour_Leads_1-12_figure.png')

    def CombineConvert1Dsignal(self):
        """Combine 12 1D signals"""
        test_final = pd.read_csv('Scaled_1DLead_1.csv')
        location = os.getcwd()
        for files in natsorted(os.listdir(location)):
            if files.endswith(".csv") and files != 'Scaled_1DLead_1.csv':
                df = pd.read_csv(files)
                test_final = pd.concat([test_final, df], axis=1, ignore_index=True)
        return test_final

    def DimensionalReduciton(self, test_final):
        """Dimensionality reduction with PCA"""
        pca_loaded_model = joblib.load(r'H:\smart-heart-analyzer\backend\test\models\ecg-image-classification-model\PCA_ECG.pkl')
        result = pca_loaded_model.transform(test_final)
        final_df = pd.DataFrame(result)
        return final_df

    def ModelLoad_predict(self, final_df):
        """Load pretrained model and predict"""
        loaded_model = joblib.load(r'H:\smart-heart-analyzer\backend\test\models\ecg-image-classification-model\Heart_Disease_Prediction_using_ECG.pkl')
        result = loaded_model.predict(final_df)
        if result[0] == 1:
            return "Your ECG corresponds to Myocardial Infarction"
        elif result[0] == 0:
            return "Your ECG corresponds to Abnormal Heartbeat"
        elif result[0] == 2:
            return "Your ECG is Normal"
        else:
            return "Your ECG corresponds to History of Myocardial Infarction"


st.title("ECG Classification using Image Processing & ML")

# Initialize ECG object
ecg = ECG()

# Upload image
uploaded_file = st.file_uploader("Choose an ECG image file")

if uploaded_file is not None:
    st.subheader("Uploaded Image")
    ecg_user_image_read = ecg.getImage(uploaded_file)
    st.image(ecg_user_image_read)

    st.subheader("Gray Scale Image")
    ecg_user_gray_image_read = ecg.GrayImgae(ecg_user_image_read)
    with st.expander("Gray Scale Image"):
        st.image(ecg_user_gray_image_read)

    st.subheader("Dividing Leads")
    dividing_leads = ecg.DividingLeads(ecg_user_image_read)
    with st.expander("Divided Leads"):
        st.image('Leads_1-12_figure.png')
        st.image('Long_Lead_13_figure.png')

    st.subheader("Preprocessed Leads")
    ecg.PreprocessingLeads(dividing_leads)
    with st.expander("Preprocessed Leads"):
        st.image('Preprossed_Leads_1-12_figure.png')
        st.image('Preprossed_Leads_13_figure.png')

    st.subheader("Extracting Signals (1-12)")
    ecg.SignalExtraction_Scaling(dividing_leads)
    with st.expander("Contour Leads"):
        st.image('Contour_Leads_1-12_figure.png')

    st.subheader("Converting to 1D Signal")
    ecg_1dsignal = ecg.CombineConvert1Dsignal()
    with st.expander("1D Signals DataFrame"):
        st.write(ecg_1dsignal)

    st.subheader("Dimensionality Reduction (PCA)")
    ecg_final = ecg.DimensionalReduciton(ecg_1dsignal)
    with st.expander("Reduced Dimensions"):
        st.write(ecg_final)

    st.subheader("Final Prediction")
    ecg_model = ecg.ModelLoad_predict(ecg_final)
    with st.expander("Prediction Result"):
        st.success(ecg_model)
