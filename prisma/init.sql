-- Extensões para PostgreSQL do APEX ERP
-- Este arquivo é executado automaticamente na inicialização do container

-- Extensão para geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extensão para busca de texto com similaridade (trigram)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Extensão para remover acentos em buscas
CREATE EXTENSION IF NOT EXISTS "unaccent";
