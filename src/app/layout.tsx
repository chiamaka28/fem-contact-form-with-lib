import './globals.css';
import { Karla } from 'next/font/google';

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`h-screen bg-green-200 ${karla.variable} font-sans`}>
        <header className='sr-only'>
          <h1>Contact Form</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
