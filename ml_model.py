import numpy as np
from sklearn.ensemble import IsolationForest

model = IsolationForest(
    n_estimators=100,
    contamination=0.2,
    random_state=42
)

training_data = np.array([
    [10, 200],
    [15, 200],
    [20, 200],
    [25, 200],
    [30, 200],
    [35, 200],
    [40, 200],
    [45, 200],
    [50, 200],
    [55, 200],
])

model.fit(training_data)


def detect_anomaly(risk_score, status_code):
    features = np.array([[risk_score, status_code]])

    prediction = model.predict(features)[0]
    score = model.decision_function(features)[0]

    return {
        "is_anomaly": bool(prediction == -1),
        "ml_score": round(float(score), 4)
    }