import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import TopProgressBar from '@/components/TopProgressBar';
import "../globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Driving Assessment for Canada - Practice Your Driving Test",
    icons: {
        icon: "/logo.png"
    }
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale}>
            <body>
                <AuthProvider>
                    <TopProgressBar />
                    <NextIntlClientProvider>{children}</NextIntlClientProvider>
                </AuthProvider>
            </body>
        </html>
    );
}