from fastapi import FastAPI, HTTPException
from weather import get_current_weather_conditions
from cachetools import TTLCache
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import traceback

app = FastAPI()

origins = ["http://localhost:5000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/{city_name}")
async def get_weather(city_name: str):
    print(f"Fetching weather for {city_name}...")
    city_name = city_name.title()
    try:
        if city_name in cache:
            return cache[city_name]
        weather_data = await get_current_weather_conditions(city=city_name)
        cache[city_name] = weather_data
        return weather_data
    except Exception as e:
        print(f"Error fetching weather for {city_name}: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error. Unable to fetch information: {str(e)}",
        )


cache = TTLCache(maxsize=100, ttl=1200)


@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    file_path = f"vasant-app/dist/{full_path}"
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse("vasant-app/dist/index.html")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", port=8000, host="localhost", reload=True)
