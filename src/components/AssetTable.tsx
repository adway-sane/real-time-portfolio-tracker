'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Asset } from '@/types';
import { formatPercentage, getChangeColor, getChangeBgColor } from '@/utils/formatters';

interface AssetTableProps {
  assets: Asset[];
}

export default function AssetTable({ assets }: AssetTableProps) {
  if (assets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl"
      >
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">No assets in portfolio</div>
          <div className="text-gray-500 text-sm">Add some assets to get started</div>
        </div>
      </motion.div>
    );
  }

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp size={16} />;
    if (change < 0) return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl overflow-hidden"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Portfolio Assets</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-300 text-sm border-b border-white/20">
              <th className="text-left py-3 px-2">Asset</th>
              <th className="text-right py-3 px-2">Price</th>
              <th className="text-right py-3 px-2">24h Change</th>
              <th className="text-right py-3 px-2">Holdings</th>
              <th className="text-right py-3 px-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <motion.tr
                key={asset.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                {/* Asset Info */}
                <td className="py-4 px-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      asset.type === 'crypto' 
                        ? 'bg-gradient-to-r from-orange-400 to-yellow-500' 
                        : 'bg-gradient-to-r from-blue-400 to-green-500'
                    }`} />
                    <div>
                      <div className="text-white font-medium">{asset.symbol}</div>
                      <div className="text-gray-400 text-sm capitalize">{asset.type}</div>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="py-4 px-2 text-right">
                  <div className="text-white font-medium">
                    <CountUp
                      start={0}
                      end={asset.currentPrice}
                      duration={1}
                      decimals={asset.currentPrice < 1 ? 6 : 2}
                      prefix="$"
                      separator=","
                    />
                  </div>
                </td>

                {/* 24h Change */}
                <td className="py-4 px-2 text-right">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    getChangeBgColor(asset.priceChangePercent24h)
                  }`}>
                    {getTrendIcon(asset.priceChangePercent24h)}
                    <span>{formatPercentage(asset.priceChangePercent24h)}</span>
                  </div>
                </td>

                {/* Holdings */}
                <td className="py-4 px-2 text-right">
                  <div className="text-white font-medium">
                    <CountUp
                      start={0}
                      end={asset.quantity}
                      duration={1}
                      decimals={asset.quantity < 1 ? 4 : 2}
                      separator=","
                    />
                  </div>
                </td>

                {/* Total Value */}
                <td className="py-4 px-2 text-right">
                  <div className="text-white font-semibold">
                    <CountUp
                      start={0}
                      end={asset.totalValue}
                      duration={1.5}
                      decimals={2}
                      prefix="$"
                      separator=","
                    />
                  </div>
                  <div className={`text-sm ${getChangeColor(asset.priceChange24h)}`}>
                    <CountUp
                      start={0}
                      end={asset.priceChange24h * asset.quantity}
                      duration={1.5}
                      decimals={2}
                      prefix={asset.priceChange24h >= 0 ? '+$' : '-$'}
                      separator=","
                    />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
