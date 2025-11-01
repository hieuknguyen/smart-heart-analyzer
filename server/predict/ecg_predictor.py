from skimage.io import imread
from skimage import color, filters, measure, transform
import pandas as pd
import numpy as np
import joblib
import os
from sklearn.preprocessing import MinMaxScaler

class ECGPredictor:
    def __init__(self, pca_path=None, model_path=None):
        # Lazy-load model, chỉ load khi lần đầu tiên predict
        self.pca_path = pca_path or r"C:\Users\strong\Desktop\Work\OutSource\heart_disease_classification\models\ecg-image-classification-model\PCA_ECG.pkl"
        self.model_path = model_path or r"C:\Users\strong\Desktop\Work\OutSource\heart_disease_classification\models\ecg-image-classification-model\Heart_Disease_Prediction_using_ECG.pkl"
        self.pca_model = None
        self.ecg_model = None

    def _load_models(self):
        if self.pca_model is None:
            if not os.path.exists(self.pca_path):
                raise FileNotFoundError(f"PCA model not found: {self.pca_path}")
            self.pca_model = joblib.load(self.pca_path)
        if self.ecg_model is None:
            if not os.path.exists(self.model_path):
                raise FileNotFoundError(f"ECG model not found: {self.model_path}")
            self.ecg_model = joblib.load(self.model_path)

    def predict(self, image_path: str):
        self._load_models()  # ensure models loaded

        if not os.path.exists(image_path):
            raise FileNotFoundError(f"ECG image not found: {image_path}")

        # Load & preprocess
        image = imread(image_path)
        gray = color.rgb2gray(image)
        gray = transform.resize(gray, (1572, 2213))

        # Cắt 12 leads (sửa chú thích: ECG có 12 leads)
        leads = [
            gray[300:600, 150:643], gray[300:600, 646:1135], gray[300:600, 1140:1625], gray[300:600, 1630:2125],
            gray[600:900, 150:643], gray[600:900, 646:1135], gray[600:900, 1140:1625], gray[600:900, 1630:2125],
            gray[900:1200, 150:643], gray[900:1200, 646:1135], gray[900:1200, 1140:1625], gray[900:1200, 1630:2125]
        ]

        all_signals = []
        scaler = MinMaxScaler()
        for lead in leads:
            blurred = filters.gaussian(lead, sigma=0.7)
            binary = blurred < filters.threshold_otsu(blurred)
            binary = transform.resize(binary, (300, 450))
            contours = measure.find_contours(binary, 0.8)
            if not contours:
                continue
            # Chọn contour dài nhất
            contour = max(contours, key=lambda x: x.shape[0])
            # Resize contour về (255, 2)
            signal = transform.resize(contour, (255, 2))
            scaled = scaler.fit_transform(signal)
            all_signals.append(pd.DataFrame(scaled[:, 0]).T)

        if not all_signals:
            return {"result": "Unable to extract ECG signals from image"}

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
