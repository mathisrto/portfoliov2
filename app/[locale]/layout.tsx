import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FloatingBlob } from "@/lib/components/PMRFloattingBlob";
import PMRSidebarMenu from "@/lib/components/PMRSideMenu";
import { PMRThemeProvider } from "@/lib/components/PMRThemeProvider";
import { LocaleProvider } from "@/lib/contexts/PMRLocaleContext";
import { SidebarProviderClient } from "@/lib/contexts/PMRSidebarContext";
import ThemeScript from "@/lib/themeScript";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    weight: "900",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    weight: "900",
});

export const metadata: Metadata = {
    title: "Mathis Ratron · Portfolio/CV",
    description:
        "Je m'appelle Mathis Ratron et je suis étudiant en informatique. Explorez mes projets, compétences et réalisations en développement.",
    keywords: "Mathis Ratron, portfolio, CV, étudiant en informatique, projets de développement, compétences en programmation",
    openGraph: {
        title: "Mathis Ratron · Portfolio/CV",
        description: "Je m'appelle Mathis Ratron et je suis étudiant en informatique. Explorez mes projets, compétences et réalisations en développement.",
        url: "https://www.mathis-ratron.fr/",
        siteName: "Mathis Ratron · Portfolio/CV",
        images: ["https://www.mathis-ratron.fr/images/mathis-ratron.webp"],
        type: "website",
    },
    alternates: {
        canonical: "https://www.mathis-ratron.fr/",
    },
    icons: {
        shortcut: "/favicon.ico",
    },
};

export default async function LocaleLayout({
    children,
    params,
}: LayoutProps<"/[locale]">): Promise<ReactNode> {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <ThemeScript />
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-X3GSMWMV2F"
                    strategy="afterInteractive"
                />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-X3GSMWMV2F');
                    `}
                </Script>

                <meta name="robots" content="index, follow" />

                {/* Structured Data JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `{
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Mathis Ratron",
                    "jobTitle": "Développeur Informatique",
                    "url": "https://www.mathis-ratron.fr/",
                    "image": "https://www.mathis-ratron.fr/mathis-ratron.jpg",
                    "description": "Je m'appelle Mathis Ratron et je suis étudiant en informatique. Explorez mes projets, compétences et réalisations en développement."
                }`,
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-default w-full h-full flex bg-background text-foreground -z-20`}
            >
                <div className="overflow-hidden">
                    {/* Floating background blobs - vaporeux et dynamiques */}
                    <FloatingBlob
                        className="fixed top-16 left-16 w-96 h-96 rounded-full bg-secondary/30 blur-3xl -z-10"
                        animateProps={{
                            scale: [1, 1.25, 1],
                            opacity: [0.2, 0.6, 0.2],
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                            rotate: [0, 15, -10, 0],
                        }}
                        transitionProps={{
                            duration: 12,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        initialProps={{ opacity: 0 }}
                    />

                    <FloatingBlob
                        className="fixed bottom-24 right-20 w-96 h-96 rounded-full bg-tertiary/30 blur-3xl -z-10"
                        animateProps={{
                            scale: [1, 1.25, 1],
                            opacity: [0.2, 0.6, 0.2], // commence à 0
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                            rotate: [0, 15, -10, 0],
                        }}
                        transitionProps={{
                            duration: 14,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        initialProps={{ opacity: 0 }}
                    />
                </div>

                <NextIntlClientProvider messages={messages}>
                    <LocaleProvider initialLocale={locale}>
                        <PMRThemeProvider>
                            <SidebarProvider>
                                <SidebarProviderClient>
                                    <PMRSidebarMenu />
                                </SidebarProviderClient>
                                <main className="flex flex-1 flex-col transition-all z-10">
                                    <SidebarTrigger className="sticky top-0 z-20" />
                                    {children}
                                </main>
                            </SidebarProvider>
                        </PMRThemeProvider>
                    </LocaleProvider>
                </NextIntlClientProvider>

                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
