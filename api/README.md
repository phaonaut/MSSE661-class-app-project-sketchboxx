# sketchboxx-mysql-api

Sketchboxx API is a backend service built with Node.js, Express, and MySQL. It provides endpoints for user authentication, sketch management, and other related functionalities.

## Requirements
- Node.js (v14 or later)
- MySQL database
- npm or yarn package manager

## Installation
Clone the repository:  `git clone https://github.com/yourusername/sketchboxx-mysql-api.git`
- Navigate to the project directory: `cd sketchboxx-mysql-api`
- Install the dependencies: `npm install`
- Set up the environment variables by creating a `.env` file in the root directory and adding the following variables:   `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `JWT_SECRET`
    ``` plaintext
    DB_HOST=localhost
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_DATABASE=sketchboxxdb1
    JWT_SECRET=your_jwt_secret
    PORT=3000
    LOG_LEVEL=dev
    ```
- The DB_DATABASE should be the name of the database you want to use. If it doesn't exist, you can create it using the following command (sketchboxxdb1 is th default database name for this project): 
    ``` sql
    `CREATE DATABASE sketchboxxdb1;`. 
    ```

## Running the server
Start the server by running the following command: `npm start`

## Interacting with API
Use the postman collection provided in the root directory to interact direcly with the API. The collection contains all the endpoints and their respective request and response examples.


## Documentation (Coming Soon)
You can view the swagger doc by using [swagger.io](https://editor.swagger.io/). You can import the api-sketchboxx.yaml file provided in the /docs directory to view the documentation.

#### Coming Soon
Swagger Documentation is available at `/api-docs` endpoint. You can access it by running the server and navigating to `http://localhost:3000/api/docs` in your browser.