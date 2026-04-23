'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { Toaster } from './ui/sonner';
import AuthProvider from '../data/contexts/AuthProvider';
import { ProvidersProps } from '../data/types/components';

export const Providers = ({ children }: ProvidersProps) => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  </AuthProvider>
);
