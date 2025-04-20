import "@/app/globals.css";
import { inter } from "@/app/ui/fonts";
import SideNav from '@/app/ui/sidenav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-test`}> 

        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">

          <div className="w-full flex-none md:w-48 3xl:w-64">
            <SideNav />
          </div>

          <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-white lg:rounded-4xl mt-1 mr-1 mb-1">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}