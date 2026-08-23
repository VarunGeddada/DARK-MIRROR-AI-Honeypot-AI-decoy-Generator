import random


ENDPOINTS = [
    "/",
    "/login",
    "/admin",
    "/api/users",
    "/backup",
    "/secrets",
    "/database",
    "/config"
]


def generate_attack():

    endpoint = random.choice(ENDPOINTS)

    suspicious = endpoint in [
        "/admin",
        "/backup",
        "/secrets",
        "/database",
        "/config"
    ]

    return {
        "session_id": "ATTACKER-001",
        "endpoint": endpoint,
        "method": "GET",
        "status_code": 403 if suspicious else 200,
        "risk_score": (
            random.randint(60, 100)
            if suspicious
            else random.randint(5, 30)
        ),
        "anomaly": suspicious
    }