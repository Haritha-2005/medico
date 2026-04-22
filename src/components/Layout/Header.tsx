import { useState } from 'react';
import { Bell, Search, Package, MapPin, CheckCircle2 } from 'lucide-react';
import { staticMedicines } from '../../data/staticData';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Low stock: Paracetamol in Branch A', type: 'warning' },
    { id: 2, text: 'New shipment arrived at Branch B', type: 'success' },
    { id: 3, text: 'Temperature alert in Cold Storage 2', type: 'error' },
  ]);

  const filteredMeds = searchQuery.length > 1
    ? staticMedicines.filter(m =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.barcode.includes(searchQuery) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8)
    : [];

  return (
    <div className="bg-white/70 backdrop-blur-lg border-b border-white/20 px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Quick search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-80 bg-white/50 transition-all font-medium text-sm"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />

            {/* Global Search Dropdown */}
            {searchQuery.length > 1 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white/90 backdrop-blur-xl border border-teal-100 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-3 py-1 mb-2">
                  <span className="text-[10px] font-black uppercase text-teal-600 tracking-tighter">Search Results</span>
                  <span className="text-[10px] text-gray-400">{filteredMeds.length} found</span>
                </div>

                {filteredMeds.length > 0 ? (
                  <div className="space-y-1">
                    {filteredMeds.map(med => (
                      <div
                        key={med.id}
                        onClick={() => setSearchQuery('')}
                        className="p-3 hover:bg-teal-50 rounded-xl border border-transparent hover:border-teal-200 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-teal-100 p-1.5 rounded-lg">
                              <Package className="w-3.5 h-3.5 text-teal-600" />
                            </div>
                            <span className="text-sm font-bold text-gray-900 leading-none">{med.name}</span>
                          </div>
                          <span className="text-[9px] font-black bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" /> {med.branch}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1 ml-9">
                          <span className="text-[10px] font-mono text-gray-500">{med.barcode}</span>
                          <span className="text-[10px] font-bold text-teal-700">Stock: {med.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-xs text-gray-500 font-medium">No medicines found</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* New Simplified Notification Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-teal-50 rounded-xl transition group"
            >
              <Bell className={`h-6 w-6 transition-colors ${notifications.length > 0 ? 'text-teal-600' : 'text-gray-600'}`} />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-teal-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-teal-100 rounded-[24px] shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Notifications</h3>
                  <button
                    onClick={() => {
                      setNotifications([]);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-1 text-[10px] font-black text-teal-600 uppercase hover:text-teal-700 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Done
                  </button>
                </div>

                <div className="space-y-2">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div key={n.id} className="p-3 bg-teal-50/50 rounded-2xl border border-teal-100/50 flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === 'warning' ? 'bg-orange-400' : n.type === 'error' ? 'bg-red-400' : 'bg-teal-400'
                          }`} />
                        <p className="text-[11px] font-bold text-gray-900 leading-snug">{n.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">All caught up!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
