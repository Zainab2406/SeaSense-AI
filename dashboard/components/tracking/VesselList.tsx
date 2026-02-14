'use client';

import { useState } from 'react';
import { useVesselStore } from '../../store/useVesselStore';
import { Search, Filter, Ship } from 'lucide-react';

export const VesselList = () => {
    const { vessels, selectVessel, selectedVesselId } = useVesselStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVessels = Object.values(vessels).filter(vessel =>
        vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vessel.imo.includes(searchTerm) ||
        vessel.mmsi.includes(searchTerm)
    );

    return (
        <div className="flex flex-col h-full bg-slate-900 border-r border-slate-700 w-80 shadow-2xl z-20">
            {/* Search Header */}
            <div className="p-4 bg-slate-800/50 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search vessels..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-1.5 px-3 bg-slate-700 hover:bg-slate-600 rounded-md text-[10px] font-black uppercase tracking-wider transition-all">
                        <Filter className="w-3 h-3" /> All Types
                    </button>
                    <button className="flex items-center justify-center py-1.5 px-3 bg-slate-700 hover:bg-slate-600 rounded-md transition-all">
                        <Ship className="w-3 h-3 text-blue-400" />
                    </button>
                </div>
            </div>

            {/* List Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredVessels.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-slate-500 italic">No vessels found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800/50">
                        {filteredVessels.map((vessel) => (
                            <div
                                key={vessel.id}
                                onClick={() => selectVessel(vessel.id)}
                                className={`p-4 cursor-pointer transition-all duration-200 group relative ${selectedVesselId === vessel.id ? 'bg-blue-600/10 border-l-4 border-blue-500' : 'hover:bg-slate-800/50 border-l-4 border-transparent'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight truncate max-w-[140px]">
                                        {vessel.name}
                                    </h4>
                                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${vessel.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' : 'bg-slate-700 text-slate-500'
                                        }`}>
                                        {vessel.status}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                                        <span>IMO: {vessel.imo}</span>
                                        <span>MMSI: {vessel.mmsi}</span>
                                    </div>
                                    <div className="text-[10px] text-blue-500/70 font-bold uppercase tracking-widest mt-1">
                                        {vessel.type}
                                    </div>
                                </div>

                                {selectedVesselId === vessel.id && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
        </div>
    );
};
