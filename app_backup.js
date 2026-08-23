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


simulateButton.addEventListener(
    "click",
    () => {

        threatLevel.innerText =
            "CRITICAL";

        activeSessions.innerText =
            "1";

        anomalies.innerText =
            "17";

        decoys.innerText =
            "1";


        let delay = 0;


        events.forEach((event) => {

            setTimeout(() => {

                addEvent(event);

            }, delay);

            delay += 500;

        });


        setTimeout(() => {

            updateBehavior();

        }, 1000);


        setTimeout(() => {

            showAI();

        }, 1800);


        setTimeout(() => {

            showDecoy();

        }, 2500);

    }
);


resetButton.addEventListener(
    "click",
    () => {

        location.reload();

    }
);