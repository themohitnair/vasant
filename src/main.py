from fastapi import FastAPI, HTTPException
from src.weather import get_current_weather_conditions

app = FastAPI()

@app.get('/')
async def greet():
    return {
        "message": "Hello from vasant!"
    }

@app.get('/{city_name}')
async def get_weather(city_name):
    try:
        return get_current_weather_conditions(city=city_name)
    except:
        raise HTTPException(status_code=500, detail='Internal Server Error. Unable to fetch information')
