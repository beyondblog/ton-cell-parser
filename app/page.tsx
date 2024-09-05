import { CellParser } from './components/CellParser';

export default function Home() {
    return (
        <main className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">TON Cell Parser</h1>
                <CellParser />
            </div>
        </main>
    );
}