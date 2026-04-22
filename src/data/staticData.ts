import { User, Medicine, Staff, StaffActivity, ScanHistory, DemandPrediction, TemperatureAlert, Notification } from '../types';

export const categories = [
  'Analgesics', 'Antibiotics', 'Diabetes', 'Cardiovascular', 'Gastrointestinal',
  'Respiratory', 'Antihistamines', 'Vitamins', 'Dermatologicals', 'Psychotropics'
];

export const branches = ['Branch A', 'Branch B', 'Branch C'];

export const staticUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    name: 'Admin User',
    role: 'admin',
    email: 'admin@medico.com',
    branch: 'All Branches',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    username: 'staff1',
    name: 'John Doe',
    role: 'staff',
    email: 'john@medico.com',
    branch: 'Branch A',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    username: 'manager1',
    name: 'Jane Smith',
    role: 'manager',
    email: 'jane@medico.com',
    branch: 'Branch B',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  }
];



const drugNames = [
  'Paracetamol', 'Amoxicillin', 'Insulin Glargine', 'Lisinopril', 'Metformin',
  'Omeprazole', 'Azithromycin', 'Atorvastatin', 'Ibuprofen', 'Cetirizine',
  'Loratadine', 'Fluoxetine', 'Sertraline', 'Amlodipine', 'Losartan',
  'Simvastatin', 'Metoprolol', 'Pantoprazole', 'Esomeprazole', 'Ciprofloxacin',
  'Levofloxacin', 'Doxycycline', 'Prednisone', 'Hydrochlorothiazide', 'Furosemide',
  'Gabapentin', 'Clonazepam', 'Alprazolam', 'Tramadol', 'Oxycodone',
  'Morphine', 'Warfarin', 'Rivaroxaban', 'Naproxen', 'Meloxicam',
  'Diclofenac', 'Celecoxib', 'Aspirin'
];

const dosages = ['10mg', '20mg', '50mg', '100mg', '200mg', '500mg', '1000mg', '5ml', '10ml', '5g', '15g'];

const generateMedicines = (): Medicine[] => {
  const medicines: Medicine[] = [];

  const initialMeds: Medicine[] = [
    {
      id: 'MED001',
      name: 'Paracetamol 500mg',
      batchNumber: 'BT2026001',
      quantity: 1500,
      expiryDate: '2025-12-31',
      storageTemp: '15-25°C',
      branch: 'Branch A',
      category: 'Analgesics',
      minStockLevel: 500,
      barcode: '8901234567890'
    },
    {
      id: 'MED002',
      name: 'Amoxicillin 250mg',
      batchNumber: 'BT2026002',
      quantity: 350,
      expiryDate: '2025-08-15',
      storageTemp: '2-8°C',
      branch: 'Branch A',
      category: 'Antibiotics',
      minStockLevel: 400,
      barcode: '8901234567891'
    },
    {
      id: 'MED003',
      name: 'Insulin Glargine',
      batchNumber: 'BT2026003',
      quantity: 180,
      expiryDate: '2025-06-30',
      storageTemp: '2-8°C',
      branch: 'Branch B',
      category: 'Diabetes',
      minStockLevel: 200,
      barcode: '8901234567892'
    },
    {
      id: 'MED004',
      name: 'Lisinopril 10mg',
      batchNumber: 'BT2026004',
      quantity: 800,
      expiryDate: '2026-03-20',
      storageTemp: '15-25°C',
      branch: 'Branch B',
      category: 'Cardiovascular',
      minStockLevel: 300,
      barcode: '8901234567893'
    },
    {
      id: 'MED005',
      name: 'Metformin 500mg',
      batchNumber: 'BT2026005',
      quantity: 1200,
      expiryDate: '2026-01-10',
      storageTemp: '15-25°C',
      branch: 'Branch A',
      category: 'Diabetes',
      minStockLevel: 500,
      barcode: '8901234567894'
    },
    {
      id: 'MED006',
      name: 'Omeprazole 20mg',
      batchNumber: 'BT2026006',
      quantity: 250,
      expiryDate: '2025-11-25',
      storageTemp: '15-25°C',
      branch: 'Branch C',
      category: 'Gastrointestinal',
      minStockLevel: 400,
      barcode: '8901234567895'
    },
    {
      id: 'MED007',
      name: 'Azithromycin 500mg',
      batchNumber: 'BT2026007',
      quantity: 420,
      expiryDate: '2025-09-30',
      storageTemp: '15-25°C',
      branch: 'Branch C',
      category: 'Antibiotics',
      minStockLevel: 300,
      barcode: '8901234567896'
    },
    {
      id: 'MED008',
      name: 'Atorvastatin 20mg',
      batchNumber: 'BT2026008',
      quantity: 650,
      expiryDate: '2026-05-15',
      storageTemp: '15-25°C',
      branch: 'Branch B',
      category: 'Cardiovascular',
      minStockLevel: 400,
      barcode: '8901234567897'
    }
  ];

  medicines.push(...initialMeds);

  for (let i = 9; i <= 250; i++) {
    const idStr = i.toString().padStart(3, '0');
    const drugName = drugNames[Math.floor(Math.random() * drugNames.length)];
    const dosage = dosages[Math.floor(Math.random() * dosages.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const minStock = Math.floor(Math.random() * 400) + 100;

    // Random date between 2025 and 2027
    const year = 2025 + Math.floor(Math.random() * 3);
    const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    const day = (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0');

    medicines.push({
      id: `MED${idStr}`,
      name: `${drugName} ${dosage}`,
      batchNumber: `BT2026${idStr}`,
      quantity: Math.floor(Math.random() * 2000) + 50,
      expiryDate: `${year}-${month}-${day}`,
      storageTemp: Math.random() > 0.5 ? '15-25°C' : '2-8°C',
      branch: branch,
      category: categories[Math.floor(Math.random() * categories.length)],
      minStockLevel: minStock,
      barcode: (8901234567000 + i).toString()
    });
  }
  return medicines;
};

export const staticMedicines: Medicine[] = generateMedicines();

export const staticStaff: Staff[] = [
  {
    id: 'STF001',
    name: 'John Doe',
    rfidCode: 'RFID001',
    role: 'Pharmacist',
    branch: 'Branch A',
    authorized: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'STF002',
    name: 'Sarah Johnson',
    rfidCode: 'RFID002',
    role: 'Inventory Manager',
    branch: 'Branch C',
    authorized: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'STF003',
    name: 'Mike Wilson',
    rfidCode: 'RFID003',
    role: 'Staff',
    branch: 'Branch B',
    authorized: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'STF004',
    name: 'Unauthorized User',
    rfidCode: 'RFID999',
    role: 'Unknown',
    branch: 'Unknown',
    authorized: false,
    avatarUrl: 'https://api.dicebear.com/7.x/micah/svg?seed=stick&backgroundColor=f1f5f9'
  }
];

export const staticActivities: StaffActivity[] = [
  {
    id: 'ACT001',
    staffId: 'STF001',
    staffName: 'John Doe',
    action: 'Stock Addition',
    timestamp: new Date(Date.now() - 3600000 * 5).toLocaleString(), // 5 hours ago
    details: 'Added 200 units of Paracetamol 500mg'
  },
  {
    id: 'ACT002',
    staffId: 'STF002',
    staffName: 'Sarah Johnson',
    action: 'Stock Removal',
    timestamp: new Date(Date.now() - 3600000 * 3).toLocaleString(), // 3 hours ago
    details: 'Dispensed 50 units of Amoxicillin 250mg'
  },
  {
    id: 'ACT003',
    staffId: 'STF003',
    staffName: 'Mike Wilson',
    action: 'Stock Check',
    timestamp: new Date(Date.now() - 3600000 * 1).toLocaleString(), // 1 hour ago
    details: 'Verified inventory at Branch B'
  }
];

export const staticScanHistory: ScanHistory[] = [
  {
    id: 'SCN001',
    staffName: 'John Doe',
    medicineId: 'MED001',
    medicineName: 'Paracetamol 500mg',
    action: 'add',
    quantity: 200,
    timestamp: new Date(Date.now() - 3600000 * 5).toLocaleString()
  },
  {
    id: 'SCN002',
    staffName: 'Sarah Johnson',
    medicineId: 'MED002',
    medicineName: 'Amoxicillin 250mg',
    action: 'remove',
    quantity: 50,
    timestamp: new Date(Date.now() - 3600000 * 3).toLocaleString()
  }
];

export const staticPredictions: DemandPrediction[] = [
  {
    medicineId: 'MED001',
    medicineName: 'Paracetamol 500mg',
    branch: 'Branch A',
    predictedDemand: 800,
    currentStock: 1500,
    trend: 'stable',
    seasonalFactor: 1.0,
    reorderRecommendation: false
  },
  {
    medicineId: 'MED002',
    medicineName: 'Amoxicillin 250mg',
    branch: 'Branch A',
    predictedDemand: 450,
    currentStock: 350,
    trend: 'increasing',
    seasonalFactor: 1.3,
    reorderRecommendation: true
  },
  {
    medicineId: 'MED003',
    medicineName: 'Insulin Glargine',
    branch: 'Branch B',
    predictedDemand: 250,
    currentStock: 180,
    trend: 'increasing',
    seasonalFactor: 1.2,
    reorderRecommendation: true
  },
  {
    medicineId: 'MED006',
    medicineName: 'Omeprazole 20mg',
    branch: 'Branch C',
    predictedDemand: 380,
    currentStock: 250,
    trend: 'increasing',
    seasonalFactor: 1.1,
    reorderRecommendation: true,
    transferRecommendation: {
      fromBranch: 'Branch A',
      toBranch: 'Branch C',
      quantity: 150
    }
  }
];

export const staticTemperatureAlerts: TemperatureAlert[] = [
  {
    id: 'TEMP001',
    location: 'Branch A - Cold Storage',
    currentTemp: 5.2,
    targetTemp: '2-8°C',
    status: 'normal',
    timestamp: new Date(Date.now() - 600000).toLocaleString() // 10 mins ago
  },
  {
    id: 'TEMP002',
    location: 'Branch B - Cold Storage',
    currentTemp: 9.5,
    targetTemp: '2-8°C',
    status: 'warning',
    timestamp: new Date(Date.now() - 300000).toLocaleString() // 5 mins ago
  },
  {
    id: 'TEMP003',
    location: 'Branch A - Room Temp Storage',
    currentTemp: 22.0,
    targetTemp: '15-25°C',
    status: 'normal',
    timestamp: new Date(Date.now() - 120000).toLocaleString() // 2 mins ago
  }
];

export const staticNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'stock_required',
    message: 'Low stock: Paracetamol 500mg (Branch A)',
    timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString(), // 2 hours ago
    isRead: false,
    medicineName: 'Paracetamol 500mg'
  },
  {
    id: 'N002',
    type: 'stock_added',
    message: 'Stock updated: Insulin Glargine (100 units)',
    timestamp: new Date(Date.now() - 3600000 * 4).toLocaleString(), // 4 hours ago
    isRead: true,
    medicineName: 'Insulin Glargine',
    quantity: 100
  },
  {
    id: 'N003',
    type: 'alert',
    message: 'Critical temperature alert in Branch A Storage',
    timestamp: new Date(Date.now() - 3600000 * 6).toLocaleString(), // 6 hours ago
    isRead: false
  },
  {
    id: 'N004',
    type: 'info',
    message: 'Weekly inventory report is now available',
    timestamp: new Date(Date.now() - 3600000 * 24).toLocaleString(), // 24 hours ago
    isRead: false
  }
];
