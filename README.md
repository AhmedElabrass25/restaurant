# 🍽️ My Restaurant

My Restaurant is a modern web application for browsing and ordering food online.  
It includes product listing, detailed product view, cart management, authentication, and order tracking.

---

## 🚀 Features

- 🏠 **Home Page** – Landing page with restaurant intro and swiper slider.
- ℹ️ **About Page** – Information about the restaurant.
- 🛍️ **Shop Page** – Display products with cards and related items.
- 🛒 **Cart Page** – Manage products using Local Storage.
- 📞 **Contact Page** – Contact form and restaurant details.
- 📦 **Product Details Page** – Detailed view of each product with related items.
- 📑 **Orders Page** – Fetch and display user orders from Supabase.
- 🔑 **Authentication** – Signin / Signup using Supabase.
- 🎨 **UI & Styling** – Tailwind CSS with React Icons and Swiper.
- ⚡ **State Management** – Context API for managing global state.

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **State Management:** Context API
- **Styling:** Tailwind CSS, React Icons, Swiper
- **Backend:** Supabase (Authentication + Database)
- **Routing:** React Router DOM
- **Storage:** Local Storage (for Cart)

---

## 📂 Project Structure

my-restaurant/
│
├── src/
│ ├── auth/
│ │ ├── Signin.jsx
│ │ └── Signup.jsx
│ │
│ ├── components/
│ │ ├── AddProduct.jsx
│ │ ├── DisplayProducts.jsx
│ │ ├── MyNav.jsx
│ │ ├── ProductCard.jsx
│ │ ├── ProtectRoute.jsx
│ │ ├── PublicRoute.jsx
│ │ ├── RelatedProduct.jsx
│ │ └── RelatedCard.jsx
│ │
│ ├── context/
│ │ └── AppContext.jsx
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── About.jsx
│ │ ├── Shop.jsx
│ │ ├── Cart.jsx
│ │ ├── Contact.jsx
│ │ ├── ProductDetails.jsx
│ │ └── Orders.jsx
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── public/
│ └── favicon.ico
│
├── package.json
├── vite.config.js
└── README.md
