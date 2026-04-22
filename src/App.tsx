import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Overview from './components/Dashboard/Overview';
import InventoryList from './components/Inventory/InventoryList';
import RFIDAuth from './components/RFID/RFIDAuth';
import BarcodeScanner from './components/Barcode/BarcodeScanner';
import DemandPredictions from './components/Predictions/DemandPredictions';
import TemperatureMonitoring from './components/Monitoring/TemperatureMonitoring';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const pageTitle = {
    dashboard: 'Dashboard Overview',
    inventory: 'Inventory Management',
    rfid: 'RFID Staff Authentication',
    barcode: 'Barcode Scanner',
    predictions: 'AI Demand Predictions',
    monitoring: 'Temperature Monitoring',
  }[currentPage] || 'Dashboard';

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Overview />;
      case 'inventory':
        return <InventoryList />;
      case 'rfid':
        return <RFIDAuth />;
      case 'barcode':
        return <BarcodeScanner />;
      case 'predictions':
        return <DemandPredictions />;
      case 'monitoring':
        return <TemperatureMonitoring />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-dashboard-gradient">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 ml-64">
        <Header title={pageTitle} />
        <main className="p-8">{renderPage()}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
