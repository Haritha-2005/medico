import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, ArrowRightLeft, Upload, Brain, Pill, Activity } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

import {
  parseCSV,
  generatePredictions,
  generateSummary,
  getChartData,
  getSicknessData,
  PredictionResult,
  HistoricalData,
  ChartData,
  SicknessData
} from '../../utils/predictionUtils';
import Skeleton from '../Common/Skeleton';

const COLORS = ['#0d9488', '#0891b2', '#10b981', '#ef4444', '#0f766e', '#0e7490'];



import AIPrediction from './AIPrediction';
import { branches as dashboardBranches } from '../../data/staticData';

export default function DemandPredictions() {
  const [showAIPrediction, setShowAIPrediction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Initial chart data
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [sicknessData, setSicknessData] = useState<SicknessData[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const data = parseCSV(text);
      const results = generatePredictions(data);
      const cData = getChartData(data);
      const sData = getSicknessData(data);

      setHistoricalData(data);
      setPredictions(results);
      setChartData(cData);
      setSicknessData(sData);
      setAiSummary(generateSummary(results));
      setIsUploading(false);
      setIsLoading(false);
    };
    reader.readAsText(file);
  };



  const getTrendIcon = (trend: string) => {
    if (trend === 'increasing') return TrendingUp;
    if (trend === 'decreasing') return TrendingDown;
    return Minus;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'increasing') return 'text-green-600';
    if (trend === 'decreasing') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">

      {showAIPrediction ? (
        <AIPrediction onBack={() => setShowAIPrediction(false)} />
      ) : (
        <>
          {aiSummary && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-100 flex gap-3">
                <Brain className="w-6 h-6 text-teal-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-teal-900">AI Intelligence Summary</p>
                  <p className="text-sm text-teal-700 mt-0.5">{aiSummary}</p>
                </div>
              </div>
            </div>
          )}

          {historicalData.length > 0 ? (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-1 bg-gray-100 rounded-lg flex`}>
                      <button
                        onClick={() => setViewMode('chart')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'chart' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Analytics View
                      </button>
                      <button
                        onClick={() => setViewMode('table')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Detailed Table
                      </button>
                    </div>

                    <button
                      onClick={() => setShowAIPrediction(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-gray-950 rounded-lg font-black hover:bg-teal-600 transition-all shadow-md shadow-teal-200 active:scale-[0.98] ml-4"
                    >
                      <Brain className="w-4 h-4" />
                      Automated AI Prediction
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500 italic">
                      Currently viewing AI {viewMode === 'chart' ? 'Visualizations' : 'Data Grid'}
                    </p>
                  </div>
                </div>
              </div>

              {viewMode === 'chart' ? (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Total Forecasts', value: predictions.length, color: 'blue', icon: BarChart3 },
                      {
                        label: 'Reorder High Risk',
                        value: predictions.filter((p) => p.reorderRecommendation).length,
                        color: 'orange',
                        icon: AlertTriangle,
                      },
                      {
                        label: 'Logistics Transfers',
                        value: predictions.filter((p) => p.transferRecommendation).length,
                        color: 'purple',
                        icon: ArrowRightLeft,
                      },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                            {isLoading ? (
                              <Skeleton className="mt-2" width="60px" height="36px" />
                            ) : (
                              <p
                                className={`text-3xl font-bold mt-2 ${stat.color === 'orange'
                                  ? 'text-orange-600'
                                  : stat.color === 'purple'
                                    ? 'text-purple-600'
                                    : 'text-gray-900'
                                  }`}
                              >
                                {stat.value}
                              </p>
                            )}
                          </div>
                          <div className={`bg-${stat.color === 'orange' ? 'teal' : stat.color}-100 p-3.5 rounded-xl`}>
                            <stat.icon className={`w-7 h-7 text-${stat.color === 'orange' ? 'teal' : stat.color}-600`} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-teal-600" />
                        <h3 className="font-bold text-gray-900">Demand Forecast (AI Projection)</h3>
                      </div>
                      <div className="h-[350px] w-full">
                        {isLoading ? (
                          <Skeleton width="100%" height="100%" />
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                              <defs>
                                <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.1} />
                                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis fontSize={12} tickLine={false} axisLine={false} />
                              <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                              />
                              <Area type="monotone" dataKey="historical" stroke="#0d9488" fillOpacity={1} fill="url(#colorHist)" strokeWidth={3} name="Current Demand" />
                              <Area type="monotone" dataKey="predicted" stroke="#0891b2" fillOpacity={1} fill="url(#colorPred)" strokeWidth={3} strokeDasharray="5 5" name="AI Prediction" />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                      <div className="flex items-center gap-2 mb-6">
                        <Pill className="w-5 h-5 text-teal-600" />
                        <h3 className="font-bold text-gray-900">Treatment Prevalence Tracker</h3>
                      </div>
                      <div className="h-[350px] w-full">
                        {isLoading ? (
                          <Skeleton width="100%" height="100%" />
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={sicknessData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {sicknessData.map((_entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                              />
                              <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-500">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Advanced Predictive Table</h3>
                      <p className="text-sm text-gray-600">Cross-referencing medication codes with sickness outbreaks</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Medicine & Code</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Target Condition</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Branch</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase text-center">Current Stock</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase text-center">Forecast</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Trend</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">AI Recommendation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {isLoading
                          ? [...Array(5)].map((_, i) => (
                            <tr key={i}>
                              <td className="px-6 py-4"><Skeleton width="140px" height="32px" /></td>
                              <td className="px-6 py-4"><Skeleton width="100px" height="20px" /></td>
                              <td className="px-6 py-4"><Skeleton width="80px" height="20px" /></td>
                              <td className="px-6 py-4"><Skeleton width="60px" height="30px" className="mx-auto" /></td>
                              <td className="px-6 py-4"><Skeleton width="60px" height="30px" className="mx-auto" /></td>
                              <td className="px-6 py-4"><Skeleton width="100px" height="20px" /></td>
                              <td className="px-6 py-4"><Skeleton width="150px" height="20px" /></td>
                            </tr>
                          ))
                          : predictions.map((prediction) => {
                            const TrendIcon = getTrendIcon(prediction.trend);
                            const stockCoverage = (prediction.currentStock / prediction.predictedDemand) * 100;

                            return (
                              <tr key={prediction.medicineId} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4">
                                  <p className="font-black text-gray-900">{prediction.medicineName}</p>
                                  <p className="text-[10px] font-black uppercase tracking-tighter text-teal-600">{prediction.medCode}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                                    {prediction.sickness}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800">
                                    {prediction.branch}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <div className="flex flex-col items-center">
                                    <p className="font-bold text-gray-900 text-lg">{prediction.currentStock}</p>
                                    <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                                      <div
                                        className={`h-1.5 rounded-full ${stockCoverage >= 100 ? 'bg-green-500' : 'bg-orange-500'}`}
                                        style={{ width: `${Math.min(stockCoverage, 100)}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <p className="text-2xl font-black text-teal-600">{prediction.predictedDemand}</p>
                                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">Estimated</p>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-lg ${prediction.trend === 'increasing' ? 'bg-green-100' : 'bg-red-100'}`}>
                                      <TrendIcon className={`w-4 h-4 ${getTrendColor(prediction.trend)}`} />
                                    </div>
                                    <span className="text-sm font-bold capitalize text-gray-700">
                                      {prediction.trend}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  {prediction.reorderRecommendation && (
                                    <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border border-orange-200">
                                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                                      <span className="text-xs font-bold text-orange-800">URGENT REORDER</span>
                                    </div>
                                  )}
                                  {prediction.transferRecommendation && (
                                    <div className="mt-1 p-2 bg-purple-50 rounded-lg border border-purple-200">
                                      <p className="text-[10px] font-bold text-purple-800 flex items-center gap-1">
                                        <ArrowRightLeft className="w-3 h-3" /> TRANSFER
                                      </p>
                                      <p className="text-[11px] text-purple-700 mt-0.5">
                                        {prediction.transferRecommendation.quantity || 0} units from {prediction.transferRecommendation.fromBranch || dashboardBranches[0]}
                                      </p>
                                    </div>
                                  )}
                                  {!prediction.reorderRecommendation && !prediction.transferRecommendation && (
                                    <span className="text-xs font-medium text-gray-400">Stock Optimized</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Seasonal Trends Analysis</h3>
                  <div className="space-y-4">
                    <div className="p-5 bg-teal-50 rounded-xl border border-teal-100 shadow-sm">
                      <p className="font-bold text-teal-900 mb-2">Winter Season Impact</p>
                      <p className="text-sm text-teal-700 leading-relaxed">
                        Increased demand for cold and flu medications expected. Paracetamol and
                        antibiotics showing 30% higher consumption patterns.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-900 mb-2">Stable Categories</p>
                      <p className="text-sm text-green-700">
                        Cardiovascular and diabetes medications maintaining consistent demand across
                        all branches.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Inter-Branch Transfer Recommendations
                  </h3>
                  <div className="space-y-3">
                    {predictions
                      .filter((p) => p.transferRecommendation)
                      .map((prediction) => (
                        <div
                          key={prediction.medicineId}
                          className="p-4 bg-purple-50 rounded-lg border border-purple-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-purple-900">{prediction.medicineName}</p>
                            <ArrowRightLeft className="w-5 h-5 text-purple-600" />
                          </div>
                          <p className="text-sm text-purple-700">
                            Transfer {prediction.transferRecommendation?.quantity || 0} units from{' '}
                            {prediction.transferRecommendation?.fromBranch || dashboardBranches[0]} to{' '}
                            {prediction.transferRecommendation?.toBranch || dashboardBranches[1]}
                          </p>
                          <p className="text-xs text-purple-600 mt-1">
                            Optimizes stock distribution based on demand forecasts
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
              <div className="p-4 bg-blue-50 rounded-full mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Historical Data</h3>
              <p className="text-gray-500 text-center mb-6 max-w-md">
                Upload your sales/demand CSV file to generate AI-powered predictions and insights.
              </p>
              <div className="flex gap-4 item-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="px-6 py-3 bg-teal-500 text-gray-950 rounded-lg font-black hover:bg-teal-600 transition-all shadow-md shadow-teal-200 active:scale-[0.98]">
                    {isUploading ? 'Analyzing Data...' : 'Select CSV File'}
                  </span>
                </label>
                <button
                  onClick={() => setShowAIPrediction(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-black hover:bg-indigo-50 transition-all shadow-sm active:scale-[0.98]"
                >
                  <Brain className="w-4 h-4" />
                  Automated AI Prediction
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function BarChart3({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}
