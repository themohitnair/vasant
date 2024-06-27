from fastapi import FastAPI, HTTPException
from src.weather import get_current_weather_conditions
from cachetools import TTLCache
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

cache = TTLCache(maxsize=100, ttl=1200)

@app.get('/')
async def greet():
    return {
        "message": "vasant",
    }

@app.get('/{city_name}')
async def get_weather(city_name: str):
    try:
        if city_name in cache:
            return cache[city_name]

        weather_data = await get_current_weather_conditions(city=city_name)

        cache[city_name] = weather_data
        return weather_data
    except:
        raise HTTPException(status_code=500, detail='Internal Server Error. Unable to fetch information')
