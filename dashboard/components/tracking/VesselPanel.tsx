'use client';

import { useVesselStore } from '../../store/useVesselStore';
import { X, Anchor, Navigation, Activity, Clock } from 'lucide-react';

export const VesselPanel = () => {
    const { selectedVesselId, vessels, livePositions, selectVessel } = useVesselStore();

    if (!selectedVesselId) return null;

    const vessel = vessels[selectedVesselId];
    const position = livePositions[selectedVesselId];

    if (!vessel) return null;

    return (
        <div className="absolute top-20 right-4 z-20 w-80 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-slate-700 overflow-hidden text-white flex flex-col">
            <div className="bg-slate-700/50 p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-blue-400" />
                    {vessel.name}
                </h3>
                <button
                    onClick={() => selectVessel(null)}
                    className="p-1 hover:bg-slate-600 rounded-full transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-5 space-y-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Current Status</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${vessel.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-500/20 text-slate-400'
                        }`}>
                        {vessel.status}
                    </span>
                </div>

                {/* Live Telemetry */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                        <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1 mb-1">
                            <Navigation className="w-3 h-3" /> Speed
                        </div>
                        <div className="text-xl font-mono text-blue-400">
                            {position?.speed ? position.speed.toFixed(1) : '0.0'} <span className="text-xs text-slate-500">kn</span>
                        </div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                        <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1 mb-1">
                            <Activity className="w-3 h-3" /> Heading
                        </div>
                        <div className="text-xl font-mono text-cyan-400">
                            {position?.heading ? position.heading.toFixed(0) : '0'}°
                        </div>
                    </div>
                </div>

                {/* Detailed Info */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm py-2 border-b border-slate-700/50">
                        <span className="text-slate-400">IMO Number</span>
                        <span className="font-mono">{vessel.imo}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-slate-700/50">
                        <span className="text-slate-400">MMSI</span>
                        <span className="font-mono">{vessel.mmsi}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-slate-700/50">
                        <span className="text-slate-400 text-xs">Last Updated</span>
                        <span className="text-slate-300 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {position?.timestamp ? new Date(position.timestamp).toLocaleTimeString() : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-900/30">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-sm uppercase tracking-wider">
                    View Full History
                </button>
            </div>
        </div>
    );
};
