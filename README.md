# 🛒 Bazar Dor — বাজার দর

### A Modern Bengali Market Price Tracking Web Application

Bazar Dor is a modern, responsive web application designed to help users explore essential product prices through a clean and user-friendly Bengali interface. It provides category-based product browsing, current prices, historical price comparisons, and price change indicators.

The project is built with modern web technologies, focusing on performance, accessibility, responsive design, and a smooth user experience.

---

## ✨ Features

- 🏠 **Modern Homepage** — A clean and responsive interface.
- 📦 **Product Listings** — Browse essential products with detailed information.
- 🗂️ **Category-Based Browsing** — Explore products by category.
- 💰 **Price Tracking** — View today's prices and compare them with previous prices.
- 📊 **Price Comparison** — Compare daily, weekly, and monthly prices.
- 📈 **Price Change Indicators** — Identify price increases and decreases.
- 🇧🇩 **Bengali Interface** — Designed for Bengali-speaking users.
- 🔐 **Authentication** — Sign-in, sign-up, and session-based user access.
- 👤 **User Profile** — Access and manage user account information.
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop screens.
- ⚡ **Optimized Data Fetching** — Uses Next.js data fetching and caching features.

## 🛠️ Tech Stack

| Technology     | Purpose                            |
| -------------- | ---------------------------------- |
| Next.js        | React framework and App Router     |
| React.js       | Component-based UI                 |
| TypeScript     | Type safety                        |
| Tailwind CSS   | Responsive styling                 |
| REST API       | Product and category data          |
| Authentication | User sessions and protected routes |
| Git & GitHub   | Version control                    |

## 📂 Project Structure

```text
bazar-dor/
├── app/
│   ├── category/
│   │   └── [catagoryid]/
│   │       └── page.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   └── auth-client.ts
│   ├── src/
│   │   └── component/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── Category.tsx
│   │       └── Marque.tsx
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── proxy.ts
├── package.json
├── tsconfig.json
└── README.md
```

_Note: This is an illustrative structure based on the project components discussed so far. Adjust the paths to match your actual repository._

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

**2. Navigate to the project directory**

```bash
cd YOUR_REPOSITORY
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and add the environment variables required by your authentication and API configuration.

```env
# Add your required environment variables here
```

Never commit secret keys, private credentials, or production environment variables to GitHub.

**5. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 API Integration

Bazar Dor fetches product and category information from REST API endpoints.

**Categories**

```text
https://api.api-store.workers.dev/api/bazardor/categories
```

**Products**

```text
https://api.abcz.workers.dev/api/bazardor/products
```

The application uses product information such as:

- Product name and category
- Product image or icon
- Current market price
- Previous daily, weekly, and monthly prices
- Price change direction and percentage

API availability and response formats may change independently of this repository.

## 🎨 Design Philosophy

Bazar Dor follows a clean, minimal, and modern design approach.

- Green and white color palette
- Bengali-first user interface
- Reusable React components
- Responsive layouts
- Clear product price presentation
- Consistent spacing and typography

## 🧑‍💻 Development

This project is built using the Next.js App Router and TypeScript. The UI is organized into reusable components, while product and category information is fetched from API endpoints.

The codebase is intended to be maintainable, scalable, and easy to extend with additional features.

## 🔮 Future Improvements

- 🔎 Product search and advanced filtering
- 📍 Location-based market prices
- 📉 Interactive price history charts
- ⭐ Favorite products and watchlists
- 🔔 Price change notifications
- 🛠️ Admin dashboard for product management
- 📊 Market price analytics and trends

_These are potential future improvements and are not necessarily implemented yet._

## 👨‍💻 Developer

**LUMINOUS HALDER ALEX**

- GitHub: [@luminasalex](https://github.com/luminasalex)
- Portfolio: [ax-alex.vercel.app](https://ax-alex.vercel.app/#contact)

## 📄 License

A license has not yet been specified. Add a `LICENSE` file if you intend to distribute the project under a particular open-source license.

---

<p align="center">
  Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS.
</p>

<p align="center">
  <b>Bazar Dor — বাজার দর</b>
</p>
