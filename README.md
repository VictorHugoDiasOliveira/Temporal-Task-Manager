# Temporal-Task-Manager
This project is a task management service built using NestJS and Temporal. The service allows for creating, updating, retrieving, and deleting tasks with workflows managed by Temporal.

## Getting Started
To run this project locally, you will need to have Docker and Node.js installed on your machine.

## Temporal Server
The Temporal server is required to run the workflows. We will use Docker to set up Temporal quickly.

Run the following command to start the Temporal server using Docker Compose:

```
docker compose -f ./docker-compose.yml --env-file ./env.temporal up -d
```

The temporal-ui will run at http://localhost:8080.

## Installation
1. Clone the repository:
```
git clone git@github.com:VictorHugoDiasOliveira/Temporal-Task-Manager.git
cd task-management-service
```

2. Install dependencies:
```
npm install
```

## Usage

### Running the Application
After installing the dependencies, start the NestJS application:
```
npm run start:dev
```

The application will run at http://localhost:3000.

## API Endpoints Swagger
You can find endpoints at http://localhost:3000/api.