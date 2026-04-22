import { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, Activity, PlusCircle, MinusCircle, ClipboardCheck, Clock, Sparkles, Calendar as CalendarIcon, MapPin, User, Phone, Users } from 'lucide-react';
import { staticMedicines, staticActivities, staticTemperatureAlerts, staticStaff } from '../../data/staticData';
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../Common/Skeleton';
import ManufacturingCalendar from './ManufacturingCalendar';

const RodOfAsclepius = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M12 18s-4-1-4-4 4-4 4-4-4-1-4-4 4-4 4-4M12 14c4 0 4-3 4-3s0-3-4-3" />
    <path d="M12 6c3 0 3-2 3-2s0-2-3-2" />
  </svg>
);

export default function Overview() {
  const [ising, setIsing] = useState(true);
  const { user } = useAuth();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsing(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const lowStockItems = staticMedicines.filter((m) => m.quantity < m.minStockLevel).length;
  const criticalAlerts = staticTemperatureAlerts.filter((a) => a.status === 'critical').length;
  const recentActivities = staticActivities.slice(0, 5);

  const stats = [
    {
      label: 'Global Inventory',
      value: '12,450+',
      icon: Package,
      color: 'teal',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-600',
    },
    {
      label: 'Low Stock Alerts',
      value: lowStockItems,
      icon: AlertTriangle,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      label: 'Critical Alerts',
      value: criticalAlerts,
      icon: TrendingUp,
      color: 'red',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
    {
      label: 'Active Branches',
      value: 3,
      icon: Activity,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
  ];

  const branchData = [
    {
      name: 'Branch A',
      manager: 'Dr. John Doe',
      address: 'XXXX',
      contact: 'YYYYY',
      staffCount: 24,
      efficiency: '98%',
      logistics: { transit: '1.2h', shipments: 14, status: 'On Time' },
      image: 'https://images.unsplash.com/photo-1586773860418-d3b979505ce2?auto=format&fit=crop&q=80&w=400',
      count: '2,500+'
    },
    {
      name: 'Branch B',
      manager: 'Sarah Johnson',
      address: 'XXXX',
      contact: 'YYYYY',
      staffCount: 18,
      efficiency: '94%',
      logistics: { transit: '2.5h', shipments: 8, status: 'Delayed' },
      image: 'https://images.unsplash.com/photo-1538108197022-ec9023447b92?auto=format&fit=crop&q=80&w=400',
      count: '2,800+'
    },
    {
      name: 'Branch C',
      manager: 'Mike Wilson',
      address: 'XXXX',
      contact: 'YYYYY',
      staffCount: 15,
      efficiency: '96%',
      logistics: { transit: '0.8h', shipments: 21, status: 'On Time' },
      image: 'https://images.unsplash.com/photo-1542360561-38505417df47?auto=format&fit=crop&q=80&w=400',
      count: '2,400+'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner - Refined for zero overlap */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-10 text-white shadow-xl shadow-teal-900/10 border border-white/10 group">
        {/* Background Visuals - Centered/Right mix to avoid collision */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-[url('https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-overlay transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-32" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest mb-4 backdrop-blur-md border border-white/20">
              <Sparkles className="w-3 h-3" />
              <span>System Operational</span>
            </div>
            <h2 className="text-4xl font-black mb-3 tracking-tight leading-tight">
              Welcome Back, <span className="text-gray-950">{user?.role === 'admin' ? 'Admin' : user?.name}</span>!
            </h2>
            <p className="text-white/80 font-medium text-lg max-w-lg leading-relaxed">
              Your inventory is looking healthy today. You have <span className="font-bold underline text-white decoration-2 underline-offset-4">{lowStockItems} low stock alerts</span> that need your attention.
            </p>
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="mt-6 px-6 py-3 bg-white text-teal-700 font-black rounded-2xl shadow-lg shadow-teal-900/20 flex items-center gap-2 transition-all hover:scale-105 hover:bg-teal-50"
            >
              <CalendarIcon className="w-5 h-5" />
              View Batch Schedule
            </button>
          </div>

          {/* Avatar Group - Pushed slightly for better spacing */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-teal-100/50 lg:text-right">Authorized Team</p>
            <div className="flex -space-x-4">
              {staticStaff.slice(0, 4).map((staff) => (
                <div
                  key={staff.id}
                  className="w-12 h-12 rounded-2xl border-2 border-white/50 shadow-lg flex items-center justify-center bg-white/10 backdrop-blur-xl text-white font-black text-sm ring-4 ring-teal-600/20 transition-transform hover:-translate-y-1 cursor-default"
                  title={staff.name}
                >
                  {staff.name.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
              <div className="w-12 h-12 rounded-2xl border-2 border-teal-400 bg-teal-500 flex items-center justify-center text-xs font-black shadow-lg text-white ring-4 ring-teal-600/10">
                +12
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsCalendarOpen(false)}
          />
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setIsCalendarOpen(false)}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md"
            >
              <PlusCircle className="w-6 h-6 rotate-45" />
            </button>
            <ManufacturingCalendar />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const shadowClass = stat.color === 'teal' ? 'shadow-vibrant-teal' : stat.color === 'orange' ? 'shadow-vibrant-orange' : stat.color === 'red' ? 'shadow-vibrant-red' : 'shadow-vibrant-green';
          return (
            <div key={stat.label} className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover-lift ${shadowClass}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  {ising ? (
                    <Skeleton className="mt-2" width="60px" height="36px" />
                  ) : (
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  )}
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Items</h3>
          <div className="space-y-3">
            {ising
              ? [...Array(4)].map((_) => (
                <div key={Math.random()} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <Skeleton width="120px" height="16px" />
                    <Skeleton width="80px" height="12px" />
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton width="60px" height="16px" />
                    <Skeleton width="40px" height="12px" />
                  </div>
                </div>
              ))
              : staticMedicines
                .filter((m) => m.quantity < m.minStockLevel)
                .slice(0, 5)
                .map((medicine) => (
                  <div
                    key={medicine.id}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{medicine.name}</p>
                      <p className="text-sm text-gray-600">{medicine.branch}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-orange-600">{medicine.quantity} units</p>
                      <p className="text-xs text-gray-500">Min: {medicine.minStockLevel}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {ising
              ? [...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Skeleton circle width="32px" height="32px" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="60%" height="16px" />
                    <Skeleton width="40%" height="12px" />
                    <Skeleton width="30%" height="10px" />
                  </div>
                </div>
              ))
              : recentActivities.map((activity) => {
                const getActionIcon = (action: string) => {
                  if (action.includes('Addition')) return { icon: PlusCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' };
                  if (action.includes('Removal')) return { icon: MinusCircle, color: 'text-rose-600', bg: 'bg-rose-100' };
                  return { icon: ClipboardCheck, color: 'text-teal-600', bg: 'bg-teal-100' };
                };
                const actionData = getActionIcon(activity.action);
                const Icon = actionData.icon;

                return (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white transition-colors cursor-default">
                    <div className={`${actionData.bg} p-3 rounded-xl shadow-sm flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${actionData.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="font-bold text-gray-700">{activity.staffName}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{activity.timestamp}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm p-8 border border-white/20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Global Branch Network</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Real-time inventory distribution across all centers</p>
          </div>
          <div className="px-4 py-2 bg-teal-100 rounded-xl border border-teal-200">
            <p className="text-[10px] font-black uppercase text-teal-700 tracking-widest leading-none">Total Stock</p>
            <p className="text-lg font-black text-teal-900 leading-none mt-1">7.7k+ Units</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ising
            ? [...Array(3)].map((_, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <Skeleton width="60px" height="16px" />
                <Skeleton width="100px" height="24px" />
                <Skeleton width="80px" height="12px" />
              </div>
            ))
            : branchData.map((branch) => {
              return (
                <div key={branch.name} className="flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                  {/* Branch Image Section */}
                  <div
                    className="relative h-40 bg-teal-600 overflow-hidden flex items-center justify-center group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-700 to-teal-500 opacity-90" />
                    <RodOfAsclepius className="w-24 h-24 text-white/20 absolute -right-4 -bottom-4 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
                      <RodOfAsclepius className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 z-10">
                      <h4 className="text-xl font-black text-white tracking-tight">{branch.name}</h4>
                    </div>
                  </div>

                  {/* Branch Details Grid */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100 shrink-0">
                          <User className="w-5 h-5 text-teal-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase text-teal-600/60 tracking-widest leading-none">In-Charge</p>
                          <p className="text-sm font-bold text-gray-900 mt-1 truncate">{branch.manager}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                          <MapPin className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Location</p>
                          <p className="text-sm font-bold text-gray-700 mt-1">{branch.address}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Contact</p>
                          <p className="text-sm font-bold text-gray-700 mt-1">{branch.contact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats Compact Row */}
                    <div className="flex gap-2">
                      <div className="flex-1 p-3 bg-teal-50/50 rounded-2xl border border-teal-100/50">
                        <div className="flex items-center gap-1.5 mb-1 opacity-60">
                          <Users className="w-3 h-3 text-teal-600" />
                          <span className="text-[9px] font-black text-teal-700 uppercase tracking-tighter">Team</span>
                        </div>
                        <p className="text-lg font-black text-gray-950">{branch.staffCount}</p>
                      </div>
                      <div className="flex-1 p-3 bg-emerald-50/30 rounded-2xl border border-emerald-100/30">
                        <div className="flex items-center gap-1.5 mb-1 opacity-60">
                          <Activity className="w-3 h-3 text-emerald-600" />
                          <span className="text-[9px] font-black text-emerald-700 uppercase tracking-tighter">Stability</span>
                        </div>
                        <p className="text-lg font-black text-emerald-600">{branch.efficiency}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-teal-600" />
                          <span className="text-[10px] font-black text-gray-500 uppercase">Transit</span>
                        </div>
                        <span className="text-xs font-black text-gray-900">{branch.logistics.transit}</span>
                      </div>

                      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-teal-600" />
                          <span className="text-[10px] font-black text-gray-500 uppercase">Shipments</span>
                        </div>
                        <span className="text-xs font-black text-gray-900">{branch.logistics.shipments} units</span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-black text-teal-600 tracking-tighter">{branch.count}</p>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Total Stock</span>
                        </div>
                        <button className="px-4 py-2 bg-teal-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200">
                          Track
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
