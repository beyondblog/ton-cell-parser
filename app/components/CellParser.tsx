'use client';

import { useState, useEffect } from 'react';
import { Cell, Slice } from '@ton/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import hljs from 'highlight.js';
import { parseJettonTransfer } from '../parsers/jettonTransfer';
import { parseJettonInternalTransfer } from '../parsers/jettonInternalTransfer';
import { parseJettonNotify } from '../parsers/jettonNotify';
import { parseExcess } from '../parsers/excess';
import { parseJettonContent } from '../parsers/jettonContent';
import { CustomParsingControl } from './CustomParsingControl';

interface CellParserProps { }

const OP_CODE_DESCRIPTIONS: Record<number, string> = {
    0xf8a7ea5: 'Jetton Transfer',
    0x178d4519: 'Jetton Internal Transfer',
    0x7362d09c: 'Jetton Notify',
    0xd53276db: 'Excess',
};

export function CellParser({ }: CellParserProps) {
    const [cellBase64, setCellBase64] = useState('');
    const [cellData, setCellData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [opCode, setOpCode] = useState<number | null>(null);
    const [isCustomParsing, setIsCustomParsing] = useState(false);
    const [customParsingResult, setCustomParsingResult] = useState<any>(null);
    const [slice, setSlice] = useState<Slice | null>(null);

    const handleParse = () => {
        try {
            const cellBytes = Buffer.from(cellBase64, 'hex');
            const cell = Cell.fromBoc(cellBytes)[0];
            const slice = cell.beginParse();
            setSlice(slice);
            const contentSlice = slice.clone();

            let opCode = null;
            if (slice.remainingBits >= 32) {
                opCode = slice.loadUint(32);
                setOpCode(opCode);
            }

            let parsedData;
            if (opCode === 0xf8a7ea5) {
                parsedData = parseJettonTransfer(slice);
            } else if (opCode === 0x178d4519) {
                parsedData = parseJettonInternalTransfer(slice);
            } else if (opCode === 0x7362d09c) {
                parsedData = parseJettonNotify(slice);
            } else if (opCode === 0xd53276db) {
                parsedData = parseExcess(slice);
            } else {
                parsedData = parseJettonContent(contentSlice);
                setOpCode(null);
            }

            if (parsedData != null) {
                setCellData(parsedData);
                setIsCustomParsing(false);
            } else {
                setIsCustomParsing(true);
            }
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to parse Cell');
        }
    };

    const handleCustomParsing = (action: string, value?: number) => {
        if (!slice) return;

        try {
            let result;
            switch (action) {
                case 'loadUint':
                    result = slice.loadUint(value!);
                    break;
                case 'loadInt':
                    result = slice.loadInt(value!);
                    break;
                case 'loadBigUint':
                    result = slice.loadUintBig(value!);
                    break;
                case 'loadBigInt':
                    result = slice.loadIntBig(value!);
                    break;
                case 'loadCoins':
                    result = slice.loadCoins();
                    break;
                case 'loadAddress':
                    result = slice.loadAddress()?.toString() || '';
                    break;
                case 'loadBytes':
                    result = slice.loadBuffer(value!);
                    break;
                case 'loadString':
                    result = slice.loadStringTail();
                    break;
                default:
                    result = 'Unsupported action';
            }
            setCustomParsingResult(result);
        } catch (err) {
            console.error(err);
            setError('Failed to perform custom parsing');
        }
    };

    useEffect(() => {
        const highlightedElements = document.querySelectorAll('[data-highlighted]');
        highlightedElements.forEach((element) => {
            if (element instanceof HTMLElement) {
                delete element.dataset.highlighted;
            }
        });

        hljs.highlightAll();
    }, [cellData, customParsingResult]);

    return (
        <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <Input
                value={cellBase64}
                onChange={(e) => setCellBase64(e.target.value)}
                placeholder="Enter hex payload cell"
                className="text-gray-800 text-lg"
            />
            <Button onClick={handleParse} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-lg">
                Parse
            </Button>
            {error && <p className="mt-4 text-red-600 text-lg">{error}</p>}
            {opCode !== null && (
                <div className="mt-6 flex items-center bg-gray-800 px-4 py-2 rounded-md">
                    <span className={`inline-block px-2 py-1 rounded text-white text-sm font-bold bg-blue-600`}>
                        {opCode.toString(16)}
                    </span>
                    <span className="ml-4 text-lg font-bold text-white">{OP_CODE_DESCRIPTIONS[opCode]}</span>
                </div>
            )}
            {isCustomParsing && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2">Custom Parsing</h2>
                    <CustomParsingControl onParse={handleCustomParsing} />
                    {customParsingResult && (
                        <pre className="mt-4 p-4 bg-gray-900 rounded-md shadow-inner text-white text-lg overflow-auto">
                            <code className="language-json">{JSON.stringify(customParsingResult, null, 2)}</code>
                        </pre>
                    )}
                </div>
            )}
            {cellData && (
                <pre className="mt-4 p-4 bg-gray-900 rounded-md shadow-inner text-white text-lg overflow-auto">
                    <code className="language-json">{JSON.stringify(cellData, null, 2)}</code>
                </pre>
            )}
        </div>
    );
}