from skimage.io import imread
from skimage import color, filters, measure, transform
import pandas as pd
import numpy as np
import joblib, os
from sklearn.preprocessing import MinMaxScaler
from natsort import natsorted

class ECGPredictor:
    def __init__(self):
        self.pca_model = joblib.load(r"C:\Users\strong\Desktop\Work\OutSource\heart_disease_classification\models\ecg-image-classification-model\PCA_ECG.pkl")
        self.ecg_model = joblib.load(r"C:\Users\strong\Desktop\Work\OutSource\heart_disease_classification\models\ecg-image-classification-model\Heart_Disease_Prediction_using_ECG.pkl")

    def predict(self, image_path: str):
        # Load & preprocess
        image = imread(image_path)
        gray = color.rgb2gray(image)
        gray = transform.resize(gray, (1572, 2213))

        # cắt 13 leads
        leads = [
            gray[300:600, 150:643], gray[300:600, 646:1135], gray[300:600, 1140:1625], gray[300:600, 1630:2125],
            gray[600:900, 150:643], gray[600:900, 646:1135], gray[600:900, 1140:1625], gray[600:900, 1630:2125],
            gray[900:1200, 150:643], gray[900:1200, 646:1135], gray[900:1200, 1140:1625], gray[900:1200, 1630:2125]
        ]

        # 3️Trích xuất tín hiệu 1D từ mỗi lead
        all_signals = []
        scaler = MinMaxScaler()
        for lead in leads:
            blurred = filters.gaussian(lead, sigma=0.7)
            binary = blurred < filters.threshold_otsu(blurred)
            binary = transform.resize(binary, (300, 450))
            contours = measure.find_contours(binary, 0.8)
            if not contours:
                continue
            contour = max(contours, key=lambda x: x.shape[0])
            signal = transform.resize(contour, (255, 2))
            scaled = scaler.fit_transform(signal)
            all_signals.append(pd.DataFrame(scaled[:, 0]).T)

        df = pd.concat(all_signals, axis=1, ignore_index=True)

        reduced = self.pca_model.transform(df)
        pred = self.ecg_model.predict(reduced)[0]

        mapping = {
            0: "Abnormal Heartbeat",
            1: "Myocardial Infarction",
            2: "Normal ECG",
            3: "History of Myocardial Infarction"
        }
        return {"result": mapping.get(pred, "Unknown")}
