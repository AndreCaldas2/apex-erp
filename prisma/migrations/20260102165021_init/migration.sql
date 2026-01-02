-- CreateEnum
CREATE TYPE "PlanoType" AS ENUM ('ESSENCIAL', 'PROFISSIONAL', 'EMPRESARIAL', 'PERSONALIZADO');

-- CreateEnum
CREATE TYPE "PapelType" AS ENUM ('OWNER', 'ADMIN', 'FINANCEIRO', 'PROFISSIONAL', 'RECEPCAO', 'AUDITOR');

-- CreateEnum
CREATE TYPE "TipoContaType" AS ENUM ('PAGAR', 'RECEBER');

-- CreateEnum
CREATE TYPE "StatusContaType" AS ENUM ('PENDENTE', 'PARCIAL', 'PAGA', 'CANCELADA', 'VENCIDA');

-- CreateEnum
CREATE TYPE "TipoLancamentoType" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateEnum
CREATE TYPE "TipoCategoriaType" AS ENUM ('RECEITA', 'DESPESA', 'INVESTIMENTO');

-- CreateEnum
CREATE TYPE "TipoMovimentacaoType" AS ENUM ('ENTRADA', 'SAIDA', 'AJUSTE');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "plano" "PlanoType" NOT NULL DEFAULT 'PROFISSIONAL',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidades" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "endereco" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "papel" "PapelType" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contas" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "tipo" "TipoContaType" NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(15,2) NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3),
    "status" "StatusContaType" NOT NULL DEFAULT 'PENDENTE',
    "observacoes" TEXT,
    "numeroParcela" INTEGER,
    "totalParcelas" INTEGER,
    "contaPaiId" TEXT,
    "categoriaId" TEXT,
    "fornecedorId" TEXT,
    "clienteId" TEXT,
    "criadoPorId" TEXT NOT NULL,
    "conciliadoEm" TIMESTAMP(3),
    "transacaoBancariaId" TEXT,
    "transacaoBancariaHash" TEXT,
    "anexos" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lancamentos" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "contaId" TEXT,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(15,2) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoLancamentoType" NOT NULL,
    "criadoPorId" TEXT NOT NULL,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lancamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpfCnpj" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fornecedores" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "endereco" TEXT,
    "observacoes" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fornecedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoCategoriaType" NOT NULL,
    "cor" TEXT,
    "icone" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "centros_custo" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "centros_custo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "sku" TEXT,
    "codigoBarras" TEXT,
    "preco" DECIMAL(15,2) NOT NULL,
    "custo" DECIMAL(15,2),
    "estoque" INTEGER NOT NULL DEFAULT 0,
    "estoqueMinimo" INTEGER,
    "unidade" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimentacoes_estoque" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "tipo" "TipoMovimentacaoType" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "motivo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movimentacoes_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_cnpj_key" ON "tenants"("cnpj");

-- CreateIndex
CREATE INDEX "unidades_tenantId_idx" ON "unidades"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_tenantId_idx" ON "usuarios"("tenantId");

-- CreateIndex
CREATE INDEX "audit_logs_tenantId_idx" ON "audit_logs"("tenantId");

-- CreateIndex
CREATE INDEX "audit_logs_tenantId_createdAt_idx" ON "audit_logs"("tenantId", "createdAt");

-- CreateIndex
CREATE INDEX "contas_tenantId_idx" ON "contas"("tenantId");

-- CreateIndex
CREATE INDEX "contas_tenantId_status_idx" ON "contas"("tenantId", "status");

-- CreateIndex
CREATE INDEX "contas_dataVencimento_idx" ON "contas"("dataVencimento");

-- CreateIndex
CREATE INDEX "lancamentos_tenantId_idx" ON "lancamentos"("tenantId");

-- CreateIndex
CREATE INDEX "lancamentos_tenantId_data_idx" ON "lancamentos"("tenantId", "data");

-- CreateIndex
CREATE INDEX "clientes_tenantId_idx" ON "clientes"("tenantId");

-- CreateIndex
CREATE INDEX "fornecedores_tenantId_idx" ON "fornecedores"("tenantId");

-- CreateIndex
CREATE INDEX "categorias_tenantId_idx" ON "categorias"("tenantId");

-- CreateIndex
CREATE INDEX "centros_custo_tenantId_idx" ON "centros_custo"("tenantId");

-- CreateIndex
CREATE INDEX "produtos_tenantId_idx" ON "produtos"("tenantId");

-- CreateIndex
CREATE INDEX "produtos_sku_idx" ON "produtos"("sku");

-- CreateIndex
CREATE INDEX "produtos_codigoBarras_idx" ON "produtos"("codigoBarras");

-- CreateIndex
CREATE INDEX "movimentacoes_estoque_tenantId_idx" ON "movimentacoes_estoque"("tenantId");

-- AddForeignKey
ALTER TABLE "unidades" ADD CONSTRAINT "unidades_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_contaPaiId_fkey" FOREIGN KEY ("contaPaiId") REFERENCES "contas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamentos" ADD CONSTRAINT "lancamentos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamentos" ADD CONSTRAINT "lancamentos_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamentos" ADD CONSTRAINT "lancamentos_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "contas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamentos" ADD CONSTRAINT "lancamentos_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fornecedores" ADD CONSTRAINT "fornecedores_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "centros_custo" ADD CONSTRAINT "centros_custo_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentacoes_estoque" ADD CONSTRAINT "movimentacoes_estoque_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentacoes_estoque" ADD CONSTRAINT "movimentacoes_estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
