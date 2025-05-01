import "@/app/globals.css";
import { inter } from "@/app/ui/fonts";
import SideNav from '@/app/ui/sidenav';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}> 

        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">

          <div className="w-full flex-none md:w-48 2xl:w-66 3xl:w-76 bg-nav">
            <SideNav />
          </div>

          <div className="flex-grow p-6 md:overflow-y-auto md:p-12 shadow-3xl bg-main">
            {children}
          </div>

        </div>

        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}