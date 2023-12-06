"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const QueryProvider = ({
  children, //the children will still be server components, even though this is client component
}: {
  children: React.ReactNode,
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}