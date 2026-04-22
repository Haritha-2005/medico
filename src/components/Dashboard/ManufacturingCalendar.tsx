import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Package, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface BatchSchedule {
    date: number; // Day of the month
    medicine: string;
    status: 'planned' | 'urgent' | 'completed';
    batchCode: string;
}

const mockSchedule: BatchSchedule[] = [
    { date: 15, medicine: 'Paracetamol 500mg', status: 'completed', batchCode: 'BT2026-001' },
    { date: 18, medicine: 'Amoxicillin 250mg', status: 'urgent', batchCode: 'BT2026-054' },
    { date: 20, medicine: 'Ibuprofen 400mg', status: 'planned', batchCode: 'BT2026-089' },
    { date: 22, medicine: 'Cetirizine 10mg', status: 'planned', batchCode: 'BT2026-102' },
    { date: 25, medicine: 'Metformin 500mg', status: 'urgent', batchCode: 'BT2026-145' },
];

export default function ManufacturingCalendar() {
    const [currentDate] = useState(new Date());

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'urgent': return 'bg-orange-500 shadow-orange-200';
            case 'completed': return 'bg-emerald-500 shadow-emerald-200';
            default: return 'bg-teal-500 shadow-teal-200';
        }
    };

    const getBadgeColor = (status: string) => {
        switch (status) {
            case 'urgent': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            default: return 'bg-teal-100 text-teal-700 border-teal-200';
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-teal-900/5 border border-white/20 p-6">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-teal-100 p-2.5 rounded-2xl">
                        <CalendarIcon className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-gray-900 leading-tight">Batch Schedule</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Calendar Grid */}
                <div>
                    <div className="grid grid-cols-7 mb-4">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                            <div key={day} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {blanks.map(i => <div key={`blank-${i}`} />)}
                        {days.map((day, index) => {
                            const schedule = mockSchedule.find(s => s.date === day);
                            const isToday = day === currentDate.getDate();
                            const column = (blanks.length + index) % 7;
                            const isFirstCol = column === 0;
                            const isLastCol = column === 6;

                            return (
                                <div
                                    key={day}
                                    className={`relative aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all cursor-default group
                    ${isToday ? 'bg-teal-900 text-white shadow-lg' : 'hover:bg-teal-50 text-gray-700'}
                  `}
                                >
                                    {day}
                                    {schedule && (
                                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ring-2 ring-transparent group-hover:ring-teal-200 transition-all ${getStatusColor(schedule.status)}`} />
                                    )}
                                    {schedule && (
                                        <div className={`absolute opacity-0 group-hover:opacity-100 pointer-events-none bottom-full mb-2 w-32 p-2 bg-gray-900 text-white text-[10px] rounded-lg shadow-xl z-20 transition-all transform scale-95 group-hover:scale-100 origin-bottom
                                            ${isFirstCol ? 'left-0 translate-x-0' : isLastCol ? 'right-0 translate-x-0' : 'left-1/2 -translate-x-1/2'}
                                        `}>
                                            <p className="font-black text-teal-400">{schedule.medicine}</p>
                                            <p className="opacity-60">{schedule.batchCode}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Schedule List */}
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400 mb-2">Upcoming Production</p>
                    <div className="space-y-3">
                        {mockSchedule.filter(s => s.status !== 'completed').map((s, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:shadow-md group">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-sm transition-transform group-hover:scale-110 ${getStatusColor(s.status)} text-white`}>
                                    {s.date}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-gray-900 truncate">{s.medicine}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-mono text-gray-500 uppercase">{s.batchCode}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getBadgeColor(s.status)}`}>
                                            {s.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="bg-teal-100 p-1.5 rounded-lg text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                                        <Package className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100/50 flex items-start gap-3 mt-4">
                        <AlertCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-black text-teal-900 uppercase tracking-tighter mb-1">Production Alert</p>
                            <p className="text-xs text-teal-800 font-medium leading-relaxed">
                                Next batch for <span className="font-bold">Amoxicillin</span> starts in 2 days. Ensure raw materials are verified.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
