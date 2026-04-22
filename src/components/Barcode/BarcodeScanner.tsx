import { useState, useEffect } from 'react';
import { Scan, Plus, Minus, CheckCircle, Package, Search } from 'lucide-react';
import { staticMedicines, staticStaff, staticScanHistory } from '../../data/staticData';
import Skeleton from '../Common/Skeleton';

export default function BarcodeScanner() {
  const [ising, setIsing] = useState(true);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [staffRFID, setStaffRFID] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState<'add' | 'remove'>('add');
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    medicine?: typeof staticMedicines[0];
  } | null>(null);
  const [scanHistory, setScanHistory] = useState(staticScanHistory);
  const [helpPage, setHelpPage] = useState(0);
  const [lookupSearch, setLookupSearch] = useState('');
  const helpItemsPerPage = 5;
  const helpTotalPages = Math.ceil(staticMedicines.length / helpItemsPerPage);

  useEffect(() => {
    const timer = setTimeout(() => setIsing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();

    const staff = staticStaff.find((s) => s.rfidCode === staffRFID);
    if (!staff || !staff.authorized) {
      setScanResult({
        success: false,
        message: 'Unauthorized staff. Please verify RFID first.',
      });
      return;
    }

    const medicine = staticMedicines.find((m) => m.barcode === barcodeInput);
    if (!medicine) {
      setScanResult({
        success: false,
        message: 'Medicine not found. Please check barcode.',
      });
      return;
    }

    const newScan = {
      id: `SCN${Date.now()}`,
      staffName: staff.name,
      medicineId: medicine.id,
      medicineName: medicine.name,
      action,
      quantity,
      timestamp: new Date().toLocaleString(),
    };

    setScanHistory([newScan, ...scanHistory]);
    setScanResult({
      success: true,
      message: `Successfully ${action === 'add' ? 'added' : 'removed'} ${quantity} units of ${medicine.name}`,
      medicine,
    });

    setBarcodeInput('');
    setQuantity(1);

    setTimeout(() => setScanResult(null), 5000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-3 rounded-xl shadow-sm">
              <Scan className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Barcode Scanner</h3>
              <p className="text-sm text-gray-600">Scan medicine barcode for stock updates</p>
            </div>
          </div>

          <form onSubmit={handleScan} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Staff RFID
              </label>
              <input
                type="text"
                value={staffRFID}
                onChange={(e) => setStaffRFID(e.target.value)}
                placeholder="Scan staff RFID first..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medicine Barcode
              </label>
              <input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="Scan barcode..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-lg bg-white/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAction('add')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition ${action === 'add'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Add Stock</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAction('remove')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition ${action === 'remove'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                >
                  <Minus className="w-5 h-5" />
                  <span className="font-semibold">Remove Stock</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg bg-white/50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-gray-950 font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-md shadow-teal-200 active:scale-[0.98]"
            >
              Process Scan
            </button>
          </form>

          {scanResult && (
            <div
              className={`mt-6 p-4 rounded-lg border-2 ${scanResult.success
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
                }`}
            >
              <div className="flex items-start gap-3">
                {scanResult.success && <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />}
                <div className="flex-1">
                  <p
                    className={`font-semibold ${scanResult.success ? 'text-green-900' : 'text-red-900'
                      }`}
                  >
                    {scanResult.message}
                  </p>
                  {scanResult.medicine && (
                    <div className="mt-2 text-sm text-gray-700">
                      <p>ID: {scanResult.medicine.id}</p>
                      <p>Batch: {scanResult.medicine.batchNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 p-6 bg-teal-50/50 rounded-2xl border border-teal-100/50 shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-black text-teal-900 uppercase tracking-wider">Test Barcodes Helper</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHelpPage(Math.max(0, helpPage - 1))}
                  disabled={helpPage === 0}
                  className="p-1.5 rounded-lg border border-teal-200 bg-white text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-bold text-teal-700">Page {helpPage + 1} of {helpTotalPages}</span>
                <button
                  type="button"
                  onClick={() => setHelpPage(Math.min(helpTotalPages - 1, helpPage + 1))}
                  disabled={helpPage === helpTotalPages - 1}
                  className="p-1.5 rounded-lg border border-teal-200 bg-white text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {staticMedicines.slice(helpPage * helpItemsPerPage, (helpPage + 1) * helpItemsPerPage).map((med) => (
                <div key={med.id} className="flex items-center justify-between p-2.5 bg-white/80 rounded-xl border border-teal-100 shadow-sm group hover:border-teal-400 transition-all">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-gray-900">{med.name}</span>
                    <span className="text-[10px] font-mono text-teal-600 font-black">{med.barcode}</span>
                  </div>
                  <button
                    onClick={() => setBarcodeInput(med.barcode)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 bg-teal-500 text-gray-950 rounded-lg transition-opacity flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter"
                  >
                    <Plus className="w-3 h-3" /> Use
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Quick Medicine Lookup</h3>
              <p className="text-sm text-gray-600">Available medicines for scanning</p>
            </div>
          </div>

          <div className="mb-4 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search lookup details..."
              value={lookupSearch}
              onChange={(e) => setLookupSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm bg-gray-50/50"
            />
          </div>

          <div className="space-y-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {ising
              ? [...Array(8)].map((_, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton width="120px" height="18px" />
                    <Skeleton width="60px" height="14px" />
                  </div>
                  <Skeleton width="140px" height="14px" />
                  <div className="flex items-center justify-between mt-2">
                    <Skeleton width="80px" height="14px" />
                    <Skeleton width="50px" height="10px" />
                  </div>
                </div>
              ))
              : staticMedicines
                .filter(med =>
                  med.name.toLowerCase().includes(lookupSearch.toLowerCase()) ||
                  med.barcode.includes(lookupSearch) ||
                  med.id.toLowerCase().includes(lookupSearch.toLowerCase())
                )
                .slice(0, 30)
                .map((med) => (
                  <div
                    key={med.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-teal-300 transition-all hover:shadow-sm cursor-default"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{med.name}</p>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                        {med.branch}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-mono">{med.barcode}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-gray-500">Stock: {med.quantity} units</p>
                      <p className="text-xs text-gray-500">{med.id}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Staff
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Medicine
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ising
                ? [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <Skeleton width="100px" height="16px" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="140px" height="16px" />
                      <Skeleton width="80px" height="12px" className="mt-1" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="70px" height="24px" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="60px" height="16px" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="100px" height="16px" />
                    </td>
                  </tr>
                ))
                : scanHistory.map((scan) => (
                  <tr key={scan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{scan.staffName}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{scan.medicineName}</p>
                      <p className="text-xs font-mono text-teal-600 font-bold">{scan.medicineId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${scan.action === 'add'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                          }`}
                      >
                        {scan.action === 'add' ? 'Added' : 'Removed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{scan.quantity} units</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{scan.timestamp}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
