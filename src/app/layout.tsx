import './globals.css';
import React, { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }