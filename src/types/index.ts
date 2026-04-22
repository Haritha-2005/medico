export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'staff' | 'manager';
  email: string;
  branch: string;
  avatarUrl?: string;
}

export interface Medicine {
  id: string;
  name: string;
  batchNumber: string;
  quantity: number;
  expiryDate: string;
  storageTemp: string;
  branch: string;
  category: string;
  minStockLevel: number;
  barcode: string;
}

export interface Staff {
  id: string;
  name: string;
  rfidCode: string;
  role: string;
  branch: string;
  authorized: boolean;
  avatarUrl?: string;
}

export interface StaffActivity {
  id: string;
  staffId: string;
  staffName: string;
  action: string;
  timestamp: string;
  details: string;
}

export interface ScanHistory {
  id: string;
  staffName: string;
  medicineId: string;
  medicineName: string;
  action: 'add' | 'remove';
  quantity: number;
  timestamp: string;
}

export interface DemandPrediction {
  medicineId: string;
  medicineName: string;
  branch: string;
  predictedDemand: number;
  currentStock: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  seasonalFactor: number;
  reorderRecommendation: boolean;
  transferRecommendation?: {
    fromBranch: string;
    toBranch: string;
    quantity: number;
  };
}

export interface TemperatureAlert {
  id: string;
  location: string;
  currentTemp: number;
  targetTemp: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'stock_required' | 'stock_added' | 'alert' | 'info';
  message: string;
  timestamp: string;
  isRead: boolean;
  medicineName?: string;
  quantity?: number;
}
