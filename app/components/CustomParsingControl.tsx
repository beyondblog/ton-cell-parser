'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CustomParsingControlProps {
    onParse: (action: string, value?: number) => void;
}

export function CustomParsingControl({ onParse }: CustomParsingControlProps) {
    const [selectedAction, setSelectedAction] = useState('loadUint');
    const [inputValue, setInputValue] = useState('');

    const handleParse = () => {
        if (selectedAction === 'loadAddress') {
            onParse(selectedAction);
        } else {
            onParse(selectedAction, Number(inputValue));
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="flex-1 rounded-md border border-slate-300 bg-white py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-900 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
            >
                <option value="loadUint">Uint</option>
                <option value="loadInt">Int</option>
                <option value="loadBigUint">BigUint</option>
                <option value="loadBigInt">BigInt</option>
                <option value="loadCoins">Coins</option>
                <option value="loadAddress">Address</option>
                <option value="loadBytes">Bytes</option>
                <option value="loadString">String</option>
            </select>
            {selectedAction !== 'loadAddress' && (
                <Input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                    className="flex-1"
                />
            )}
            <Button onClick={handleParse}>Parse</Button>
        </div>
    );
}