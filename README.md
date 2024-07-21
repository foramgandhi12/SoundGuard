# SoundGuard

Project Google Doc - https://docs.google.com/document/d/1Ry_NIr9Tq_AV5O0wSrxQRC6l0cIDbMRvKRjiZ_tq4Z8/edit?usp=sharing

SoundGuard is a Node.js application that uses Express.js to provide a web interface for monitoring sound levels. The application runs locally on port 3000. This project includes a simple server and a set of front-end files to display and interact with the application.

## Features

- Node.js backend with Express.js
- Static files served from the `public` directory
- Basic sound monitoring interface

## Running the Application with Docker

This project includes a Dockerfile for easy containerization. Follow the steps below to build and run the Docker container.

### Prerequisites

- Docker installed on your machine. You can download Docker from [here](https://www.docker.com/products/docker-desktop).

### Build the Docker Image

1. Open a terminal and navigate to the project directory.

2. Build the Docker image using the following command:

   ```sh
   docker build -t soundguard-app .
3. Run the Docker image using the following command:

   ```sh
   docker run -p 3000:3000 soundguard-app
4. Open any browser to localhost:3000. The App will request permission to use the microphone when clicking 'Start Microphone'
## Running the Application with Node/NPM

### Prerequisites

- Ensure you have Node.js installed, then follow these steps: [here](https://nodejs.org/en/download/package-manager).

### Build the Docker Image

1. Open a terminal and navigate to the project directory.

2. Install dependencies using the following command:

   ```sh
   npm install
3. Start the server using the following command:

   ```sh
   npm start
4. Open any browser to localhost:3000. The App will request permission to use the microphone when clicking 'Start Microphone'