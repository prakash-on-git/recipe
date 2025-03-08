# MERN Recipe App

## 📌 Overview
The **MERN Recipe App** is a full-stack web application that allows users to browse, add, edit, delete, and organize recipes. Users can also categorize recipes using a drag-and-drop interface and persist their custom sorting.

## 🚀 Features
- User Authentication (JWT-based)
- Create, Read, Update, and Delete (CRUD) recipes
- Drag-and-drop recipe organization
- Category-based recipe management
- Image upload for recipes
- Like and comment functionality
- Dark mode support

## 🛠️ Tech Stack
- **Frontend:** React.js, React DnD, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JSON Web Token (JWT)
- **Storage:** Cloudinary (for image uploads)

## 📂 Folder Structure
```
mern-recipe-app/
│-- backend/
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   ├── middleware/        # Authentication & authorization
│   ├── config/            # Database & env setup
│   └── server.js          # Express app entry point
│
│-- frontend/
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Main pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # Global state management
│   │   ├── App.js         # Root component
│   │   └── index.js       # React entry point
│
│-- README.md
│-- package.json
│-- .env (backend config)
```

## 📌 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/mern-recipe-app.git
cd mern-recipe-app
```
### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
Create a `.env` file inside the **backend** folder with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
Run the backend server:
```sh
npm start
```

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
npm start
```
The frontend will be accessible at `http://localhost:3000`

## 📌 API Endpoints
### Authentication
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login user
- `GET /api/auth/me` – Get logged-in user details

### Recipes
- `GET /api/recipes` – Fetch all recipes
- `POST /api/recipes` – Create a new recipe
- `PUT /api/recipes/:id` – Update a recipe
- `DELETE /api/recipes/:id` – Delete a recipe
- `PUT /api/recipes/update-order` – Update recipe order in categories

## 📌 Contributing
Pull requests are welcome! Please open an issue first to discuss any major changes.

## 📌 License
This project is open-source and available under the MIT License.

