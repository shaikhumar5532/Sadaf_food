# SADAF FOOD PROCESSORS PRIVATE LIMITED (SFPPL) — Full-Stack Corporate Portal

Welcome to the official repository of the corporate web portal for **Sadaf Food Processors Private Limited (SFPPL)**. This project is a world-class, premium, full-stack MERN application representing SFPPL as an enterprise-level food processing leader.

---

## 📖 Company Profile & Project Overview

**SADAF FOOD PROCESSORS PRIVATE LIMITED** was incorporated on **13 December 2012** with its primary processing facility in **Muzaffarpur, Bihar**—the agricultural heartland of India. The company specializes in the processing, preservation, and distribution of Bihar's three premium native commodities:
1. 🍒 **Premium Shahi Litchis**: Graded, blast-chilled, or processed into pasteurized pulp.
2. 🍿 **Organic Popped Makhanas (Fox Nuts)**: Mechanically sized, sorted using computerized optical Sortex, and packed with nitrogen flushing.
3. 🐟 **Aquaculture Freshwater Fish**: Daily pond-gate catches (Rohu, Katla, Prawns) preserved under clean crushed ice and distributed via temperature-controlled supply lines.

This repository hosts a multi-functional system comprising:
* **Interactive Frontend**: A premium corporate showcase of products, certifications, sustainability pledges, history, and leadership.
* **Hiring & Careers Hub**: An online portal where job seekers can browse open positions, submit application forms, and upload resumes.
* **Admin Dashboard & CRUD API**: A secure interface for administrators to manage job listings, review job applications, and update the food catalog.
* **Brochure Compilation Engine**: A backend compiler script that dynamically generates a world-class, 31-page corporate company profile PDF.

---

## 🛠️ Tech Stack

The application follows a modular modern stack:

### Frontend
* **Core Framework**: React 19 (Vite)
* **Routing**: React Router DOM (v7)
* **API Client**: Axios for backend CRUD integration
* **Styling**: Vanilla CSS (Premium corporate theme: Deep Green `#0F6A37`, Gold `#D4AF37`, White, and light slate accents) with partial Tailwind CSS utilities

### Backend & Assets
* **Runtime Environment**: Node.js
* **Server Framework**: Express (v5)
* **Database**: MongoDB (via Mongoose ODM)
* **PDF Compiler**: PDFKit (v0.19) for programmatically rendering vector lines, pages, and text

---

## 📂 Project Structure

```text
SFPPL-website/
├── backend/                       # Express Node.js Backend Server
│   ├── models/                    # Mongoose Database Schemas
│   │   ├── Application.js         # Job application records
│   │   ├── Job.js                 # Career listings data
│   │   ├── Product.js             # Food catalog items
│   │   └── User.js                # Admin/User accounts
│   ├── temp_images/               # Downloaded high-res assets for PDF compilation
│   ├── .env                       # Local server configuration variables
│   ├── generate_profile_pdf.js    # PDF Company Profile Builder
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Main server entry & API router
│
├── frontend/                      # React SPA (Vite)
│   ├── public/                    # Static assets & generated PDF outputs
│   │   ├── directors/             # Official photos of corporate board
│   │   ├── sfppl_brochure.pdf     # Master 31-page corporate profile PDF
│   │   ├── product_catalog.pdf    # Synced duplicate for client downloads
│   │   ├── annual_report.pdf      # Synced duplicate for investor portal
│   │   └── ...                    # Other certificates and presentations
│   ├── src/                       # React Source Code
│   │   ├── assets/                # Local styling assets & logo
│   │   ├── components/            # Reusable UI elements (Navbar, Footer, etc.)
│   │   ├── pages/                 # Full pages (Home, About, Careers, Contact, etc.)
│   │   ├── App.jsx                # Router & page mapping
│   │   ├── index.css              # Global styles & design tokens
│   │   └── main.jsx               # React initialization
│   ├── package.json               # Frontend dependencies
│   └── vite.config.js             # Vite development environment settings
│
└── README.md                      # Project documentation (this file)
```

---

## 📄 Corporate Profile PDF Compiler

A standalone script is included in the backend to compile a 31-page multinational-grade corporate brochure. 

### Key Features
1. **Dynamic Image Downloader**: An automated downloader pulls raw assets from Unsplash (handling HTTP 301/302 redirects) and caches them in `backend/temp_images/`.
2. **Page-Fit Layout Control**: Avoids automatic page breaks by overriding margins and tracking coordinates (`doc.y`), constraining the profile to exactly 31 pages.
3. **Automatic Synchronization**: Once generated, the PDF is duplicated across public assets (`sfppl_brochure.pdf`, `product_catalog.pdf`, `annual_report.pdf`, `incorporation_certificate.pdf`, `quality_standards.pdf`, `investor_presentation.pdf`), keeping all portal downloads synchronized.

### Running the Compiler
To regenerate or rebuild the PDF assets, navigate to the `backend/` folder and execute:
```bash
cd backend
node generate_profile_pdf.js
```
Upon completion, the terminal will report:
`[PDF] All assets fully synced. Terminating compiler process.`

---

## ⚡ Setup & Local Execution

### 1. Prerequisites
Ensure you have installed:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [MongoDB](https://www.mongodb.com/) (running locally on `mongodb://127.0.0.1:27017` or a remote Atlas URI)

### 2. Backend Server Setup
1. Move to the server directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/sfppl_db
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

### 3. Frontend Web Client Setup
1. Move to the client directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 🏢 Corporate Specifications Reference

* **Registered Entity**: SADAF FOOD PROCESSORS PRIVATE LIMITED (SFPPL)
* **Incorporation Date**: 13 December 2012 (RoC Patna)
* **Corporate Identity Number (CIN)**: U15400BR2012PTC019623
* **Primary Processing plant**: Katara Road Processing Unit, Muzaffarpur, Bihar
* **Corporate Headquarters**: Mourya Lok Complex, Block C, 3rd Floor, Fraser Road, Patna, Bihar
* **Board of Directors**: 
  * **Irshad Alam** (Managing Director)
  * **Zinat Jahan** (Director & CFO)
* **Primary Contacts**: contact@sfppl.com | www.sfppl.com
