# Node.js Express App Setup

## Prerequisites

1. **Install Node.js and npm**:
   - Make sure you have [Node.js](https://nodejs.org/) installed. npm (Node Package Manager) comes bundled with Node.js.

## Getting Started

2. **Install Dependencies**:
   - Navigate to your project directory and run the following command:
   ```bash
   npm install express
3. **Start the Application**:
   - Run the application with this command:
   ```bash
   node app.js
## Running the Backend in Docker

To run the `tunti-backend` Node.js application in Docker, follow these steps:

### Prerequisites

1. **Install Docker**: Ensure you have [Docker](https://www.docker.com/) installed on your machine.

### Step 1: Build the Docker Image

Navigate to the `tunti-backend` directory where your `Dockerfile` is located. Open your terminal and run the following command to build the Docker image:

    docker build -t tunti-backend .


### Step 2: Run the Docker Container

Once the image is built, you can create and run a container using the following command:

    docker run --name my-backend-container -p 4000:4000 tunti-backend

### Step 3: Access Your Application

After running the container, your Node.js Express application should be accessible at:

    http://localhost:4000

### Step 4: Stopping and Removing the Container

To stop your running container, use:

    docker stop my-backend-container

To stop your running container, use:

    docker rm my-backend-container
