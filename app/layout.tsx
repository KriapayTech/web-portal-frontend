"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/Redux/store";
import Header from "../components/Header";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {HeroUIProvider} from '@heroui/react'

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>KriaPay</title>
      <body className={`${poppins.variable}  antialiased`}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ProtectedRoute>
            <HeroUIProvider>
              <Header />
              {children}
              </HeroUIProvider>
            </ProtectedRoute>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
