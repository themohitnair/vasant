# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the src directory (which includes requirements.txt)
COPY src ./src

# Copy the vasant-app directory
COPY vasant-app ./vasant-app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r src/requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the FastAPI server when the container launches
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]