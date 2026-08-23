from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlmodel import Session

from .database import engine, create_db
from .models import Event
from .simulator import generate_attack
from sqlmodel import Session, select
from backend.database import engine
from backend.models import Event
from backend.simulator import generate_attack
from backend.ml_model import detect_anomaly
from backend.decoys import generate_decoy

app = FastAPI(title="DarkMirror AI")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    create_db()


@app.get("/")
def home():
    return {
        "project": "DarkMirror AI",
        "status": "ONLINE"
    }


@app.post("/events")
def create_event(event: Event):

    with Session(engine) as session:

        session.add(event)
        session.commit()
        session.refresh(event)

        return event
    
@app.post("/simulate")
def simulate_attack():

    event_data = generate_attack()

    ml_result = detect_anomaly(
        event_data["risk_score"],
        event_data["status_code"]
    )

    event_data["anomaly"] = (
        event_data["anomaly"] or
        ml_result["is_anomaly"]
    )

    event = Event(**event_data)

    with Session(engine) as session:
        session.add(event)
        session.commit()
        session.refresh(event)

        decoy = generate_decoy(
            event.endpoint,
            event.risk_score
        )

        return {
            "event": event,
            "ml": ml_result,
            "decoy": decoy
        }
@app.get("/events")
def get_events():

    with Session(engine) as session:

        events = session.exec(
            select(Event)
        ).all()

        return events
@app.get("/decoy/{endpoint:path}")
def get_decoy(endpoint: str):

    return generate_decoy(
        "/" + endpoint,
        90
    )