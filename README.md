# 🏏 PRED-PWA — Sports Prediction Market (Progressive Web App)

**PRED-PWA** is a mobile-first, React + TypeScript PWA that simulates a real-time prediction market for IPL teams. It allows users to "trade belief" in their favorite teams by placing limit and market orders, viewing live order books, and tracking positions — all powered by mock data.

---

## Site URL

-   https://predpwa.netlify.app
-   https://pred-pwa.raiyanrazi.dev

---

## App Screenshots

<div style="display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap;">
  <img src="https://pred-pwa.s3.us-east-1.amazonaws.com/app_screenshot_1.png" alt="Image 1" width="430" height="932">
  <img src="https://pred-pwa.s3.us-east-1.amazonaws.com/app_screenshot_2.png" alt="Image 2" width="430" height="932">
  <img src="https://pred-pwa.s3.us-east-1.amazonaws.com/app_screenshot_3.png" alt="Image 3" width="430" height="932">
  <img src="https://pred-pwa.s3.us-east-1.amazonaws.com/app_screenshot_4.png" alt="Image 4" width="430" height="932">
</div>

## 📦 Tech Stack

-   **React + TypeScript**
-   **Vite** (assumed for PWA build speed and performance)
-   **React Router v6** — for dynamic routing (`/trades/:marketId`)
-   **TailwindCSS** — for styling
-   **React Hot Toast** — for in-app feedback
-   **Progressive Web App (PWA)** features for installability and mobile experience

---

## 🚀 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/RaziRaiyan/pred-pwa.git
cd pred-pwa

# 2. Install dependencies
yarn

# 3. Start development server
yarn dev

# 4. Open in browser
http://localhost:5173
```

> ✅ The app is fully offline-ready and installable as a PWA.

---

## 🧠 Architecture Overview

PRED-PWA is organized for clarity, reusability, and scalability. The app follows a **modular structure** with well-separated responsibilities:

```
src/
│
├── assets/              → Static files like images and fonts
│
├── components/          → Shared, reusable UI components
│   ├── BottomNav.tsx         → Fixed bottom navigation bar with route links
│   ├── Header.tsx            → Top header with logo and icons
│   ├── OrderBook.tsx         → Visual bid/ask table with dynamic bar widths
│   ├── Price.tsx             → Real-time price display
│   ├── Progress.tsx          → Order fill progress indicator
│   ├── Tabs.tsx              → Tab navigation
│   └── Slider/               → Custom slider input
│
├── configs/             → Local data and configuration
│   ├── dummy_data.ts         → Mock market data for all teams
│   └── index.tsx             → Optional configuration exports
│
├── hooks/               → Reusable logic with React hooks
│   └── useLocalStorage.ts    → Store user data locally between sessions
│
├── icons/               → All SVG-based icon components (React components)
│   └── *.tsx                 → StarIcon, MenuIcon, WalletIcon, etc.
│
├── pages/               → Page-level components used in routing
│   ├── Markets.tsx           → Lists all team markets
│   ├── Trade.tsx             → Trade screen with chart, order book, and inputs
│   ├── Wallet.tsx            → User's open orders and positions
│   └── Menu.tsx              → Static menu page
│
├── types/               → TypeScript interfaces and types
│   └── global.type.ts       → `Market`, `Order`, `Position` etc.
│
├── utility/             → Global utilities or wrappers
│   └── index.tsx             → App-wide providers or helpers
│
├── App.tsx              → Main routing setup, layout shell, viewport fix
├── App.css              → Core styling for layout and components
└── index.css            → Tailwind directives and base styles
```

---

## 📊 Market Simulation with Mock Data

Mock IPL market data lives in:

```
/src/configs/dummy_data.ts
```

Each market has:

-   `id`, `title`, `shortTitle`, `logo`, `price`, `change`, `volume`
-   `eventTitle`, `eventStartDate`, `eventEndDate`
-   `orderBook` with realistic `bids[]` and `asks[]`:
    ```ts
    orderBook: {
      bids: [
        { price: 0.34, shares: 1800 },
        ...
      ],
      asks: [
        { price: 0.345, shares: 2100 },
        ...
      ]
    }
    ```

This mock data powers:

-   Market list (`/markets`)
-   Individual trade screen (`/trades/:marketId`)
-   Order book UI with live-style bid/ask spread visualization
-   Position tracking & progress bars

---

## 🧩 Implementation Details

-   **Dynamic Routing**  
    `/trades/:marketId` uses `useParams()` to render market-specific trade screens.

-   **Order Matching (Conceptual)**  
    Orders are placed as limit or market, reflected in Open Orders. Partial fills are simulated through pre-filled mock order book levels.

-   **Responsive Layout**  
    PWA layout is mobile-optimized with a fixed BottomNav and scrollable middle pane.

---

## 📱 PWA Features

-   Installable on mobile home screen
-   Offline-friendly structure
-   Viewport height fix for iOS

---

## How to Install PWA on Mobile Safari

### Installation Steps

1. **Open Safari** on your iPhone/iPad

2. **Navigate to your app's URL** (e.g., yourapp.com)

3. **Tap the Share button** (square with arrow pointing up) at the bottom of the screen

4. **Scroll down and tap "Add to Home Screen"**

5. **Customize the app name** if needed, then tap "Add"

6. **The PWA icon appears on your home screen** - tap it to launch the app in full-screen mode

> **Note:** The app will now behave like a native app with its own icon and run without the Safari browser interface.

---

## PWA Lighthouse Scores

### Lighthouse Score for Trade Page

<div align="start">
  <img src="https://pred-pwa.s3.us-east-1.amazonaws.com/pred_pwa_lighthouse_trade.png" 
       alt="lighthouse trade page" 
       width="400px" 
       title="lighthouse trade page">
</div>

### Lighthouse Score for Markets Page

<div align="start">
  <img src="https://pred-pwa.s3.us-east-1.amazonaws.com/pred_pwa_lighthouse_markets.png" 
       alt="lighthouse markets page" 
       width="400px" 
       title="lighthouse markets page">
</div>

### Lighthouse Score for Wallet Page

<div align="start">
  <img src="https://pred-pwa.s3.us-east-1.amazonaws.com/pred_pwa_lighthouse_wallet.png" 
       alt="lighthouse wallet page" 
       width="400px" 
       title="lighthouse wallet page">
</div>

### Lighthouse Score for Menu Page

<div align="start">
  <img src="https://pred-pwa.s3.us-east-1.amazonaws.com/pred_pwa_lighthouse_menu.png" 
       alt="lighthouse menu page" 
       width="400px" 
       title="lighthouse menu page">
</div>

## 📲 PWA + Service Worker Setup

### This project uses vite-plugin-pwa to enable offline capabilities and installability.

-   🔧 Vite Configuration (vite.config.ts)

### ⚙️ PWA Behavior

-   autoUpdate ensures the service worker is always up to date.

-   manifest allows the app to be installable with a native-like experience.

-   Assets like icons and robots.txt are included in the final build.

-   When the user installs the app or loads it offline, the service worker caches the necessary assets.

---

## 🙌 Room for Improvement

-   Add micro-interactions when user lands on trade page for in spreads section
-   Add micro-interactions when price fluctuates for the positioned shares
-   Add accessibility support for the app
-   Slider input is currently not matching the design
-   Need to show the wallet amount in Bottom Nav instead of 'Wallet'

---

## 📝 License

MIT © 2025 Raiyan Razi
