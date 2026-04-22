import { useState, useEffect } from 'react';
import { Search, Filter, AlertCircle, Clock, Thermometer } from 'lucide-react';
import { staticMedicines } from '../../data/staticData';
import Skeleton from '../Common/Skeleton';

export default function InventoryList() {
  const [ising, setIsing] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => setIsing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBranch, selectedCategory]);

  const branches = ['All', 'Branch A', 'Branch B', 'Branch C'];
  const categories = ['All', 'Analgesics', 'Antibiotics', 'Diabetes', 'Cardiovascular', 'Gastrointestinal'];

  const filteredMedicines = staticMedicines.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.barcode.includes(searchTerm);
    const matchesBranch = selectedBranch === 'All' || med.branch === selectedBranch;
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesBranch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const paginatedMedicines = filteredMedicines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity < minStock) return 'low';
    if (quantity < minStock * 1.5) return 'medium';
    return 'good';
  };

  const getStockColor = (status: string) => {
    if (status === 'low') return 'bg-red-100 text-red-800 border-red-200';
    if (status === 'medium') return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/50"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white/50"
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white/50"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Medicine Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Batch & Barcode
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Storage
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Branch
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ising
                ? [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <Skeleton width="140px" height="20px" />
                        <Skeleton width="100px" height="14px" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <Skeleton width="80px" height="16px" />
                        <Skeleton width="120px" height="12px" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <Skeleton width="70px" height="24px" />
                        <Skeleton width="50px" height="12px" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="100px" height="16px" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="80px" height="16px" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="70px" height="24px" />
                    </td>
                  </tr>
                ))
                : paginatedMedicines.map((medicine) => {
                  const stockStatus = getStockStatus(medicine.quantity, medicine.minStockLevel);
                  return (
                    <tr key={medicine.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{medicine.name}</p>
                          <p className="text-sm text-gray-600">ID: {medicine.id}</p>
                          <p className="text-xs text-gray-500">{medicine.category}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{medicine.batchNumber}</p>
                          <p className="text-xs text-gray-600 font-mono">{medicine.barcode}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStockColor(
                              stockStatus
                            )}`}
                          >
                            {medicine.quantity} units
                          </span>
                          <p className="text-xs text-gray-500 mt-1">Min: {medicine.minStockLevel}</p>
                          {stockStatus === 'low' && (
                            <div className="flex items-center gap-1 text-red-600 mt-1">
                              <AlertCircle className="w-3 h-3" />
                              <span className="text-xs font-medium">Reorder needed</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{medicine.expiryDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-teal-500" />
                          <span className="text-sm text-gray-900">{medicine.storageTemp}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                          {medicine.branch}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No medicines found matching your criteria</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{Math.min(filteredMedicines.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredMedicines.length, currentPage * itemsPerPage)}</span> of{' '}
          <span className="font-semibold">{filteredMedicines.length}</span> medicines
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Show only a few page numbers around the current page
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium border ${currentPage === pageNum
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                }
                return null;
              })}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
