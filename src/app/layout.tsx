import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AuthContextProvider} from "@/src/components/AuthContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "58 Favourite Countries",
  description: "Has all the things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
      </body>
    </html>
  );
}
