const simulateButton =
    document.getElementById("simulateAttack");

const resetButton =
    document.getElementById("resetSystem");


const threatLevel =
    document.getElementById("threatLevel");

const activeSessions =
    document.getElementById("activeSessions");

const anomalies =
    document.getElementById("anomalies");

const decoys =
    document.getElementById("decoys");


const eventTable =
    document.getElementById("eventTable");


const events = [

    {
        method: "GET",
        endpoint: "/login",
        status: 200,
        risk: "LOW"
    },

    {
        method: "GET",
        endpoint: "/admin",
        status: 403,
        risk: "HIGH"
    },

    {
        method: "GET",
        endpoint: "/backup",
        status: 200,
        risk: "HIGH"
    },

    {
        method: "POST",
        endpoint: "/login",
        status: 401,
        risk: "CRITICAL"
    },

    {
        method: "GET",
        endpoint: "/secrets",
        status: 200,
        risk: "CRITICAL"
    },

    {
        method: "GET",
        endpoint: "/api/users",
        status: 200,
        risk: "HIGH"
    }

];


function addEvent(event) {

    const row =
        document.createElement("tr");


    const time =
        new Date().toLocaleTimeString();


    row.innerHTML = `

        <td>${time}</td>

        <td>${event.method}</td>

        <td>${event.endpoint}</td>

        <td>${event.status}</td>

        <td class="${
            event.risk === "CRITICAL"
                ? "risk-critical"
                : event.risk === "HIGH"
                ? "risk-high"
                : "risk-low"
        }">

            ${event.risk}

        </td>

    `;


    if (
        eventTable.children.length === 1 &&
        eventTable.innerText.includes("Waiting")
    ) {

        eventTable.innerHTML = "";

    }


    eventTable.prepend(row);
}


function updateBehavior() {

    document.getElementById("reconScore")
        .innerText = "92%";

    document.getElementById("enumScore")
        .innerText = "84%";

    document.getElementById("credentialScore")
        .innerText = "76%";


    document.getElementById("reconBar")
        .style.width = "92%";

    document.getElementById("enumBar")
        .style.width = "84%";

    document.getElementById("credentialBar")
        .style.width = "76%";
}


function showAI() {

    const aiContent =
        document.getElementById("aiContent");


    aiContent.innerHTML = `

        <div class="ai-result">

            <strong>
                ATTACKER CLASSIFICATION
            </strong>

            <br>

            Automated Reconnaissance

            <br><br>

            <strong>
                CONFIDENCE
            </strong>

            <br>

            94%

            <br><br>

            <strong>
                OBSERVED BEHAVIOR
            </strong>

            <br>

            ✓ Endpoint enumeration

            <br>

            ✓ Authentication probing

            <br>

            ✓ Sensitive resource discovery

            <br>

            ✓ Abnormal request frequency

            <br><br>

            <strong>
                RISK LEVEL
            </strong>

            <br>

            CRITICAL

        </div>

    `;
}


function showDecoy() {

    const decoyContent =
        document.getElementById("decoyContent");


    decoyContent.innerHTML = `

        <div class="decoy-active">

            <h3>
                🪤 NEW ADAPTIVE DECOY GENERATED
            </h3>

            <p>

                <strong>Type:</strong>
                Fake Database Backup

                <br><br>

                <strong>Trigger:</strong>
                /backup

                <br><br>

                <strong>Reason:</strong>
                Repeated access to sensitive
                backup resources.

                <br><br>

                <strong>Status:</strong>
                🟢 ACTIVE

            </p>

        </div>

    `;


    document.querySelector(".decoy-status")
        .innerText = "ACTIVE";
}

simulateButton.addEventListener("click", async () => {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/simulate",
            {
                method: "POST"
            }
        );

        const result = await response.json();

        console.log("DARKMIRROR RESULT:", result);
        const event = result.event || {
        risk_score: 85,
        anomaly: true
};

        const ml = result.ml || {};
        const decoy = result.decoy || {};
        threatLevel.innerText =
            event.risk_score >= 80
                ? "CRITICAL"
                : event.risk_score >= 60
                    ? "HIGH"
                    : "MEDIUM";

        anomalies.innerText =
            Number(anomalies.innerText || 0) +
            (event.anomaly ? 1 : 0);

        decoys.innerText =
            Number(decoys.innerText || 0) + 1;

        activeSessions.innerText =
            Number(activeSessions.innerText || 0) + 1;

    console.log("ML:", ml);
    console.log("DECOY:", decoy);
    alert("SIMULATION RESPONSE RECEIVED");

    updateBehavior();
    showAI();
    showDecoy();
    } catch (error) {

        console.error(
            "DarkMirror connection error:",
            error
        );

        alert(
            "Could not connect to DarkMirror backend."
        );
    }

});



