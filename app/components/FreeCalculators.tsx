'use client';

import React, { useState } from 'react';
import { CreditCard, Wallet, Coins, ArrowRight } from 'lucide-react';

export default function FeeCalculators() {
  const [activeTab, setActiveTab] = useState<'paypal' | 'stripe' | 'crypto'>('paypal');
  const [inputValue, setInputValue] = useState<number>(100);

  // حسابات العمولات
  // PayPal Standard (Commercial Rate ~ 4.4% + $0.30)
  const paypalFee = inputValue * 0.044 + 0.30;
  const paypalNet = Math.max(0, inputValue - paypalFee);

  // Stripe Standard (Standard US Rate ~ 2.9% + $0.30)
  const stripeFee = inputValue * 0.029 + 0.30;
  const stripeNet = Math.max(0, inputValue - stripeFee);

  // Crypto / P2P Average (Binance P2P / Network fee ~ 1% fixed / TRC20 $1)
  const cryptoFee = 1.00; // $1 TRC20 Flat Fee
  const cryptoNet = Math.max(0, inputValue - cryptoFee);

  return (
    <div className="bg-zinc-900/60 backdrop-blur-2xl rounded-[32px] p-6 border border-white/10 shadow-2xl space-y-6">
      
      {/* Header Tabs */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Merchant & Gateway Fee Calculator</h2>
          <p className="text-xs text-zinc-500">Calculate exact payout after platform deduction fees</p>
        </div>

        {/* Segmented Control iOS Style */}
        <div className="bg-zinc-800/80 p-1 rounded-2xl flex border border-white/5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('paypal')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'paypal' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" /> PayPal
          </button>
          <button
            onClick={() => setActiveTab('stripe')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'stripe' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" /> Stripe
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'crypto' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" /> Crypto (USDT)
          </button>
        </div>
      </div>

      {/* Input Field */}
      <div className="bg-zinc-800/40 border border-white/5 rounded-2xl p-4">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
          {activeTab === 'paypal' && 'PayPal Transaction Amount ($)'}
          {activeTab === 'stripe' && 'Stripe Charge Amount ($)'}
          {activeTab === 'crypto' && 'USDT Transfer Amount ($)'}
        </label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(Math.max(0, parseFloat(e.target.value) || 0))}
          className="bg-transparent text-3xl font-bold text-white outline-none w-full"
        />
      </div>

      {/* Calculation Output Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total Fee */}
        <div className="bg-zinc-800/20 border border-white/5 p-4 rounded-2xl">
          <div className="text-xs text-zinc-400">Deducted Fee</div>
          <div className="text-xl font-bold text-red-400 mt-1">
            -${activeTab === 'paypal' ? paypalFee.toFixed(2) : activeTab === 'stripe' ? stripeFee.toFixed(2) : cryptoFee.toFixed(2)}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">
            {activeTab === 'paypal' && '4.4% + $0.30 standard rate'}
            {activeTab === 'stripe' && '2.9% + $0.30 standard rate'}
            {activeTab === 'crypto' && '$1.00 TRC20 network flat fee'}
          </div>
        </div>

        {/* Net Received */}
        <div className="bg-zinc-800/20 border border-white/5 p-4 rounded-2xl">
          <div className="text-xs text-zinc-400">You Receive (Net)</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            ${activeTab === 'paypal' ? paypalNet.toFixed(2) : activeTab === 'stripe' ? stripeNet.toFixed(2) : cryptoNet.toFixed(2)}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Amount after fee deduction</div>
        </div>

        {/* Invoice Target */}
        <div className="bg-zinc-800/20 border border-white/5 p-4 rounded-2xl">
          <div className="text-xs text-zinc-400">Ask/Invoice Amount</div>
          <div className="text-xl font-bold text-blue-400 mt-1">
            ${activeTab === 'paypal' 
              ? ((inputValue + 0.30) / (1 - 0.044)).toFixed(2) 
              : activeTab === 'stripe' 
              ? ((inputValue + 0.30) / (1 - 0.029)).toFixed(2) 
              : (inputValue + 1.00).toFixed(2)}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Charge this amount to get exact ${inputValue} net</div>
        </div>

      </div>

    </div>
  );
}