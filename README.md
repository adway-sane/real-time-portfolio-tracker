# 📈 Real-Time Stock & Crypto Portfolio Tracker

A sleek, modern dashboard for tracking your stock and cryptocurrency portfolio in real-time with beautiful charts, live updates, and smooth animations.

![Portfolio Tracker Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Portfolio+Tracker+Dashboard)

## ✨ Features

### 🎯 Core Features
- **Real-time Price Updates** - Live crypto and stock prices with 30-second auto-refresh
- **Interactive Portfolio Management** - Add/remove assets with autocomplete search
- **Beautiful Visualizations** - Line charts for performance and pie charts for allocation
- **Animated UI** - Smooth transitions and counter animations using Framer Motion
- **Glassmorphism Design** - Modern glass effect with backdrop blur
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 📊 Data & Analytics
- **Portfolio Overview** - Total value, 24h change, and asset count
- **Asset Performance** - Individual asset tracking with profit/loss indicators
- **Historical Data** - 7-day portfolio performance visualization
- **Asset Allocation** - Visual breakdown of portfolio distribution

### 🎨 UI/UX Features
- **Glassmorphism Effects** - Beautiful translucent cards with backdrop blur
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Animated Counters** - CountUp animations for all numerical values
- **Trend Indicators** - Color-coded profit/loss with trend arrows
- **Modern Typography** - Clean, readable fonts with proper hierarchy

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: CoinGecko (Crypto) + Mock Stock Data

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Adding Assets
1. Select asset type (Crypto or Stock)
2. Type the symbol (e.g., BTC, AAPL) - autocomplete will help
3. Enter the quantity you own
4. Click "Add Asset"

### Supported Assets

**Cryptocurrencies:**
- BTC (Bitcoin), ETH (Ethereum), ADA (Cardano)
- DOT (Polkadot), LINK (Chainlink), LTC (Litecoin)
- XRP (Ripple), BCH (Bitcoin Cash), BNB (Binance Coin)
- SOL (Solana), AVAX (Avalanche), MATIC (Polygon)
- UNI (Uniswap), ATOM (Cosmos), ALGO (Algorand)

**Stocks:**
- AAPL (Apple), GOOGL (Google), MSFT (Microsoft)
- AMZN (Amazon), TSLA (Tesla), META (Meta)
- NVDA (NVIDIA), NFLX (Netflix), AMD (AMD), INTC (Intel)

### Features in Action
- **Auto-refresh**: Prices update every 30 seconds
- **Manual refresh**: Click the refresh button in the navbar
- **Dark mode**: Toggle with the sun/moon icon
- **Remove assets**: Click the X button next to any asset

## 🔧 Configuration

### API Keys (Optional)
For production use with real stock data:

1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/)
2. Uncomment the real API implementation in `/src/app/api/stocks/route.ts`
3. Add your API key to environment variables

### Customization
- **Colors**: Modify color schemes in `/src/components/Dashboard.tsx`
- **Refresh Rate**: Change the interval in the Dashboard component
- **Supported Assets**: Add more symbols to the arrays in PortfolioForm

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Deploy with one click
4. Get your live demo URL!

### Other Platforms
This is a standard Next.js app and can be deployed on:
- Netlify
- Railway
- AWS Amplify
- Any platform supporting Node.js

## 📈 Resume Description

**Real-Time Stock & Crypto Portfolio Tracker** *(Live Demo)* — **Next.js, TypeScript, Chart.js, CoinGecko API**

- Developed a real-time portfolio dashboard integrating cryptocurrency and stock market data from public APIs
- Built interactive data visualizations with Chart.js and implemented smooth animations using Framer Motion
- Designed a modern glassmorphism UI with dark mode toggle and responsive design using Tailwind CSS
- Implemented live price updates with 30-second polling and animated counter components for enhanced UX

## 🎯 Key Highlights for Interviews

1. **API Integration** - Demonstrates ability to work with external APIs and handle async data
2. **State Management** - Complex state handling for real-time updates and user interactions
3. **Performance** - Optimized rendering with proper React patterns and efficient updates
4. **UI/UX Design** - Modern design trends with attention to user experience
5. **TypeScript** - Strong typing throughout the application for maintainability

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 🤝 Contributing

Feel free to open issues and pull requests to improve this project!

---

**Made with ❤️ for developers building impressive portfolios**