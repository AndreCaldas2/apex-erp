import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpar dados existentes (apenas em desenvolvimento)
  if (process.env.NODE_ENV === 'development') {
    console.log('🗑️  Limpando dados existentes...');
    await prisma.movimentacaoEstoque.deleteMany();
    await prisma.produto.deleteMany();
    await prisma.lancamento.deleteMany();
    await prisma.conta.deleteMany();
    await prisma.cliente.deleteMany();
    await prisma.fornecedor.deleteMany();
    await prisma.categoria.deleteMany();
    await prisma.centroCusto.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.unidade.deleteMany();
    await prisma.tenant.deleteMany();
  }

  // ============================================================================
  // CRIAR TENANT (EMPRESA)
  // ============================================================================

  const tenant = await prisma.tenant.create({
    data: {
      nome: 'Clínica Demo',
      cnpj: '00000000000191',
      plano: 'PROFISSIONAL',
      ativo: true,
    },
  });

  console.log('✅ Tenant criado:', tenant.nome);

  // ============================================================================
  // CRIAR UNIDADE
  // ============================================================================

  const unidade = await prisma.unidade.create({
    data: {
      tenantId: tenant.id,
      nome: 'Unidade Centro',
      cnpj: '00000000000191',
      endereco: 'Rua Principal, 123 - Centro',
      telefone: '(11) 99999-9999',
      email: 'contato@clinicademo.com',
      ativo: true,
    },
  });

  console.log('✅ Unidade criada:', unidade.nome);

  // ============================================================================
  // CRIAR USUÁRIOS
  // ============================================================================

  const senhaHash = await bcrypt.hash('admin123', 10);

  const usuarioOwner = await prisma.usuario.create({
    data: {
      tenantId: tenant.id,
      email: 'admin@demo.com',
      senha: senhaHash,
      nome: 'Administrador',
      papel: 'OWNER',
      ativo: true,
    },
  });

  console.log('✅ Usuário Owner criado:', usuarioOwner.email);

  const usuarioFinanceiro = await prisma.usuario.create({
    data: {
      tenantId: tenant.id,
      email: 'financeiro@demo.com',
      senha: senhaHash,
      nome: 'Financeiro',
      papel: 'FINANCEIRO',
      ativo: true,
    },
  });

  console.log('✅ Usuário Financeiro criado:', usuarioFinanceiro.email);

  // ============================================================================
  // CRIAR CATEGORIAS
  // ============================================================================

  const categorias = [
    { nome: 'Salários', tipo: 'DESPESA' as const, cor: '#FF6B6B' },
    { nome: 'Aluguel', tipo: 'DESPESA' as const, cor: '#4ECDC4' },
    { nome: 'Utilidades', tipo: 'DESPESA' as const, cor: '#45B7D1' },
    { nome: 'Vendas', tipo: 'RECEITA' as const, cor: '#96CEB4' },
    { nome: 'Serviços', tipo: 'RECEITA' as const, cor: '#FFEAA7' },
    { nome: 'Investimentos', tipo: 'INVESTIMENTO' as const, cor: '#DDA15E' },
  ];

  for (const categoria of categorias) {
    await prisma.categoria.create({
      data: {
        tenantId: tenant.id,
        ...categoria,
        ativo: true,
      },
    });
  }

  console.log('✅ Categorias criadas:', categorias.length);

  // ============================================================================
  // CRIAR CENTROS DE CUSTO
  // ============================================================================

  const centrosCusto = [
    { nome: 'Administrativo', descricao: 'Despesas administrativas' },
    { nome: 'Operacional', descricao: 'Despesas operacionais' },
    { nome: 'Vendas', descricao: 'Despesas de vendas' },
    { nome: 'Marketing', descricao: 'Despesas de marketing' },
  ];

  for (const centro of centrosCusto) {
    await prisma.centroCusto.create({
      data: {
        tenantId: tenant.id,
        ...centro,
        ativo: true,
      },
    });
  }

  console.log('✅ Centros de custo criados:', centrosCusto.length);

  // ============================================================================
  // CRIAR CLIENTES
  // ============================================================================

  const clientes = [
    {
      nome: 'João Silva',
      cpfCnpj: '12345678901',
      email: 'joao@email.com',
      telefone: '(11) 98765-4321',
      endereco: 'Rua A, 100',
    },
    {
      nome: 'Maria Santos',
      cpfCnpj: '98765432101',
      email: 'maria@email.com',
      telefone: '(11) 99876-5432',
      endereco: 'Rua B, 200',
    },
    {
      nome: 'Empresa XYZ',
      cpfCnpj: '12345678000190',
      email: 'contato@xyz.com',
      telefone: '(11) 3333-4444',
      endereco: 'Av. Principal, 500',
    },
    {
      nome: 'Pedro Oliveira',
      cpfCnpj: '11122233344',
      email: 'pedro@email.com',
      telefone: '(11) 97777-8888',
      endereco: 'Rua C, 300',
    },
    {
      nome: 'Ana Costa',
      cpfCnpj: '55566677788',
      email: 'ana@email.com',
      telefone: '(11) 96666-7777',
      endereco: 'Rua D, 400',
    },
  ];

  for (const cliente of clientes) {
    await prisma.cliente.create({
      data: {
        tenantId: tenant.id,
        ...cliente,
        ativo: true,
      },
    });
  }

  console.log('✅ Clientes criados:', clientes.length);

  // ============================================================================
  // CRIAR FORNECEDORES
  // ============================================================================

  const fornecedores = [
    {
      nome: 'Fornecedor A',
      cnpj: '11111111000190',
      email: 'contato@fornecedora.com',
      telefone: '(11) 2222-2222',
      endereco: 'Rua Fornecedor, 100',
    },
    {
      nome: 'Fornecedor B',
      cnpj: '22222222000190',
      email: 'contato@fornecedorb.com',
      telefone: '(11) 3333-3333',
      endereco: 'Rua Fornecedor, 200',
    },
    {
      nome: 'Fornecedor C',
      cnpj: '33333333000190',
      email: 'contato@fornecedorc.com',
      telefone: '(11) 4444-4444',
      endereco: 'Rua Fornecedor, 300',
    },
    {
      nome: 'Fornecedor D',
      cnpj: '44444444000190',
      email: 'contato@fornecedord.com',
      telefone: '(11) 5555-5555',
      endereco: 'Rua Fornecedor, 400',
    },
    {
      nome: 'Fornecedor E',
      cnpj: '55555555000190',
      email: 'contato@fornecedore.com',
      telefone: '(11) 6666-6666',
      endereco: 'Rua Fornecedor, 500',
    },
  ];

  for (const fornecedor of fornecedores) {
    await prisma.fornecedor.create({
      data: {
        tenantId: tenant.id,
        ...fornecedor,
        ativo: true,
      },
    });
  }

  console.log('✅ Fornecedores criados:', fornecedores.length);

  // ============================================================================
  // CRIAR PRODUTOS
  // ============================================================================

  const produtos = [
    {
      nome: 'Produto A',
      descricao: 'Descrição do Produto A',
      sku: 'SKU-001',
      codigoBarras: '1234567890123',
      preco: 100.0,
      custo: 50.0,
      estoque: 100,
      estoqueMinimo: 10,
      unidade: 'UN',
    },
    {
      nome: 'Produto B',
      descricao: 'Descrição do Produto B',
      sku: 'SKU-002',
      codigoBarras: '1234567890124',
      preco: 200.0,
      custo: 100.0,
      estoque: 50,
      estoqueMinimo: 5,
      unidade: 'UN',
    },
    {
      nome: 'Produto C',
      descricao: 'Descrição do Produto C',
      sku: 'SKU-003',
      codigoBarras: '1234567890125',
      preco: 150.0,
      custo: 75.0,
      estoque: 75,
      estoqueMinimo: 8,
      unidade: 'KG',
    },
    {
      nome: 'Produto D',
      descricao: 'Descrição do Produto D',
      sku: 'SKU-004',
      codigoBarras: '1234567890126',
      preco: 300.0,
      custo: 150.0,
      estoque: 30,
      estoqueMinimo: 3,
      unidade: 'UN',
    },
    {
      nome: 'Produto E',
      descricao: 'Descrição do Produto E',
      sku: 'SKU-005',
      codigoBarras: '1234567890127',
      preco: 250.0,
      custo: 125.0,
      estoque: 60,
      estoqueMinimo: 6,
      unidade: 'L',
    },
  ];

  for (const produto of produtos) {
    await prisma.produto.create({
      data: {
        tenantId: tenant.id,
        ...produto,
        ativo: true,
      },
    });
  }

  console.log('✅ Produtos criados:', produtos.length);

  // ============================================================================
  // CRIAR CONTAS A PAGAR
  // ============================================================================

  const contasPagar = [
    {
      tipo: 'PAGAR' as const,
      descricao: 'Aluguel - Janeiro',
      valor: 5000.0,
      dataVencimento: new Date('2024-02-15'),
      status: 'PENDENTE' as const,
    },
    {
      tipo: 'PAGAR' as const,
      descricao: 'Energia - Janeiro',
      valor: 800.0,
      dataVencimento: new Date('2024-02-10'),
      status: 'PENDENTE' as const,
    },
    {
      tipo: 'PAGAR' as const,
      descricao: 'Internet - Janeiro',
      valor: 200.0,
      dataVencimento: new Date('2024-02-05'),
      status: 'PAGA' as const,
      dataPagamento: new Date('2024-02-03'),
    },
  ];

  for (const conta of contasPagar) {
    await prisma.conta.create({
      data: {
        tenantId: tenant.id,
        criadoPorId: usuarioFinanceiro.id,
        ...conta,
      },
    });
  }

  console.log('✅ Contas a pagar criadas:', contasPagar.length);

  // ============================================================================
  // CRIAR CONTAS A RECEBER
  // ============================================================================

  const contasReceber = [
    {
      tipo: 'RECEBER' as const,
      descricao: 'Venda - Cliente A',
      valor: 2000.0,
      dataVencimento: new Date('2024-02-20'),
      status: 'PENDENTE' as const,
    },
    {
      tipo: 'RECEBER' as const,
      descricao: 'Venda - Cliente B',
      valor: 3000.0,
      dataVencimento: new Date('2024-02-25'),
      status: 'PENDENTE' as const,
    },
    {
      tipo: 'RECEBER' as const,
      descricao: 'Serviço - Cliente C',
      valor: 1500.0,
      dataVencimento: new Date('2024-02-10'),
      status: 'PAGA' as const,
      dataPagamento: new Date('2024-02-08'),
    },
  ];

  for (const conta of contasReceber) {
    await prisma.conta.create({
      data: {
        tenantId: tenant.id,
        criadoPorId: usuarioFinanceiro.id,
        ...conta,
      },
    });
  }

  console.log('✅ Contas a receber criadas:', contasReceber.length);

  // ============================================================================
  // CRIAR LANÇAMENTOS
  // ============================================================================

  const lancamentos = [
    {
      descricao: 'Entrada - Venda',
      valor: 2000.0,
      data: new Date('2024-01-15'),
      tipo: 'ENTRADA' as const,
    },
    {
      descricao: 'Saída - Aluguel',
      valor: 5000.0,
      data: new Date('2024-01-10'),
      tipo: 'SAIDA' as const,
    },
    {
      descricao: 'Entrada - Serviço',
      valor: 1500.0,
      data: new Date('2024-01-20'),
      tipo: 'ENTRADA' as const,
    },
  ];

  for (const lancamento of lancamentos) {
    await prisma.lancamento.create({
      data: {
        tenantId: tenant.id,
        unidadeId: unidade.id,
        criadoPorId: usuarioFinanceiro.id,
        ...lancamento,
      },
    });
  }

  console.log('✅ Lançamentos criados:', lancamentos.length);

  // ============================================================================
  // CRIAR MOVIMENTAÇÕES DE ESTOQUE
  // ============================================================================

  const movimentacoes = [
    {
      produtoId: (await prisma.produto.findFirst({ where: { tenantId: tenant.id } }))?.id || '',
      tipo: 'ENTRADA' as const,
      quantidade: 50,
      motivo: 'Compra de fornecedor',
    },
    {
      produtoId: (await prisma.produto.findFirst({ where: { tenantId: tenant.id } }))?.id || '',
      tipo: 'SAIDA' as const,
      quantidade: 10,
      motivo: 'Venda',
    },
  ];

  for (const mov of movimentacoes) {
    if (mov.produtoId) {
      await prisma.movimentacaoEstoque.create({
        data: {
          tenantId: tenant.id,
          ...mov,
        },
      });
    }
  }

  console.log('✅ Movimentações de estoque criadas:', movimentacoes.length);

  // ============================================================================
  // RESULTADO FINAL
  // ============================================================================

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📝 Credenciais de acesso:');
  console.log('   Email: admin@demo.com');
  console.log('   Senha: admin123');
  console.log('\n   Email: financeiro@demo.com');
  console.log('   Senha: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
