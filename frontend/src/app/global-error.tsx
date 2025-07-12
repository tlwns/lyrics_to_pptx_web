'use client'; // Error boundaries must be Client Components

import { inter } from '@/app/ui/fonts';
import './globals.css';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </body>
    </html>
  );
}
