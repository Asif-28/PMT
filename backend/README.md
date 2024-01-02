## Backend fastapi app

Table of Content
- [Backend fastapi app](#backend-fastapi-app)
  - [System requirement](#system-requirement)
  - [Starting the backend via docker-compose:](#starting-the-backend-via-docker-compose)
  - [Using the backend](#using-the-backend)


### System requirement

- [docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

The `.env` file is required for the backend to run. It should be placed in the `backend` directory. The `.env` file should contain the following:

```
# .env for local testing
MONGO_URI=mongodb://root:root@localhost:27018/
DB_NAME=test-pkm
```

### Starting the backend via docker-compose:

This will start a backend server on port `8001` and a mongodb server on port `27018`.

Whenever you make changes to the backend code, you need to rebuild the docker image.

```
docker-compose up --build
```

> Note: Backend is running on port 8001 for case of docker-compose.


### Using the backend

The backend api is running on port `8001` by docker-compose.

Visit `http://localhost:8001/docs` to see the swagger documentation for the backend api. 

This contains the list of all the api endpoints and their request and response schema.

- Ref swagger doc: https://fastapi.tiangolo.com/tutorial/first-steps/
