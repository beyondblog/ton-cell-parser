import '@/styles/globals.css';
import 'highlight.js/styles/vs2015.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}