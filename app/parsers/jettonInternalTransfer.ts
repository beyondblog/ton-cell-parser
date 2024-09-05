import { Slice } from '@ton/core';

export const parseJettonInternalTransfer = (slice: Slice) => {
    const queryId = slice.loadUint(64);
    const amount = slice.loadCoins();
    const from = slice.loadAddress()?.toString() || '';
    const responseAddress = slice.loadAddress()?.toString() || '';
    const forwardTonAmount = slice.loadCoins();
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
        from,
        response_address: responseAddress,
        forward_ton_amount: forwardTonAmount.toString(),
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