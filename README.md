# Shop App 

This is the Docker Compose configuration file for the Shop application. It includes definitions for four services: `nginx`, `api`, `client`, and `mongo`.

## Services

### nginx

The `nginx` service is the web server that serves the Shop application. It depends on the `api`, `client`, and `mongo` services. It is built using the `Dockerfile-nginx` file in the `./devops` directory. It is exposed on port `3050`.

### api

The `api` service is the back-end for the Shop application. It is built using the `Dockerfile-express` file in the `./back-end` directory. It depends on the `mongo` service. It is mounted on `/app` and uses a named volume for `node_modules`.

### client

The `client` service is the front-end for the Shop application. It is built using the `Dockerfile-react` file in the `./front-end` directory. It is mounted on `/app` and uses a named volume for `node_modules`.

### mongo

The `mongo` service is the database for the Shop application. It uses the official MongoDB image from Docker Hub. It is mounted on a named volume for the data directory (`/data/db`) and is exposed on port `27017`.

## Volumes

This Docker Compose configuration defines one named volume for the `mongo` service: `mongo-data`.

## Networks

This Docker Compose configuration defines one bridge network for the services: `shop-network`.

## How to Run

To run the Shop application using Docker Compose, simply navigate to the directory where this `docker-compose.yml` file is located and run the following command:

```
docker-compose up
```
