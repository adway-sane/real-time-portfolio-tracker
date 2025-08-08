// Client-side API functions that work with static export
export const fetchCryptoData = async (symbols: string[]): Promise<{ [key: string]: { price: number; change24h: number; symbol: string } }> => {
  // Mock crypto data for demo (to avoid CORS issues)
  const MOCK_CRYPTO_DATA: { [key: string]: { price: number; change24h: number; symbol: string } } = {
    'BTC': { price: 43250.67, change24h: 2.15, symbol: 'BTC' },
    'ETH': { price: 2650.43, change24h: -1.23, symbol: 'ETH' },
    'ADA': { price: 0.485, change24h: 0.87, symbol: 'ADA' },
    'DOT': { price: 7.23, change24h: -0.45, symbol: 'DOT' },
    'LINK': { price: 15.67, change24h: 3.21, symbol: 'LINK' },
    'LTC': { price: 72.34, change24h: 1.54, symbol: 'LTC' },
    'XRP': { price: 0.523, change24h: -0.76, symbol: 'XRP' },
    'BCH': { price: 245.89, change24h: 2.87, symbol: 'BCH' },
    'BNB': { price: 312.45, change24h: -0.34, symbol: 'BNB' },
    'SOL': { price: 98.76, change24h: 4.21, symbol: 'SOL' },
    'AVAX': { price: 23.45, change24h: 1.92, symbol: 'AVAX' },
    'MATIC': { price: 0.89, change24h: -0.23, symbol: 'MATIC' },
    'UNI': { price: 8.76, change24h: 0.67, symbol: 'UNI' },
    'ATOM': { price: 12.34, change24h: -1.45, symbol: 'ATOM' },
    'ALGO': { price: 0.156, change24h: 0.89, symbol: 'ALGO' }
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const result: { [key: string]: { price: number; change24h: number; symbol: string } } = {};

  symbols.forEach(symbol => {
    if (MOCK_CRYPTO_DATA[symbol.toUpperCase()]) {
      // Add some random variation to make it feel more realistic
      const baseData = MOCK_CRYPTO_DATA[symbol.toUpperCase()];
      const priceVariation = (Math.random() - 0.5) * 0.02; // ±1% variation
      const changeVariation = (Math.random() - 0.5) * 0.5; // ±0.25% variation
      
      result[symbol.toUpperCase()] = {
        price: baseData.price * (1 + priceVariation),
        change24h: baseData.change24h + changeVariation,
        symbol: symbol.toUpperCase()
      };
    }
  });

  return result;
};

export const fetchStockData = async (symbols: string[]): Promise<{ [key: string]: { price: number; change24h: number; symbol: string } }> => {
  // Mock stock data for static export
  const MOCK_STOCK_DATA: { [key: string]: { price: number; change24h: number; symbol: string } } = {
    'AAPL': { price: 175.43, change24h: 2.15, symbol: 'AAPL' },
    'GOOGL': { price: 2847.52, change24h: -1.23, symbol: 'GOOGL' },
    'MSFT': { price: 338.54, change24h: 0.87, symbol: 'MSFT' },
    'AMZN': { price: 3302.37, change24h: -0.45, symbol: 'AMZN' },
    'TSLA': { price: 248.50, change24h: 3.21, symbol: 'TSLA' },
    'META': { price: 325.67, change24h: 1.54, symbol: 'META' },
    'NVDA': { price: 463.85, change24h: 2.87, symbol: 'NVDA' },
    'NFLX': { price: 445.23, change24h: -0.76, symbol: 'NFLX' },
    'AMD': { price: 115.34, change24h: 1.92, symbol: 'AMD' },
    'INTC': { price: 36.78, change24h: -0.34, symbol: 'INTC' }
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const result: { [key: string]: { price: number; change24h: number; symbol: string } } = {};

  symbols.forEach(symbol => {
    if (MOCK_STOCK_DATA[symbol.toUpperCase()]) {
      // Add some random variation to make it feel more realistic
      const baseData = MOCK_STOCK_DATA[symbol.toUpperCase()];
      const priceVariation = (Math.random() - 0.5) * 0.02; // ±1% variation
      const changeVariation = (Math.random() - 0.5) * 0.5; // ±0.25% variation
      
      result[symbol.toUpperCase()] = {
        price: baseData.price * (1 + priceVariation),
        change24h: baseData.change24h + changeVariation,
        symbol: symbol.toUpperCase()
      };
    }
  });

  return result;
};
