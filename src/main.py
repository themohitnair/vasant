from fastapi import FastAPI, HTTPException
from src.weather import get_current_weather_conditions
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get('/')
async def greet():
    return {
        "message": "vasant",
    }

@app.get('/{city_name}')
async def get_weather(city_name):
    try:
        return get_current_weather_conditions(city=city_name)
    except:
        raise HTTPException(status_code=500, detail='Internal Server Error. Unable to fetch information')
