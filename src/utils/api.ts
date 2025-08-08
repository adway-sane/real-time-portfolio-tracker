import { CryptoApiResponse } from '@/types';

// Client-side API functions that work with static export
export const fetchCryptoData = async (symbols: string[]): Promise<{ [key: string]: { price: number; change24h: number; symbol: string } }> => {
  try {
    // Convert symbols to CoinGecko IDs (basic mapping)
    const symbolToId: { [key: string]: string } = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'ADA': 'cardano',
      'DOT': 'polkadot',
      'LINK': 'chainlink',
      'LTC': 'litecoin',
      'XRP': 'ripple',
      'BCH': 'bitcoin-cash',
      'BNB': 'binancecoin',
      'SOL': 'solana',
      'AVAX': 'avalanche-2',
      'MATIC': 'matic-network',
      'UNI': 'uniswap',
      'ATOM': 'cosmos',
      'ALGO': 'algorand'
    };

    const coinIds = symbols.map(symbol => symbolToId[symbol.toUpperCase()]).filter(Boolean);

    if (coinIds.length === 0) {
      throw new Error('No valid crypto symbols found');
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&include_24hr_change=true`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data: CryptoApiResponse = await response.json();
    
    // Transform the data to include symbol information
    const transformedData: { [key: string]: { price: number; change24h: number; symbol: string } } = {};
    
    symbols.forEach(symbol => {
      const coinId = symbolToId[symbol.toUpperCase()];
      if (coinId && data[coinId]) {
        transformedData[symbol.toUpperCase()] = {
          price: data[coinId].usd,
          change24h: data[coinId].usd_24h_change || 0,
          symbol: symbol.toUpperCase()
        };
      }
    });

    return transformedData;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
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
