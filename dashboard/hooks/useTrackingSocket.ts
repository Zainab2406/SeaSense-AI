import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useVesselStore } from '../store/useVesselStore';
import { TrackingEvents, VesselLiveUpdate } from '../types/tracking';

export const useTrackingSocket = (namespace = 'tracking') => {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const updateLivePosition = useVesselStore((state) => state.updateLivePosition);

    useEffect(() => {
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

        const socket = io(`${socketUrl}/${namespace}`, {
            auth: { token },
            transports: ['websocket'],
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to tracking namespace');
        });

        socket.on(TrackingEvents.VESSEL_LIVE_UPDATE, (data: VesselLiveUpdate) => {
            updateLivePosition(data);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            console.log('Disconnected from tracking namespace');
        });

        return () => {
            socket.disconnect();
        };
    }, [namespace, updateLivePosition]);

    const emit = (event: string, data: any) => {
        socketRef.current?.emit(event, data);
    };

    return { isConnected, emit, socket: socketRef.current };
};
