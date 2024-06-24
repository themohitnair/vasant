from pydantic import BaseModel

class WeatherConditions(BaseModel):
    city: str
    temp: float
    status: str
    humidity: int
    wndspd: float
    risetime: str
    settime: str
    cldcover: int