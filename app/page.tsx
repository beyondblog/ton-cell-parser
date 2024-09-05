import { CellParser } from './components/CellParser';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">TON Cell Parser</h1>
                    <div className="flex space-x-4">
                        <Link href="https://ton.org/" target="_blank" rel="noopener noreferrer">
                            <Image src="/ton-logo.svg" alt="TON Logo" width={32} height={32} />
                        </Link>
                        <Link href="https://github.com/beyondblog/ton-cell-parser" target="_blank" rel="noopener noreferrer">
                            <Image src="/github-logo.svg" alt="GitHub Logo" width={32} height={32} />
                        </Link>
                    </div>
                </div>
                <CellParser />
            </div>
        </main>
    );
}