# Shop App 

This is the Docker Compose configuration file for the Shop application. It includes definitions for four services: `nginx`, `api`, `client`, and `postgres`.

## Services

### nginx

The `nginx` service is the web server that serves the Shop application. It depends on the `api`, `client`, and `postgres` services. It is built using the `Dockerfile-nginx` file in the `./devops` directory. It is exposed on port `3050`.

### api

The `api` service is the back-end for the Shop application. It is built using the `Dockerfile-express` file in the `./back-end` directory. It depends on the `postgres` service. It is mounted on `/app` and uses a named volume for `node_modules`. The service uses Node.js 20 and includes Prisma for database management.

### client

The `client` service is the front-end for the Shop application. It is built using the `Dockerfile-react` file in the `./front-end` directory. It is mounted on `/app` and uses a named volume for `node_modules`. The service uses Node.js 20 and includes modern UI components with CSS variables for theming.

### postgres

The `postgres` service is the database for the Shop application. It uses the official PostgreSQL 14 image from Docker Hub. It is mounted on a named volume for the data directory (`/var/lib/postgresql/data`) and is exposed on port `5432`. The service includes:
- Database name: app
- Username: postgres
- Password: postgres

## Volumes

This Docker Compose configuration defines one named volume for the `postgres` service: `pgdata`.

## Networks

This Docker Compose configuration defines one bridge network for the services: `shop-network`.

## Environment Variables

The application uses the following environment variables:
- `DOCUMENT_ROOT`: Application root directory (default: /app)
- `APP_PORT`: API service port (default: 5000)
- `POSTGRES_DB_PORT`: PostgreSQL port (default: 5432)
- `FRONT_END_PATH`: Frontend directory path (default: ./front-end)
- `BACK_END_PATH`: Backend directory path (default: ./back-end)

## How to Run

To run the Shop application using Docker Compose, simply navigate to the directory where this `docker-compose.yml` file is located and run the following command:

```bash
docker-compose up
```

## Features

- Modern UI with responsive design
- Product catalog with categories
- Search functionality
- Shopping cart
- User authentication
- PostgreSQL database with Prisma ORM
- Docker containerization
- Nginx reverse proxy
