# Shoping Node – Modern E-commerce Platform

A full-stack, event-driven e-commerce application built with Node.js (Express), React (Next.js), PostgreSQL (via Prisma ORM), Redis, and Docker. The project features modular architecture, real-time event handling, robust API, and a modern, responsive UI.

---

## 🏗️ Architecture Overview

- **Backend:** Node.js (Express), modular structure (`/modules`), Prisma ORM, Redis caching, event-driven services
- **Frontend:** React (Next.js), Redux Toolkit, Material UI, responsive design, modular components
- **Database:** PostgreSQL (via Prisma), with models for User, Product, Category, Post, Address, ProductImage
- **DevOps:** Docker Compose, Nginx reverse proxy, multi-container setup (API, client, Postgres, Redis)
- **Testing:** Jest for backend modules (unit/integration)

---

## 🚀 Features

- **User Management:** Registration (with image upload), authentication, unique email validation
- **Product Catalog:**
  - CRUD operations for products (with image upload, resizing, and multiple images)
  - Category filtering, brand filtering, search, rating, and price range
  - Redis caching for product details
  - Event-driven logic for product creation (custom event emitter)
- **Categories:** CRUD, filtering, and display
- **Posts:** Blog-style posts with author relation
- **Shopping Cart:** (Planned/extendable)
- **Responsive UI:** Modern, mobile-friendly design with category/product sliders, search, and filtering
- **API:** RESTful endpoints for users, products, categories, and posts
- **Authentication:** JWT-based (planned/extendable), session via cookies
- **Testing:** Jest tests for controllers and repositories

---

## 🗂️ Project Structure

### Backend (`/back-end`)
- **app.js:** Main Express app, sets up middleware, routes, error handling, and event listeners
- **/modules:**
  - `users/` – User CRUD, validation, image upload
  - `products/` – Product CRUD, image upload, event emission, Redis cache
  - `categories/` – Category CRUD
  - `posts/` – Post CRUD
- **/events:** Event-driven services (e.g., ProductEventService)
- **/services:**
  - `MulterService.js` – File upload middleware
  - `Resize.js` – Image resizing utility (Sharp)
  - `UploadImage.js` – Image upload handler
- **/prisma:**
  - `schema.prisma` – Database schema (PostgreSQL)
  - `migrations/` – DB migrations
  - `seed.js` – Seed script (Faker)
- **/utils:**
  - `logger.js` – Logging utility
  - `cache/redis.cache.js` – Redis cache wrapper

### Frontend (`/front-end`)
- **Next.js app** with modular components:
  - `/components/` – Layout, home, product, category, filters, loading, etc.
  - `/pages/` – Home, product, category, search, user, auth (login)
  - `/store/` – Redux Toolkit slices for products, categories, auth
  - `/utils/` – Data utilities
- **Styling:** Tailwind CSS, Material UI, custom CSS variables
- **State Management:** Redux Toolkit, async thunks for API calls
- **API Integration:** Axios instance with auth token support

### DevOps
- **docker-compose.yml:** Orchestrates API, client, Postgres, Redis, Nginx
- **/devops:**
  - `Dockerfile-nginx`, `nginx.conf` – Nginx reverse proxy for API/client

---

## 🛠️ Technologies Used
- **Node.js 20** (Express)
- **React 18** (Next.js)
- **Redux Toolkit**
- **Prisma ORM**
- **PostgreSQL 14**
- **Redis**
- **Docker & Docker Compose**
- **Nginx**
- **Jest** (testing)
- **Sharp** (image processing)
- **Multer** (file uploads)
- **Faker.js** (seeding)

---

## 📦 How to Run

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd shoping-node
   ```
2. **Configure environment variables:**
   - Set `DOCUMENT_ROOT`, `APP_PORT`, `POSTGRES_DB_PORT`, `FRONT_END_PATH`, `BACK_END_PATH` as needed (see `docker-compose.yml`)
3. **Start with Docker Compose:**
   ```bash
   docker-compose up
   ```
   - API: http://localhost:5000
   - Client: http://localhost:3050
   - Postgres: localhost:5432
   - Redis: localhost:6379

---

## 🧩 API Endpoints (Examples)
- `GET /users` – List users
- `POST /users` – Create user (with image upload)
- `GET /products` – List products (with filters)
- `GET /products/:id` – Get product (with Redis cache)
- `POST /products` – Create product (with images, emits event)
- `GET /categories` – List categories
- `GET /posts` – List posts

---

## 🧪 Testing
- Jest tests for product controller and repository (see `/modules/products/__tests__/`)
- To run tests:
  ```bash
  cd back-end
  npm test
  ```

---

## 📝 Notes
- **Event-driven:** Product creation emits events for further processing (e.g., notifications, cache, search index)
- **Image Handling:** All images are resized and stored, with support for multiple images per product
- **Caching:** Product details are cached in Redis for performance
- **Seeding:** Use `/prisma/seed.js` to populate the database with fake data
- **Extensible:** Modular codebase, easy to add new features (cart, orders, payments, etc.)

---

## 📄 License
MIT
