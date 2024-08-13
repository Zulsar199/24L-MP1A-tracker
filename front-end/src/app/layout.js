"use client";

import { CategoryContextProvider } from "@/components/utils/context/categoryContext";
import { RecordContextProvider } from "@/components/utils/context/recordContext";
import { AuthProvider } from "@/components/utils/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RecordContextProvider>
            <CategoryContextProvider>
              {children}
              <ToastContainer />
            </CategoryContextProvider>
          </RecordContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
