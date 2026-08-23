def generate_decoy(endpoint, risk_score):

    if endpoint == "/admin":
        decoy_type = "FAKE ADMIN PORTAL"

    elif endpoint == "/database":
        decoy_type = "FAKE DATABASE"

    elif endpoint == "/secrets":
        decoy_type = "FAKE SECRETS VAULT"

    elif endpoint == "/config":
        decoy_type = "FAKE CONFIGURATION PANEL"

    elif endpoint == "/backup":
        decoy_type = "FAKE BACKUP SERVER"

    else:
        decoy_type = "FAKE API ENDPOINT"

    return {
        "decoy_type": decoy_type,
        "target": endpoint,
        "risk_score": risk_score,
        "status": "ACTIVE"
    }