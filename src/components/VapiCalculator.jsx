"use client";

import React, { useState, useEffect } from 'react';

const VapiCalculator = () => {
  const [mounted, setMounted] = useState(false);
  const [minutes, setMinutes] = useState(100);
  const [voiceProvider, setVoiceProvider] = useState('elevenlabs');
  const [telephonyProvider, setTelephonyProvider] = useState('deepgram');
  const [llmProvider, setLlmProvider] = useState('gpt4o-mini-cluster');
  const [automation, setAutomation] = useState(0);
  const [crm, setCrm] = useState(0);
  const [profit, setProfit] = useState(30);
  const [totalCost, setTotalCost] = useState(0);
  const [extraCosts, setExtraCosts] = useState([]);

  // Definimos los costos base
  const costs = {
    voice: {
      cartesia: 0.022,
      elevenlabs: 0.036,
      deepgram: 0.011,
      openai: 0.011,
      azure: 0.011
    },
    telephony: {
      deepgram: 0.01,
      talkscriber: 0.011,
      azure: 0.017
    },
    llm: {
      'gpt4o-mini-cluster': 0.01,
      'gpt4o-cluster': 0.02,
      'gpt4o-mini-realtime': 0.10,
      'gpt4o-realtime': 0.38,
      'gpt3o-mini-cluster': 0.03
    }
  };

  const calculateTotal = () => {
    if (!mounted) return;

    const voiceCost = minutes * costs.voice[voiceProvider];
    const telephonyCost = minutes * costs.telephony[telephonyProvider];
    const llmCost = minutes * costs.llm[llmProvider];
    const extraCostsTotal = extraCosts.reduce((sum, cost) => {
      const amount = Number(cost.amount);
      return sum + (cost.type === 'perMinute' ? amount * minutes : amount);
    }, 0);
    
    const subtotal = voiceCost + telephonyCost + llmCost + Number(automation) + Number(crm) + extraCostsTotal;
    const profitAmount = subtotal * (profit / 100);
    const total = subtotal + profitAmount;
    
    setTotalCost(total);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      calculateTotal();
    }
  }, [mounted, minutes, voiceProvider, telephonyProvider, llmProvider, automation, crm, profit, extraCosts]);

  const addExtraCost = () => {
    setExtraCosts([...extraCosts, { description: '', amount: 0, type: 'fixed' }]);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Vapi AI
        </h1>
        <h2 className="text-xl text-center mb-8 text-gray-600">
          Calculadora de Costos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Minutos */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Minutos</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMinutes(Math.max(0, minutes - 10))}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold py-2 px-4 rounded-lg transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Minutos"
              />
              <button
                onClick={() => setMinutes(minutes + 10)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold py-2 px-4 rounded-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Telefonía */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Telefonía</label>
            <select
              value={telephonyProvider}
              onChange={(e) => setTelephonyProvider(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="deepgram">Deepgram ($0.010/min)</option>
              <option value="talkscriber">Talkscriber ($0.011/min)</option>
              <option value="azure">Azure ($0.017/min)</option>
            </select>
          </div>

          {/* Voz */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Voz</label>
            <select
              value={voiceProvider}
              onChange={(e) => setVoiceProvider(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="cartesia">Cartesia ($0.022/min)</option>
              <option value="elevenlabs">ElevenLabs ($0.036/min)</option>
              <option value="deepgram">Deepgram ($0.011/min)</option>
              <option value="openai">OpenAI ($0.011/min)</option>
              <option value="azure">Azure ($0.011/min)</option>
            </select>
          </div>

          {/* LLM */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">LLM</label>
            <select
              value={llmProvider}
              onChange={(e) => setLlmProvider(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="gpt4o-mini-cluster">GPT-4o Mini Cluster ($0.01/min)</option>
              <option value="gpt4o-cluster">GPT-4o Cluster ($0.02/min)</option>
              <option value="gpt4o-mini-realtime">GPT-4o Mini Realtime Cluster ($0.10/min)</option>
              <option value="gpt4o-realtime">GPT-4o Realtime Cluster ($0.38/min)</option>
              <option value="gpt3o-mini-cluster">GPT-3o Mini Cluster ($0.03/min)</option>
            </select>
          </div>

          {/* Automatización */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Automatización (USD)</label>
            <input
              type="number"
              value={automation}
              onChange={(e) => setAutomation(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>

          {/* CRM */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">CRM (USD)</label>
            <input
              type="number"
              value={crm}
              onChange={(e) => setCrm(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Costos Extra */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Costos Extra</h3>
            <button
              onClick={addExtraCost}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Agregar Costo Extra
            </button>
          </div>
          
          {extraCosts.map((cost, index) => (
            <div key={index} className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="Descripción"
                value={cost.description}
                onChange={(e) => {
                  const newCosts = [...extraCosts];
                  newCosts[index].description = e.target.value;
                  setExtraCosts(newCosts);
                }}
                className="flex-1 px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Valor"
                value={cost.amount}
                onChange={(e) => {
                  const newCosts = [...extraCosts];
                  newCosts[index].amount = Number(e.target.value);
                  setExtraCosts(newCosts);
                }}
                className="w-32 px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={cost.type}
                onChange={(e) => {
                  const newCosts = [...extraCosts];
                  newCosts[index].type = e.target.value;
                  setExtraCosts(newCosts);
                }}
                className="w-40 px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="fixed">Fijo</option>
                <option value="perMinute">Por Minuto</option>
              </select>
              <button
                onClick={() => {
                  const newCosts = extraCosts.filter((_, i) => i !== index);
                  setExtraCosts(newCosts);
                }}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Ganancia */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ganancia (%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={profit}
            onChange={(e) => setProfit(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center text-sm text-gray-600 mt-2">{profit}%</div>
        </div>

        {/* Costo Total */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-medium mb-2">Costo Total (tiene 3 decimales)</h3>
          <div className="text-4xl font-bold">${totalCost.toFixed(3)} USD</div>
        </div>

        {/* Powered by */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Powered by{' '}
          <a
            href="https://www.youtube.com/@Tincho.Olivero/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:opacity-80 transition-opacity"
          >
            Tincho.Olivero
          </a>
        </div>
      </div>
    </div>
  );
};

export default VapiCalculator;