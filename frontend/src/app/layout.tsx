import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pizzaria Marcello's",
  description: "A melhor pizzaria do Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster 
        position="bottom-right"
        toastOptions={{
          style:{
            backgroundColor: "#f1f1f1",
            color:"#131313",
            borderColor:"#181818"
          }
        }}
        />
       {children}
      </body>
    </html>
  );
}
