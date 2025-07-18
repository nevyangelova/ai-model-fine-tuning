import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'AI Model Fine-Tuning',
    description: 'Manage and monitor your AI model fine-tuning jobs',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
