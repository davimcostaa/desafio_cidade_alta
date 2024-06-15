'use client';
import { LettersProvider } from '@/context/Letter';

export function Providers({ children }) {
  return (
      <LettersProvider>{children}</LettersProvider>
  );
}