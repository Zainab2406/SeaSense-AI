import { create } from 'zustand';
import { Vessel, VesselLiveUpdate } from '../types/tracking';

interface VesselState {
    vessels: Record<string, Vessel>;
    livePositions: Record<string, VesselLiveUpdate>;
    selectedVesselId: string | null;

    setVessels: (vessels: Vessel[]) => void;
    updateLivePosition: (update: VesselLiveUpdate) => void;
    selectVessel: (id: string | null) => void;
}

export const useVesselStore = create<VesselState>((set) => ({
    vessels: {},
    livePositions: {},
    selectedVesselId: null,

    setVessels: (vessels) => {
        const vesselMap = vessels.reduce((acc, v) => ({ ...acc, [v.id]: v }), {});
        set({ vessels: vesselMap });
    },

    updateLivePosition: (update) => {
        set((state) => ({
            livePositions: {
                ...state.livePositions,
                [update.vesselId]: update,
            },
        }));
    },

    selectVessel: (id) => set({ selectedVesselId: id }),
}));
