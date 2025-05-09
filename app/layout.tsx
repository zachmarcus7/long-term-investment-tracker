import "@/app/globals.css";
import { inter } from "@/app/ui/fonts";
import { Toaster } from 'react-hot-toast';
import SideNav from "./ui/sidenav";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <SideNav />
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </body>
    </html>
  );
}