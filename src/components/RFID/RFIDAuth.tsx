import { useState, useRef, useEffect } from 'react';
import { CreditCard, CheckCircle, XCircle, User, Shield } from 'lucide-react';
import { staticStaff, staticActivities } from '../../data/staticData';
import Skeleton from '../Common/Skeleton';

export default function RFIDAuth() {
  const [ising, setIsing] = useState(true);
  const [rfidInput, setRfidInput] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [currentStaff, setCurrentStaff] = useState<typeof staticStaff[0] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsing(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRFIDScan = (e: React.FormEvent) => {
    e.preventDefault();
    const staff = staticStaff.find((s) => s.rfidCode === rfidInput);

    if (staff && staff.authorized) {
      setVerificationStatus('success');
      setCurrentStaff(staff);
    } else {
      setVerificationStatus('failed');
      setCurrentStaff(staff || null);
    }

    setTimeout(() => {
      setRfidInput('');
      setVerificationStatus('idle');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">RFID Scanner</h3>
              <p className="text-sm text-gray-600">Scan staff RFID card for authentication</p>
            </div>
          </div>

          <form onSubmit={handleRFIDScan} className="space-y-4">
            <div>
              <label htmlFor="rfid" className="block text-sm font-medium text-gray-700 mb-2">
                RFID Code
              </label>
              <input
                ref={inputRef}
                id="rfid"
                type="text"
                value={rfidInput}
                onChange={(e) => setRfidInput(e.target.value)}
                placeholder="Scan RFID card or enter code..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg font-mono bg-gray-50/50"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!rfidInput}
              className="w-full bg-teal-500 hover:bg-teal-600 text-gray-950 font-bold py-4 px-4 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-200"
            >
              Verify Staff Identity
            </button>
          </form>

          {verificationStatus !== 'idle' && (
            <div
              className={`mt-6 p-4 rounded-lg border-2 ${verificationStatus === 'success'
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
                }`}
            >
              <div className="flex items-center gap-3">
                {verificationStatus === 'success' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <div className="flex-1">
                  <p
                    className={`font-semibold ${verificationStatus === 'success' ? 'text-green-900' : 'text-red-900'
                      }`}
                  >
                    {verificationStatus === 'success'
                      ? 'Access Granted'
                      : 'Access Denied'}
                  </p>
                  {currentStaff && (
                    <div className="flex items-center gap-3 mt-2">
                      {currentStaff.avatarUrl && (
                        <img src={currentStaff.avatarUrl} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt={currentStaff.name} />
                      )}
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {verificationStatus === 'success'
                            ? `Welcome, ${currentStaff.name}`
                            : 'Unauthorized staff member'}
                        </p>
                        <p className="text-xs text-gray-500">{currentStaff.role}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Test RFID Codes:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>RFID001 - John Doe (Authorized)</p>
              <p>RFID002 - Sarah Johnson (Authorized)</p>
              <p>RFID003 - Mike Wilson (Authorized)</p>
              <p>RFID999 - Unauthorized User</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Authorized Staff</h3>
              <p className="text-sm text-gray-600">List of authorized personnel</p>
            </div>
          </div>

          <div className="space-y-3">
            {ising
              ? [...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Skeleton circle width="36px" height="36px" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="120px" height="16px" />
                    <Skeleton width="80px" height="12px" />
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton width="60px" height="12px" />
                    <Skeleton width="50px" height="12px" />
                  </div>
                </div>
              ))
              : staticStaff
                .filter((s) => s.authorized)
                .map((staff) => (
                  <div
                    key={staff.id}
                    className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-white transition-all hover:shadow-sm"
                  >
                    {staff.avatarUrl ? (
                      <img src={staff.avatarUrl} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt={staff.name} />
                    ) : (
                      <div className="bg-teal-100 p-3 rounded-xl">
                        <User className="w-5 h-5 text-teal-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{staff.name}</p>
                      <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{staff.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400">{staff.rfidCode}</p>
                      <p className="text-xs font-medium text-gray-500">{staff.branch}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Staff Activities</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Staff Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Details
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
                      <Skeleton width="120px" height="16px" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="80px" height="24px" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="180px" height="16px" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton width="100px" height="16px" />
                    </td>
                  </tr>
                ))
                : staticActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{activity.staffName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                        {activity.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{activity.details}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{activity.timestamp}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
