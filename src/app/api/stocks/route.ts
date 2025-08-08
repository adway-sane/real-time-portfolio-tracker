import { NextRequest, NextResponse } from 'next/server';

// For demo purposes, we'll use mock data since Alpha Vantage requires an API key
// In production, you would get an API key from https://www.alphavantage.co/
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols');
    
    if (!symbols) {
      return NextResponse.json({ error: 'Symbols parameter is required' }, { status: 400 });
    }

    const symbolArray = symbols.split(',').map(s => s.toUpperCase());
    const result: { [key: string]: { price: number; change24h: number; symbol: string } } = {};

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    symbolArray.forEach(symbol => {
      if (MOCK_STOCK_DATA[symbol]) {
        // Add some random variation to make it feel more realistic
        const baseData = MOCK_STOCK_DATA[symbol];
        const priceVariation = (Math.random() - 0.5) * 0.02; // ±1% variation
        const changeVariation = (Math.random() - 0.5) * 0.5; // ±0.25% variation
        
        result[symbol] = {
          price: baseData.price * (1 + priceVariation),
          change24h: baseData.change24h + changeVariation,
          symbol: symbol
        };
      }
    });

    if (Object.keys(result).length === 0) {
      return NextResponse.json({ error: 'No valid stock symbols found' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}

// Uncomment and use this function if you have an Alpha Vantage API key
/*
async function fetchRealStockData(symbol: string, apiKey: string) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
  );
  
  if (!response.ok) {
    throw new Error(`Alpha Vantage API error: ${response.status}`);
  }
  
  const data = await response.json();
  const quote = data['Global Quote'];
  
  return {
    price: parseFloat(quote['05. price']),
    change24h: parseFloat(quote['10. change percent'].replace('%', '')),
    symbol: symbol
  };
}
*/
