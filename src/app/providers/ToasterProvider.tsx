// app/providers/ToasterProvider.tsx
"use client"; // This directive is ESSENTIAL for it to be a Client Component

import { Toaster } from "react-hot-toast";
import React from "react"; // React is implicitly used, good to import

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center" // You can customize position as needed
      reverseOrder={false}
    />
  );
}
