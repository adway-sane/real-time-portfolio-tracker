'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Asset } from '@/types';
import { generateId } from '@/utils/formatters';

interface PortfolioFormProps {
  onAddAsset: (asset: Omit<Asset, 'currentPrice' | 'priceChange24h' | 'priceChangePercent24h' | 'totalValue'>) => void;
  onRemoveAsset: (id: string) => void;
  assets: Asset[];
}

const CRYPTO_SYMBOLS = ['BTC', 'ETH', 'ADA', 'DOT', 'LINK', 'LTC', 'XRP', 'BCH', 'BNB', 'SOL', 'AVAX', 'MATIC', 'UNI', 'ATOM', 'ALGO'];
const STOCK_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'AMD', 'INTC'];

export default function PortfolioForm({ onAddAsset, onRemoveAsset, assets }: PortfolioFormProps) {
  const [assetType, setAssetType] = useState<'crypto' | 'stock'>('crypto');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = assetType === 'crypto' ? CRYPTO_SYMBOLS : STOCK_SYMBOLS;
  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(symbol.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symbol || !quantity || parseFloat(quantity) <= 0) {
      return;
    }

    const newAsset = {
      id: generateId(),
      type: assetType,
      symbol: symbol.toUpperCase(),
      name: symbol.toUpperCase(), // We'll update this when we fetch the data
      quantity: parseFloat(quantity),
    };

    onAddAsset(newAsset);
    setSymbol('');
    setQuantity('');
    setShowSuggestions(false);
  };

  const handleSymbolSelect = (selectedSymbol: string) => {
    setSymbol(selectedSymbol);
    setShowSuggestions(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Add to Portfolio</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Asset Type Toggle */}
        <div className="flex space-x-1 bg-black/20 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setAssetType('crypto')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              assetType === 'crypto'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Crypto
          </button>
          <button
            type="button"
            onClick={() => setAssetType('stock')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              assetType === 'stock'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Stock
          </button>
        </div>

        {/* Symbol Input with Autocomplete */}
        <div className="relative">
          <input
            type="text"
            value={symbol}
            onChange={(e) => {
              setSymbol(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(symbol.length > 0)}
            placeholder={`Enter ${assetType} symbol (e.g., ${assetType === 'crypto' ? 'BTC' : 'AAPL'})`}
            className="w-full px-4 py-3 bg-black/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-1 bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-10 max-h-40 overflow-y-auto"
            >
              {filteredSuggestions.slice(0, 8).map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSymbolSelect(suggestion)}
                  className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Quantity Input */}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          step="any"
          min="0"
          className="w-full px-4 py-3 bg-black/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Add Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Asset</span>
        </motion.button>
      </form>

      {/* Current Assets */}
      {assets.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-white mb-3">Current Assets</h3>
          <div className="space-y-2">
            {assets.map((asset) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between bg-black/20 rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    asset.type === 'crypto' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <span className="text-white font-medium">{asset.symbol}</span>
                  <span className="text-gray-300">×{asset.quantity}</span>
                </div>
                <button
                  onClick={() => onRemoveAsset(asset.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
