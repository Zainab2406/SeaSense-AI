import apiClient from '../lib/api-client';
import { Vessel } from '../types/tracking';

export const vesselService = {
    async getAll(): Promise<Vessel[]> {
        const { data } = await apiClient.get('/vessels');
        return data;
    },

    async getOne(id: string): Promise<Vessel> {
        const { data } = await apiClient.get(`/vessels/${id}`);
        return data;
    },
};
