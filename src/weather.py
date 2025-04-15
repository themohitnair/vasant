from dotenv import load_dotenv
from pyowm import OWM
from schemas import WeatherConditions
import os
from fastapi import HTTPException
from datetime import datetime

load_dotenv()

weather_api_key = os.getenv("API_KEY")


async def get_current_weather_conditions(city: str) -> WeatherConditions:
    try:
        owm = OWM(weather_api_key)
        mgr = owm.weather_manager()
        observation = mgr.weather_at_place(city)
        weather = observation.weather

        temp = (
            weather.temperature("celsius")["temp"]
            if weather.temperature("celsius")["temp"] is not None
            else 0.0
        )
        status = (
            weather.detailed_status if weather.detailed_status is not None else "NA"
        )
        humidity = weather.humidity if weather.humidity is not None else 0
        wndspd = weather.wind()["speed"] if weather.wind()["speed"] is not None else 0.0
        risetime = (
            datetime.fromtimestamp(weather.srise_time).strftime("%H:%M")
            if datetime.fromtimestamp(weather.srise_time).strftime("%H:%M") is not None
            else "NA"
        )
        settime = (
            datetime.fromtimestamp(weather.sset_time).strftime("%H:%M")
            if datetime.fromtimestamp(weather.sset_time).strftime("%H:%M") is not None
            else "NA"
        )
        cldcov = weather.clouds if weather.clouds is not None else 0

        cond = WeatherConditions(
            city=city,
            temp=temp,
            status=status,
            humidity=humidity,
            wndspd=wndspd,
            risetime=risetime,
            settime=settime,
            cldcover=cldcov,
        )

        return cond
    except Exception as e:
        print(
            f"Error fetching weather conditions for {city}: {str(e)}"
        )  # New error message
        raise HTTPException(
            status_code=500,
            detail=f"Weather fetch failed for {city}. Please try again later.",
        )
