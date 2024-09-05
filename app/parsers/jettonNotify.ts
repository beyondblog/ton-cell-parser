import { Slice } from '@ton/core';

export const parseJettonNotify = (slice: Slice) => {
    const queryId = slice.loadUint(64);
    const amount = slice.loadCoins();
    const sender = slice.loadAddress()?.toString() || '';
    const forwardPayload = slice.loadRef();

    let forwardPayloadValue = null;
    if (forwardPayload) {
        const forwardPayloadSlice = forwardPayload.beginParse();
        // TODO: Parse forward payload if needed
        forwardPayloadValue = 'Not parsed';
    }

    return {
        query_id: queryId,
        amount: amount.toString(),
        sender,
        forward_payload: forwardPayload
            ? {
                is_right: true,
                value: forwardPayloadValue,
            }
            : {
                is_right: false,
            },
    };
};