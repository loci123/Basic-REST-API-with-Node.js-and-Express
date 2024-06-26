# Basic REST API with Node.js and Express

This project is a simple REST API built with Node.js and Express, using MongoDB for data storage. The API provides user registration, authentication, role-based access control (RBAC), and CRUD operations.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/loci123/Basic-REST-API-with-Node.js-and-Express.git
    cd Basic-REST-API-with-Node.js-and-Express
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:
    ```env
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running on `http://localhost:3000`.

## API Endpoints

- **GET /user**GET /user: Fetch all users (Admin only)
- **GET /user**: Fetch all users
- **POST /user**: Create a new user
  - Request body: `{ "name": "User Name", "email": "user@example.com" }`
- **PUT /user/:id**: Update a user by ID
  - Request body: `{ "name": "Updated Name", "email": "updated@example.com" }`
- **DELETE /user/:id**: Delete a user by ID
- **POST /api/users/register**: Register a new user
  - Request body: `{ "name": "User Name", "email": "user@example.com", "password": "password" }`
- **POST /api/users/login**: Authenticate a user
  - Request body: `{ "email": "user@example.com", "password": "password" }`
 - **GET /admin/getUsers**: Fetch all users (Admin only)

## Environment Variables

The `.env` file should contain the following environment variables:
```env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=3000

- ## API Documentation

The API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

This documentation provides detailed information about the API endpoints, request and response formats, and other relevant details.

## Error Handling and Logging

This application includes comprehensive error handling and logging using custom middleware and the winston logging library.

### Logging

- All incoming requests are logged.
- Errors are logged with detailed stack traces.
- Logs are saved to `combined.log` and errors to `error.log`.

### Error Handling

- Custom error classes for common scenarios (`NotFoundError`, `ValidationError`).
- Centralized error handling middleware.
- All errors are logged and returned as JSON responses.