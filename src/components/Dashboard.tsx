'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { Asset, Portfolio, ChartData, PieChartData } from '@/types';
import { getChangeColor } from '@/utils/formatters';
import { fetchCryptoData, fetchStockData } from '@/utils/api';
import Navbar from './Navbar';
import PortfolioForm from './PortfolioForm';
import AssetTable from './AssetTable';
import ChartCard from './ChartCard';

const CRYPTO_COLORS = [
  '#F7931A', // Bitcoin Orange
  '#3C3C3D', // Ethereum Gray
  '#0033AD', // Cardano Blue
  '#E6007A', // Polkadot Pink
  '#375BD2', // Chainlink Blue
  '#345D9D', // Litecoin Blue
  '#00AAE4', // XRP Blue
  '#8DC351', // Bitcoin Cash Green
];

const STOCK_COLORS = [
  '#4F46E5', // Indigo
  '#059669', // Emerald
  '#DC2626', // Red
  '#7C3AED', // Violet
  '#EA580C', // Orange
  '#0891B2', // Cyan
  '#BE185D', // Pink
  '#65A30D', // Lime
];

export default function Dashboard() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    assets: [],
    totalValue: 0,
    totalChange24h: 0,
    totalChangePercent24h: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [historicalData, setHistoricalData] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Add error boundary
  useEffect(() => {
    console.log('Dashboard component mounted');
    try {
      // Test if all dependencies are loaded
      console.log('Framer Motion available:', !!motion);
      console.log('CountUp available:', !!CountUp);
    } catch (err) {
      console.error('Error initializing Dashboard:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  // Generate mock historical data for the chart
  const generateHistoricalData = useCallback((currentValue: number) => {
    const data = [];
    const days = 7;
    let baseValue = currentValue * 0.95; // Start slightly lower
    
    for (let i = 0; i < days; i++) {
      const randomChange = (Math.random() - 0.5) * 0.1; // ±5% daily change
      baseValue = baseValue * (1 + randomChange);
      data.push(baseValue);
    }
    
    data[data.length - 1] = currentValue; // Ensure last value matches current
    return data;
  }, []);

  const fetchAssetPrices = useCallback(async () => {
    if (assets.length === 0) return;

    setIsLoading(true);
    try {
      const cryptoAssets = assets.filter(asset => asset.type === 'crypto');
      const stockAssets = assets.filter(asset => asset.type === 'stock');

      const promises = [];

      if (cryptoAssets.length > 0) {
        const cryptoSymbols = cryptoAssets.map(asset => asset.symbol);
        promises.push(
          fetchCryptoData(cryptoSymbols)
            .then(data => ({ type: 'crypto', data }))
        );
      }

      if (stockAssets.length > 0) {
        const stockSymbols = stockAssets.map(asset => asset.symbol);
        promises.push(
          fetchStockData(stockSymbols)
            .then(data => ({ type: 'stock', data }))
        );
      }

      const results = await Promise.all(promises);
      
      const updatedAssets = assets.map(asset => {
        const result = results.find(r => r.type === asset.type);
        if (result && result.data[asset.symbol]) {
          const priceData = result.data[asset.symbol];
          return {
            ...asset,
            currentPrice: priceData.price,
            priceChange24h: priceData.change24h,
            priceChangePercent24h: priceData.change24h,
            totalValue: priceData.price * asset.quantity,
          };
        }
        return asset;
      });

      setAssets(updatedAssets);
      
      // Calculate portfolio totals
      const totalValue = updatedAssets.reduce((sum, asset) => sum + asset.totalValue, 0);
      const totalChange24h = updatedAssets.reduce((sum, asset) => 
        sum + (asset.priceChange24h * asset.quantity), 0
      );
      const totalChangePercent24h = totalValue > 0 ? (totalChange24h / (totalValue - totalChange24h)) * 100 : 0;

      setPortfolio({
        assets: updatedAssets,
        totalValue,
        totalChange24h,
        totalChangePercent24h,
      });

      // Generate historical data
      setHistoricalData(generateHistoricalData(totalValue));

    } catch (error) {
      console.error('Error fetching asset prices:', error);
    } finally {
      setIsLoading(false);
    }
  }, [assets, generateHistoricalData]);

  const handleAddAsset = (newAsset: Omit<Asset, 'currentPrice' | 'priceChange24h' | 'priceChangePercent24h' | 'totalValue'>) => {
    const asset: Asset = {
      ...newAsset,
      currentPrice: 0,
      priceChange24h: 0,
      priceChangePercent24h: 0,
      totalValue: 0,
    };
    setAssets(prev => [...prev, asset]);
  };

  const handleRemoveAsset = (id: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
  };

  const handleRefresh = () => {
    fetchAssetPrices();
  };

  // Fetch prices when assets change
  useEffect(() => {
    if (assets.length > 0) {
      fetchAssetPrices();
    }
  }, [assets.length, fetchAssetPrices]); // Only trigger when assets length changes

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (assets.length === 0) return;

    const interval = setInterval(() => {
      fetchAssetPrices();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchAssetPrices, assets.length]);

  // Chart data
  const lineChartData: ChartData = {
    labels: ['6d ago', '5d ago', '4d ago', '3d ago', '2d ago', '1d ago', 'Today'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: historicalData,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
      },
    ],
  };

  const pieChartData: PieChartData = {
    labels: assets.map(asset => asset.symbol),
    datasets: [
      {
        data: assets.map(asset => asset.totalValue),
        backgroundColor: assets.map((asset, index) => {
          const colors = asset.type === 'crypto' ? CRYPTO_COLORS : STOCK_COLORS;
          return colors[index % colors.length];
        }),
        borderWidth: 2,
        borderColor: assets.map(() => 'rgba(255, 255, 255, 0.2)'),
      },
    ],
  };

  // Show error if there's one
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Portfolio Tracker</h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Navbar onRefresh={handleRefresh} isLoading={isLoading} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Debug info - remove in production */}
        <div className="mb-4 p-4 bg-black/20 rounded-lg text-xs text-gray-300">
          <p>Debug: Dashboard loaded successfully</p>
          <p>Assets: {assets.length}</p>
          <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
          <p>Error: {error || 'None'}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Form */}
          <div className="lg:col-span-1">
            <PortfolioForm 
              onAddAsset={handleAddAsset}
              onRemoveAsset={handleRemoveAsset}
              assets={assets}
            />
          </div>

          {/* Portfolio Overview */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Value */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-300 text-sm">Total Value</div>
                  <DollarSign className="text-green-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  <CountUp
                    start={0}
                    end={portfolio.totalValue}
                    duration={2}
                    decimals={2}
                    prefix="$"
                    separator=","
                  />
                </div>
                <div className={`text-sm ${getChangeColor(portfolio.totalChange24h)}`}>
                  <CountUp
                    start={0}
                    end={portfolio.totalChange24h}
                    duration={2}
                    decimals={2}
                    prefix={portfolio.totalChange24h >= 0 ? '+$' : '-$'}
                    separator=","
                  />
                  {' '}24h
                </div>
              </motion.div>

              {/* 24h Change % */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-300 text-sm">24h Change</div>
                  <Percent className="text-blue-400" size={20} />
                </div>
                <div className={`text-2xl font-bold mb-1 ${getChangeColor(portfolio.totalChangePercent24h)}`}>
                  <CountUp
                    start={0}
                    end={portfolio.totalChangePercent24h}
                    duration={2}
                    decimals={2}
                    suffix="%"
                    prefix={portfolio.totalChangePercent24h >= 0 ? '+' : ''}
                  />
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  {portfolio.totalChangePercent24h >= 0 ? (
                    <TrendingUp size={16} className="mr-1" />
                  ) : (
                    <TrendingDown size={16} className="mr-1" />
                  )}
                  {portfolio.totalChangePercent24h >= 0 ? 'Profit' : 'Loss'}
                </div>
              </motion.div>

              {/* Assets Count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-300 text-sm">Assets</div>
                  <TrendingUp className="text-purple-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  <CountUp
                    start={0}
                    end={assets.length}
                    duration={1}
                  />
                </div>
                <div className="text-sm text-gray-400">
                  {assets.filter(a => a.type === 'crypto').length} crypto,{' '}
                  {assets.filter(a => a.type === 'stock').length} stocks
                </div>
              </motion.div>
            </div>

            {/* Charts */}
            {assets.length > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                <ChartCard
                  title="Portfolio Performance"
                  type="line"
                  data={lineChartData}
                  height={250}
                />
                <ChartCard
                  title="Asset Allocation"
                  type="pie"
                  data={pieChartData}
                  height={250}
                />
              </div>
            )}
          </div>
        </div>

        {/* Asset Table */}
        <div className="mt-8">
          <AssetTable assets={assets} />
        </div>
      </div>
    </div>
  );
}
