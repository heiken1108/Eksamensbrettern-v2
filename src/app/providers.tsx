"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Provider component that wraps the application with the QueryClientProvider and the SessionProvider.
 * @param children - The children components of the application. Essentially the pages in the Next.js application.
 * @param session - The session object from the NextAuth library.
 */
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
