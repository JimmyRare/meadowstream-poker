"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Main from "./components/Main";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
