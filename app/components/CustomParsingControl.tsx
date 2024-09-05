'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CustomParsingControlProps {
    onParse: (action: string, value?: number) => void;
}

export type ParsingStep = {
    action: string;
    value?: number;
    result: any;
};

export function CustomParsingControl({ onParse }: CustomParsingControlProps) {
    const [selectedAction, setSelectedAction] = useState('loadUint');
    const [inputValue, setInputValue] = useState('');

    const handleParse = () => {
        if (['loadStringTail', 'loadStringRefTail', 'loadMaybeStringTail', 'loadMaybeAddress', 'loadCoins', 'loadMaybeCoins', 'loadAddress', 'loadBoolean', 'loadMaybeBoolean'].includes(selectedAction)) {
            onParse(selectedAction);
        } else {
            onParse(selectedAction, Number(inputValue));
        }
    };

    const isValueRequired = !['loadStringTail', 'loadStringRefTail', 'loadMaybeStringTail', 'loadMaybeAddress', 'loadCoins', 'loadMaybeCoins', 'loadAddress', 'loadBoolean', 'loadMaybeBoolean'].includes(selectedAction);

    return (
        <div className="flex items-center space-x-2">
            <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="flex-1 rounded-md border border-slate-300 bg-white py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-900 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
            >
                <option value="loadUint">loadUint</option>
                <option value="loadInt">loadInt</option>
                <option value="loadUintBig">loadUintBig</option>
                <option value="loadIntBig">loadIntBig</option>
                <option value="loadVarInt">loadVarInt</option>
                <option value="loadVarIntBig">loadVarIntBig</option>
                <option value="loadCoins">loadCoins</option>
                <option value="loadMaybeCoins">loadMaybeCoins</option>
                <option value="loadAddress">loadAddress</option>
                <option value="loadMaybeAddress">loadMaybeAddress</option>
                <option value="loadBytes">loadBytes</option>
                <option value="loadStringTail">loadStringTail</option>
                <option value="loadStringRefTail">loadStringRefTail</option>
                <option value="loadMaybeStringTail">loadMaybeStringTail</option>
                <option value="loadBoolean">loadBoolean</option>
                <option value="loadMaybeBoolean">loadMaybeBoolean</option>
                <option value="skip">skip</option>
            </select>
            {isValueRequired && (
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