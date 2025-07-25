import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { TRPCReactProvider } from '@/trpc/client';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/context/theme-context';
import { PageWrapper } from '@/components/PageWrapper'; 
const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sarthi.ai',
  description: 'Talk face-to-face with your AI agent — in real-time.',
  icons: {
    icon: '/robot.svg', 
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${inter.className} theme-transition antialiased`}>
            <Toaster />
            <ThemeProvider>
              <PageWrapper>{children}</PageWrapper>
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </NuqsAdapter>
  );
}
