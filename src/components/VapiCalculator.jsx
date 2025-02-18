"use client";

import React, { useState, useEffect } from 'react';

const VapiCalculator = () => {
  // ... [Todo el código de estado y lógica se mantiene igual] ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-black p-6 flex flex-col items-center justify-center">
      {/* Título fuera del contenedor principal */}
      <h1 className="text-5xl font-bold text-center mb-2 text-white">
        Vapi AI
      </h1>
      <h2 className="text-2xl text-center mb-8 text-white/80">
        Calculadora de Costos
      </h2>

      {/* Contenedor principal */}
      <div className="w-full max-w-4xl bg-black/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-green-500/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Minutos */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-emerald-400">Minutos</label>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMinutes(Math.max(0, minutes - 10))}
                className="bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-400 font-bold py-2 px-4 rounded-lg transition-colors border border-emerald-700/50"
              >
                -
              </button>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-black/50 border border-emerald-700/50 rounded-lg shadow-sm text-emerald-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Minutos"
              />
              <button
                onClick={() => setMinutes(minutes + 10)}
                className="bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-400 font-bold py-2 px-4 rounded-lg transition-colors border border-emerald-700/50"
              >
                +
              </button>
            </div>
          </div>

          {/* Telefonía */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-emerald-400">Telefonía</label>
            <select
              value={telephonyProvider}
              onChange={(e) => setTelephonyProvider(e.target.value)}
              className="w-full px-3 py-2 bg-black/50 border border-emerald-700/50 rounded-lg shadow-sm text-emerald-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="deepgram">Deepgram ($0.010/min)</option>
              <option value="talkscriber">Talkscriber ($0.011/min)</option>
              <option value="azure">Azure ($0.017/min)</option>
            </select>
          </div>

          {/* Voz */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-emerald-400">Voz</label>
            <select
              value={voiceProvider}
              onChange={(e) => setVoiceProvider(e.target.value)}
              className="w-full px-3 py-2 bg-black/50 border border-emerald-700/50 rounded-lg shadow-sm text-emerald-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
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
            <label className="block text-sm font-medium text-emerald-400">LLM</label>
            <select
              value={llmProvider}
              onChange={(e) => setLlmProvider(e.target.value)}
              className="w-full px-3 py-2 bg-black/50 border border-emerald-700/50 rounded-lg shadow-sm text-emerald-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
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
            <label className="block text-sm font-medium text-emerald-400">Automatización (USD)</label>
            <input
              type="number"
              value={automation}
              onChange={(e) => setAutomation(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-black/50 border border-emerald-700/50 rounded-lg shadow-sm text-emerald-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="0"
            />
          </div>

          {/* CRM */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-emerald-400">CRM (USD)</label>
            <input
              type="number"
              value={crm}
              onChange={(e) => setCrm(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-black/50 border border-emerald-700/50 rounded-lg shadow-sm text-emerald-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Costos Extra */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-emerald-400">Costos Extra</h3>
            <button
              onClick={addExtraCost}
              className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-4 py-2 rounded-lg transition-colors border border-emerald-600"
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
                className="flex-1 px-3 py-2 bg-black/50 border border-emerald-700/50 rounded-lg shadow-sm text-emerald-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
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
                className="w-32 px-3 py-2 bg-black/50 border border-emerald-700/50 rounded-lg shadow-sm text-emerald-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <select
                value={cost.type}
                onChange={(e) => {
                  const newCosts = [...extraCosts];
                  newCosts[index].type = e.target.value;
                  setExtraCosts(newCosts);
                }}
                className="w-40 px-3 py-2 bg-black/50 border border-emerald-700/50 rounded-lg shadow-sm text-emerald-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="fixed">Fijo</option>
                <option value="perMinute">Por Minuto</option>
              </select>
              <button
                onClick={() => {
                  const newCosts = extraCosts.filter((_, i) => i !== index);
                  setExtraCosts(newCosts);
                }}
                className="bg-red-900/50 hover:bg-red-800/50 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-700/50"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Ganancia */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-emerald-400 mb-2">
            Ganancia (%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={profit}
            onChange={(e) => setProfit(Number(e.target.value))}
            className="w-full h-2 bg-emerald-900/50 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center text-sm text-emerald-400 mt-2">{profit}%</div>
        </div>

        {/* Costo Total */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-xl p-6 text-white border border-emerald-700/50">
          <h3 className="text-lg font-medium mb-2 text-emerald-200">Costo Total (tiene 3 decimales)</h3>
          <div className="text-4xl font-bold text-emerald-100">${totalCost.toFixed(3)} USD</div>
        </div>

        {/* Powered by */}
        <div className="text-center mt-6 text-sm text-emerald-400">
          Powered by{' '}
          <a
            href="https://www.youtube.com/@Tincho.Olivero/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            Tincho.Olivero
          </a>
        </div>
      </div>
    </div>
  );
};

export default VapiCalculator;