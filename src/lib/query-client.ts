import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Quanto tempo os dados são considerados "fresh" (não precisam refazer requisição)
      staleTime: 1000 * 60 * 5, // 5 minutos

      // Quanto tempo manter dados em cache mesmo que estejam "stale"
      gcTime: 1000 * 60 * 10, // 10 minutos (antes era cacheTime)

      // Tentar novamente em caso de erro
      retry: 1,

      // Delay antes de tentar novamente
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Tentar novamente em caso de erro
      retry: 1,

      // Delay antes de tentar novamente
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
