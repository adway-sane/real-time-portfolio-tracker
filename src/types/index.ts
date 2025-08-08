export interface Asset {
  id: string;
  type: 'crypto' | 'stock';
  symbol: string;
  name: string;
  quantity: number;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  totalValue: number;
  logo?: string;
}

export interface Portfolio {
  assets: Asset[];
  totalValue: number;
  totalChange24h: number;
  totalChangePercent24h: number;
}

export interface CryptoApiResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

export interface StockApiResponse {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
}

export interface PieChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}
