import { PrismaClient } from '@prisma/client';

/**
 * PrismaClient Singleton Pattern
 *
 * Evita múltiplas instâncias do PrismaClient em desenvolvimento
 * devido ao hot reload do Next.js que pode causar warning de conexões.
 */

// Definir tipo para global
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Criar instância do Prisma com configurações específicas por ambiente
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasourceUrl: process.env.DATABASE_URL,
  });

// Em desenvolvimento, armazenar na variável global para reutilizar
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Export default para compatibilidade
export default prisma;
