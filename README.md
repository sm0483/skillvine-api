# Skillvine API

## Overview
Welcome to Skill Vine. This comprehensive solution streamlines the process of managing students’ certificates and tracking their activity points. Key features include:

- Secure authentication and registration for student and teacher accounts
- Robust certificate upload functionality with support for image and PDF formats
- Customizable certificate marking system for teachers to assign points
## Getting Started

This guide provides instructions for setting up a development environment for the Skillvine API. Follow these steps to configure the necessary prerequisites and start using the API.

### Prerequisites

The following prerequisites are required to use the API:

-   **S3 Bucket**: An S3 bucket is used for image storage. Ensure that an S3 bucket is available and that the necessary credentials are provided.
-   **MongoDB**: MongoDB is used as the main database. Ensure that a MongoDB instance is available and that the necessary credentials are provided.

After setting up the prerequisites, follow these common setup steps:

1. Clone the repository and navigate to the project directory.
2. Copy the `.env.example` file to `.env` and provide the necessary values.
3. Install dependencies by running `npm install`.

### Option 1: Run with Docker

To run the server using Docker, follow these steps:

1. Build the Docker image by running

```
docker build -t skillvine-api . && docker run -p 5000:5000 skillvine-api
```

2. Start the server by running

```
docker-compose up
```

### Option 2: Run with npm

To run the server using `npm`, follow these steps:

Run this command to install dependencies and start the server in development mode:

```
npm i && npm run dev
```

After completing these steps, the development environment will be configured and ready to use. The available endpoints can now be explored and integrations can be built.

For more detailed information on the available endpoints, including their parameters and responses, please refer to our [Postman documentation](https://documenter.getpostman.com/view/21080448/2s93Y2Sgkf).

## Error Codes

-   **400 Bad Request**: The request was invalid or cannot be served. The exact error should be explained in the error payload.
-   **401 Unauthorized**: The request requires user authentication.
-   **403 Forbidden**: The server understood the request but refuses to authorize it.
-   **404 Not Found**: The requested resource could not be found. This error can be due to a temporary or permanent condition.
-   **500 Internal Server Error**: An unexpected condition was encountered and no more specific message is suitable.

## Technology Stack

This API is built using a robust and scalable technology stack, including:

-   **Amazon S3**: A highly scalable and durable object storage service used for image storage.
-   **MongoDB**: A document-based database used for storing and retrieving data.
-   **Express**: A fast and minimalist web framework for Node.js used to build the backend.
