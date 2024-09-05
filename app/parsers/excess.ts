import { Slice } from '@ton/core';

export const parseExcess = (slice: Slice) => {
    const queryId = slice.loadUint(64);

    return {
        query_id: queryId,
    };
};