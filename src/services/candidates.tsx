import axfetch from '@/utils/axfetch';
import type {AllCandidates} from '@/types/candidates.types';

export const getCandidates = async () => {
    const response = await axfetch.get<AllCandidates>('homework/candidates');
    return response.data;
};
