import "@/app/globals.css";
import Dashboard from "@/app/ui/dashboard";
import { inter } from "@/app/ui/fonts";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}> 
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}