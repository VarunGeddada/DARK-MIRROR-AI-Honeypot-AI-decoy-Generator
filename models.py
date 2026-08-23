from typing import Optional
from sqlmodel import SQLModel, Field


class Event(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    session_id: str
    endpoint: str
    method: str
    status_code: int
    risk_score: float = 0.0
    anomaly: bool = False