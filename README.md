# 🛍️ MERN-Stack Ecommerce Project

Welcome to our cutting-edge MERN-Stack Ecommerce platform! This full-stack application combines the power of MongoDB, Express.js, React.js, and Node.js to deliver a seamless shopping experience.

## ✨ Features

- 🔐 Secure user authentication with JWT
- 🏪 Dynamic product catalog
- 🛒 Intuitive shopping cart
- 💳 Streamlined checkout process
- 📦 Order tracking
- 👑 Admin dashboard for inventory management

## 🚀 Tech Stack

| Frontend | Backend | Database | Authentication | State Management |
|----------|---------|----------|----------------|------------------|
| React.js | Node.js | MongoDB  | JWT            | Redux            |
|          | Express |          | bcrypt         |                  |

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mern-ecommerce.git
   cd mern-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Fire it up!**
   ```bash
   npm run dev
   ```

## 🌐 Usage

- 🖥️ Frontend: `http://localhost:3000`
- ⚙️ Backend API: `http://localhost:5000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/users/register` | Register new user |
| POST   | `/api/users/login`    | User login |
| GET    | `/api/products`       | Fetch all products |
| GET    | `/api/products/:id`   | Get single product |
| POST   | `/api/orders`         | Create new order |
| GET    | `/api/orders`         | Get user orders (Auth required) |

## 🏗️ Redux Store Structure

```
Store
├── 🔐 auth
├── 📦 products
├── 🛒 cart
└── 📋 orders
```

## 🔒 Security Measures

- 🔑 Password hashing with bcrypt
- 🎫 JWT for session management
- 🛡️ CORS protection

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for more information.

---


<p align="center">
  <a href="https://github.com/Sushant9473/MERN">⭐ Star us on GitHub!</a>
</p>
