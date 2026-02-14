'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrackingMap } from '../../components/tracking/TrackingMap';
import { VesselPanel } from '../../components/tracking/VesselPanel';
import { VesselList } from '../../components/tracking/VesselList';
import { useTrackingSocket } from '../../hooks/useTrackingSocket';
import { vesselService } from '../../services/vessel-service';
import { useVesselStore } from '../../store/useVesselStore';

export default function TrackingPage() {
    const { isConnected } = useTrackingSocket();
    const setVessels = useVesselStore((state) => state.setVessels);

    const { data: vessels, isLoading } = useQuery({
        queryKey: ['vessels'],
        queryFn: () => vesselService.getAll(),
        refetchInterval: 60000,
    });

    useEffect(() => {
        if (vessels) {
            setVessels(vessels);
        }
    }, [vessels, setVessels]);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-900 text-white font-sans">
            <header className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700 shadow-lg z-30">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <span className="text-2xl font-black italic">S</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-white uppercase italic">SeaSense <span className="text-blue-500">Live</span></h1>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mt-1">Global maritime fleet intelligence</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-700">
                        <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 animate-[pulse_2s_infinite] shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{isConnected ? 'System Online' : 'System Offline'}</span>
                    </div>
                    <div className="w-10 h-10 bg-slate-700 rounded-xl border border-slate-600 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-all hover:scale-110 active:scale-95 shadow-lg">
                        <span className="text-sm font-black italic text-blue-400">M</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex relative overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 z-[60] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center">
                        <div className="relative w-24 h-24 mb-6">
                            <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full" />
                            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            <div className="absolute inset-4 border-4 border-cyan-500/20 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
                        </div>
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 animate-pulse">Syncing Fleet Registry</p>
                    </div>
                )}

                <VesselList />

                <div className="flex-1 relative bg-[#0f172a]">
                    <TrackingMap className="z-0" />
                    <VesselPanel />

                    {/* Overlay Panels */}
                    <div className="absolute top-6 left-6 z-10 w-80 pointer-events-none">
                        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden pointer-events-auto">
                            <div className="bg-slate-700/30 p-4 border-b border-slate-700/50 flex items-center justify-between">
                                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fleet Intelligence</h2>
                                <div className="flex gap-1.5 entries-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                </div>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-xl border border-slate-700/30 group hover:border-blue-500/30 transition-all duration-300">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Monitored Assets</span>
                                        <span className="text-3xl font-mono font-bold text-white leading-none tracking-tighter">{vessels?.length || 0}</span>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                                        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-700/30 hover:bg-slate-900/60 transition-colors">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Voyages</span>
                                        <span className="text-xl font-mono font-bold text-green-400 leading-none tracking-tight">12</span>
                                    </div>
                                    <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-700/30 hover:bg-slate-900/60 transition-colors">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Anomalies</span>
                                        <span className="text-xl font-mono font-bold text-red-500/80 leading-none tracking-tight">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2 scale-90 origin-bottom-right">
                        <div className="bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700/50 flex items-center gap-3 shadow-2xl">
                            <div className="w-4 h-4 bg-blue-600 rounded rotate-45 border border-white/30 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">Cargo Fleet</span>
                        </div>
                        <div className="bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700/50 flex items-center gap-3 shadow-2xl">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full border border-white/30 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">Energy Tankers</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
