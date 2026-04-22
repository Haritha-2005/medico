import { useState, useEffect } from 'react';
import { Thermometer, AlertTriangle, CheckCircle, Clock, MapPin, Factory, ArrowDownCircle } from 'lucide-react';
import { staticTemperatureAlerts, staticActivities, staticMedicines } from '../../data/staticData';
import Skeleton from '../Common/Skeleton';

export default function TemperatureMonitoring() {
  const [ising, setIsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsing(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const getStatusColor = (status: string) => {
    if (status === 'critical') return 'bg-red-100 text-red-800 border-red-300';
    if (status === 'warning') return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'critical' || status === 'warning') return AlertTriangle;
    return CheckCircle;
  };

  const criticalCount = staticTemperatureAlerts.filter((a) => a.status === 'critical').length;
  const warningCount = staticTemperatureAlerts.filter((a) => a.status === 'warning').length;
  const normalCount = staticTemperatureAlerts.filter((a) => a.status === 'normal').length;

  const excessMedicines = staticMedicines.filter(m => m.quantity > m.minStockLevel * 3).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Critical Alerts', value: criticalCount, color: 'red', icon: AlertTriangle },
          { label: 'Warnings', value: warningCount, color: 'orange', icon: AlertTriangle },
          { label: 'Normal Status', value: normalCount, color: 'emerald', icon: CheckCircle },
        ].map((stat, i) => (
          <div key={i} className={`bg-white rounded-xl shadow-sm p-6 border border-gray-200 shadow-vibrant-${stat.color === 'emerald' ? 'green' : stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                {ising ? (
                  <Skeleton className="mt-2" width="60px" height="36px" />
                ) : (
                  <p className={`text-3xl font-bold text-${stat.color}-600 mt-2`}>
                    {stat.value}
                  </p>
                )}
              </div>
              <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Temperature Monitoring</h3>
          <p className="text-sm text-gray-600 mt-1">Real-time temperature readings from all storage locations</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ising
              ? [...Array(4)].map((_, i) => (
                <div key={i} className="p-6 rounded-xl border-2 border-gray-100 bg-gray-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Skeleton circle width="40px" height="40px" />
                      <div className="space-y-2">
                        <Skeleton width="100px" height="18px" />
                        <Skeleton width="60px" height="14px" />
                      </div>
                    </div>
                    <Skeleton circle width="24px" height="24px" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="space-y-2">
                      <Skeleton width="80px" height="36px" />
                      <Skeleton width="120px" height="14px" />
                    </div>
                    <Skeleton width="70px" height="24px" />
                  </div>
                </div>
              ))
              : staticTemperatureAlerts.map((alert) => {
                const StatusIcon = getStatusIcon(alert.status);
                return (
                  <div
                    key={alert.id}
                    className={`p-6 rounded-xl border-2 ${getStatusColor(alert.status)}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg">
                          <Thermometer className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{alert.location}</p>
                          <p className="text-sm text-gray-600">Target: {alert.targetTemp}</p>
                        </div>
                      </div>
                      <StatusIcon className="w-6 h-6" />
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-bold text-gray-900">{alert.currentTemp}°C</p>
                        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {alert.timestamp}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(
                            alert.status
                          )}`}
                        >
                          {alert.status}
                        </span>
                      </div>
                    </div>

                    {alert.status !== 'normal' && (
                      <div className="mt-4 p-3 bg-white rounded-lg">
                        <p className="text-sm font-medium text-gray-900">Action Required</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Temperature is outside the acceptable range. Please check cooling system.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Locations</h3>
          <div className="space-y-3">
            {['Branch A', 'Branch B', 'Branch C'].map((branch) => (
              <div key={branch} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  <p className="font-bold text-gray-900">{branch}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-lg border border-teal-50">
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Cold Storage</p>
                    <p className="text-lg font-black text-teal-600">2-8°C</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-cyan-50">
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Room Temp</p>
                    <p className="text-lg font-black text-cyan-600">15-25°C</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Activity Log</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {ising
              ? [...Array(4)].map((_, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Skeleton circle width="32px" height="32px" />
                    <div className="flex-1 space-y-2">
                      <Skeleton width="60%" height="16px" />
                      <Skeleton width="80%" height="12px" />
                      <Skeleton width="40%" height="10px" className="mt-2" />
                    </div>
                  </div>
                </div>
              ))
              : staticActivities.map((activity) => (
                <div key={activity.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white transition-all shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-2.5 rounded-xl shadow-sm">
                      <Clock className="w-4 h-4 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">{activity.staffName}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden shadow-vibrant-teal/20">
          <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Factory className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-bold text-gray-900">Manufacturing Unit Notification</h3>
            </div>
            <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-black rounded-full uppercase tracking-wider">Stock Control</span>
          </div>
          <div className="p-6">
            {excessMedicines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {excessMedicines.map(med => (
                  <div key={med.id} className="p-4 bg-teal-50 rounded-2xl border border-teal-100 relative group overflow-hidden transition-all hover:shadow-md">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      <ArrowDownCircle className="w-12 h-12 text-teal-900" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase text-teal-600 mb-1 tracking-widest">Excess Capacity Reached</p>
                      <h4 className="font-bold text-gray-900 leading-tight">{med.name}</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-[10px] font-mono text-gray-500">{med.id}</p>
                        <p className="text-[10px] font-mono text-amber-600 font-black">{med.barcode}</p>
                      </div>
                      <div className="bg-white/60 rounded-xl p-3 border border-teal-200/50">
                        <p className="text-xs text-teal-900 font-medium">
                          We have enough quantity ({med.quantity} units).
                        </p>
                        <p className="text-xs text-slate-900 font-bold mt-2 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-teal-500" />
                          Kindly stop the production for {((parseInt(med.id.replace(/\D/g, '')) % 3) + 1)} month(s).
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm italic">All production lines operating within normal parameters.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 rounded-3xl shadow-xl p-8 border border-white/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24 blur-2xl" />

          <div className="relative z-10 flex gap-6 items-start">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-lg">
              <Thermometer className="w-8 h-8 text-white animate-pulse" />
            </div>

            <div className="flex-1 text-white">
              <h3 className="text-xl font-black mb-3 tracking-tight">
                Temperature Monitoring Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-teal-50">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="font-bold mb-1 flex items-center gap-2 text-white">
                    <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                    Cold Storage (2-8°C)
                  </p>
                  <p className="text-xs font-medium opacity-80">For vaccines, insulin, and temperature-sensitive biologics</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="font-bold mb-1 flex items-center gap-2 text-teal-200">
                    <div className="w-2 h-2 rounded-full bg-teal-200"></div>
                    Room Temperature (15-25°C)
                  </p>
                  <p className="text-xs font-medium opacity-80">For tablets, capsules, and most oral medications</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <p className="text-sm font-bold mb-2">Alert Response Protocol:</p>
                <ul className="text-xs font-medium text-teal-50/80 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-teal-400 rounded-full" />
                    Notify the inventory manager immediately
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-teal-400 rounded-full" />
                    Move products to alternative storage if needed
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-teal-400 rounded-full" />
                    Log all temperature deviations in the system
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
