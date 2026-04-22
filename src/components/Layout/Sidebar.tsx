import { LayoutDashboard, Package, Users, BarChart3, Scan, Thermometer, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'rfid', label: 'RFID Auth', icon: Users },
    { id: 'barcode', label: 'Barcode Scan', icon: Scan },
    { id: 'predictions', label: 'AI Predictions', icon: BarChart3 },
    { id: 'monitoring', label: 'Monitoring', icon: Thermometer },
  ];

  return (
    <div className="w-64 bg-white/70 backdrop-blur-xl text-gray-900 h-screen flex flex-col fixed left-0 top-0 border-r border-teal-100/50">
      <div className="p-6 border-b border-teal-100/50">
        <h1 className="text-2xl font-black text-teal-600">MediTrack Pro</h1>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Inventory System</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                  ? 'bg-teal-100 text-teal-900 shadow-md shadow-teal-200/50 transform scale-[1.02]'
                  : 'text-gray-500 hover:bg-teal-50 hover:text-teal-600'
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                <span className="font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-teal-100/50">
        <div className="mb-3 p-4 bg-teal-50/50 rounded-2xl border border-teal-100/30 flex items-center gap-3">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150"}
            className="w-10 h-10 rounded-xl object-cover border-2 border-teal-500/20"
            alt="Profile"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.name}</p>
            <p className="text-[10px] text-teal-500 font-bold uppercase tracking-wider">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors font-semibold shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
