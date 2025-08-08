import { NextRequest, NextResponse } from 'next/server';
import { CryptoApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols');
    
    if (!symbols) {
      return NextResponse.json({ error: 'Symbols parameter is required' }, { status: 400 });
    }

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

    const symbolArray = symbols.split(',');
    const coinIds = symbolArray.map(symbol => symbolToId[symbol.toUpperCase()]).filter(Boolean);

    if (coinIds.length === 0) {
      return NextResponse.json({ error: 'No valid crypto symbols found' }, { status: 400 });
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
    
    symbolArray.forEach(symbol => {
      const coinId = symbolToId[symbol.toUpperCase()];
      if (coinId && data[coinId]) {
        transformedData[symbol.toUpperCase()] = {
          price: data[coinId].usd,
          change24h: data[coinId].usd_24h_change || 0,
          symbol: symbol.toUpperCase()
        };
      }
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crypto data' },
      { status: 500 }
    );
  }
}
