**Vasant: A Real-Time Weather Web Application**
=============================================

**Overview**
-----------

Vasant is a web application that provides real-time weather information for a given location. The application uses the OpenWeatherMap API to fetch current weather conditions and displays them in a user-friendly format. Vasant is built using FastAPI for the backend and Vanilla JavaScript with jQuery for the frontend.

**Features**
------------

### Backend

* **FastAPI**: The backend is built using FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.7+.
* **Weather API Integration**: The application uses the OpenWeatherMap API to fetch current weather conditions for a given location.
* **Caching**: The application uses a TTLCache to cache weather data for 20 minutes to reduce the number of API calls and improve performance.

### Frontend

* **Vanilla JavaScript**: The frontend is built using Vanilla JavaScript with jQuery for DOM manipulation.
* **Responsive Design**: The application has a responsive design, making it accessible on various devices and screen sizes.
* **User-Friendly Interface**: The application provides a user-friendly interface to input the location and display the weather information.

**How to Use**
--------------

1. Clone the repository: `git clone https://github.com/themohitnair/vasant.git`
2. Make sure you have a docker installation (latest)
3. Use docker to build the container: `sudo docker build -t vasant .`
4. Now run the container with the command: `sudo docker run -p 8000:8000 vasant`

**Directory Structure**
-----------------------

* `src/`: The backend directory containing the FastAPI application.
	+ `main.py`: The main application file.
	+ `schemas.py`: The schema definitions for the weather data.
	+ `weather.py`: The weather API integration and caching logic.
* `vasant-app/`: The frontend directory containing the Vanilla JavaScript application.
	+ `main.js`: The main application file.
	+ `style.css`: The stylesheet for the application.
	+ `index.html`: The HTML file for the application.

**License**
---------

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

**Contributing**
------------

Contributions are welcome! If you'd like to contribute to Vasant, please fork the repository and submit a pull request.

**Acknowledgments**
----------------

* OpenWeatherMap API for providing the weather data.
* FastAPI for providing the backend framework.
* jQuery for providing the DOM manipulation library.
* Tailwind CSS for providing the CSS framework.