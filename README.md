# Course Master – RESTful API

A powerful and scalable RESTful API for managing online courses, instructors, and student enrollments. Built using Node.js, Express.js, and MongoDB, following the MVC architecture.

## 🚀 Features
- User authentication and authorization (JWT)
- Role-based access control (Admin, Instructor, Student)
- Course and instructor management
- Student enrollments
- File uploads (e.g., course images) via Multer
- Secure password hashing using Bcrypt
- Input validation and error handling
- Modular and clean code structure (MVC pattern)

## 🧰 Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (with Mongoose ODM)  
- **Authentication:** JWT, Bcrypt  
- **File Upload:** Multer  
- **Environment Config:** dotenv  
- **CORS Support:** cors  
- **Validation:** express-validator  

## 📁 Project Structure
```
course-master/
│
├── controllers/        # Request logic (e.g., auth, course handling)
├── models/             # Mongoose schemas
├── routes/             # Express routes
├── middleware/         # Custom middleware (auth, error handling, etc.)
├── utils/              # Utility functions
├── uploads/            # Uploaded files (e.g., course images)
├── config/             # DB connection and environment config
├── .env                # Environment variables
├── server.js           # Entry point
└── README.md           # This file
```

## ⚙️ Installation & Run

### 1. Clone the repo:
```bash
git clone https://github.com/your-username/course-master.git
cd course-master
```

### 2. Install dependencies:
```bash
npm install
```

### 3. port && deployment:
```env
PORT=3001
Railway
```

### 4. Run the server:
```bash
npm run dev
```

## 🧪 API Testing
Use **Postman** or **Thunder Client** to test the following:
- `POST /api/auth/register` – Register new users  
- `POST /api/auth/login` – Login and receive JWT  
- `GET /api/courses` – View courses  
- `POST /api/courses` – Create a course (protected)  
- `POST /api/upload` – Upload image via Multer  

## 🔐 Authentication
- Users must be authenticated to access protected routes
- JWT token should be sent in `Authorization` header as:  
  ```
  Authorization: Bearer <your_token>
  ```

## 📄 License
This project is open source under the [MIT License](LICENSE).
