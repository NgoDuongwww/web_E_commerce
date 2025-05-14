<p align="center">
  <h1 align="center">🛒 E-Commerce Backend API 🛒</h1>
</p>

---
## 💡 Introduction  
This project is a robust backend RESTful API for an e-commerce platform, developed using **Node.js** and **Express.js**. It provides essential functionalities such as user authentication, product management, cart operations, and order processing. Designed with scalability and modularity in mind, the system leverages **MySQL** for data storage and **Docker** for containerized deployment.

### 🌟 Key Features  
- 🔐 **User Authentication** – Secure login/register using JWT.  
- 📦 **Product Management** – Add, update, delete, and query products.  
- 🛒 **Cart System** – Manage items in the shopping cart via API.  
- 📑 **Order Handling** – Place and track customer orders.  
- 🔍 **RESTful Structure** – Clean, consistent, and well-documented endpoints.  
- 🐳 **Dockerized Deployment** – Easy setup and consistent environment.  
- 📬 **Postman Collection** – Available for testing all API endpoints.

---
## 🎮 User Guide  
1️⃣ **Register/Login** – Create user accounts and obtain JWT tokens.  
2️⃣ **View/Add Products** – CRUD operations on product listings.  
3️⃣ **Manage Cart** – Add/remove items, update quantities.  
4️⃣ **Checkout & Order** – Place orders and retrieve order history.  
5️⃣ **Admin Access** – Role-based authorization for protected routes (e.g., product/admin actions).

---
## ⚙️ Setup & Run Application

### 📌 Requirements
- **Docker** & **Docker Compose** installed  
- Optional: **Postman** for API testing

### 🚀 Installation & Configuration
1️⃣ **Clone the repository**:
```bash
git clone https://github.com/NgoDuongwww/web_E_commerce.git
```
2️⃣ **Create environment configuration file:** `.env`
3️⃣ **Run the application with Docker** `docker-compose up --build`
4️⃣ **Access the API at:** in `http://localhost:3000/api/`
5️⃣ **Import the Postman collection:** Load `postman_collection.json` into Postman to test endpoints.
6️⃣ **Config folder:**
    - The config/ directory contains important application settings such as database configuration, JWT options, and environment-specific logic.
    - These files usually rely on values defined in the `.env` file for dynamic setup.
    - You can safely explore or modify config behavior in this folder if needed.

---
## 🛠 Technologies Used
### 🖥 **Backend**
- <img src="uploads/skill-icons--nodejs-light.png"> **Node.js**
- <img src="uploads/skill-icons--expressjs-light.png"> **Express.js**
- <img src="uploads/skill-icons--mysql-light.png"> **MySQL**

### 🛠 **Development Tools**
- <img src="uploads/skill-icons--vscode-light.png"> **Visual Studio Code**
- <img src="uploads/skill-icons--git.png"> **Git**
- <img src="uploads/simple-icons--laragon.png"> **Laragon**
- <img src="uploads/skill-icons--docker.png"> **Docker**
- <img src="uploads/skill-icons--postman.png"> **Postman**
---
## 🤝 **Contributing**
I welcome all contributions! If you have ideas or improvements, feel free to open an **issue** or submit a **pull request** to help enhance the project.

# 📣 Happy coding! 🚀