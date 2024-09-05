import { Slice } from '@ton/core';

export const parseJettonTransfer = (slice: Slice) => {
    const queryId = slice.loadUint(64);
    const amount = slice.loadCoins();
    const destination = slice.loadAddress()?.toString() || '';
    const responseDestination = slice.loadAddress()?.toString() || '';
    const customPayload = slice.loadMaybeRef();
    const forwardTonAmount = slice.loadCoins();
    const forwardPayload = slice.loadRef();

    let forwardPayloadValue = null;
    if (forwardPayload) {
        const forwardPayloadSlice = forwardPayload.beginParse();
        const prefix = forwardPayloadSlice.loadUint(32);

        if (prefix === 0) {
            const text = forwardPayloadSlice.loadStringTail();
            forwardPayloadValue = {
                sum_type: 'TextComment',
                op_code: 0,
                value: {
                    text,
                },
            };
        } else {
            forwardPayloadValue = 'Unsupported forward payload format';
        }
    }

    return {
        query_id: queryId,
        amount: amount.toString(),
        destination,
        response_destination: responseDestination,
        custom_payload: customPayload ? 'Not parsed' : null,
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