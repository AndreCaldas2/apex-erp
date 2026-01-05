import NextAuth from 'next-auth'
import type { User as NextAuthUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import * as bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'seu@email.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        // Validar se email e senha foram fornecidos
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios')
        }

        const { email, password } = credentials as { email: string; password: string }

        // Buscar usuário no banco de dados
        const usuario = await prisma.usuario.findUnique({
          where: { email },
          include: { tenant: true },
        })

        // Validar se usuário existe
        if (!usuario) {
          throw new Error('Credenciais inválidas')
        }

        // Validar se usuário está ativo
        if (!usuario.ativo) {
          throw new Error('Usuário desativado')
        }

        // Validar se tenant está ativo
        if (!usuario.tenant.ativo) {
          throw new Error('Empresa desativada')
        }

        // Comparar senha
        const senhaValida = await bcrypt.compare(
          password,
          usuario.senha
        )

        if (!senhaValida) {
          throw new Error('Credenciais inválidas')
        }

        // Retornar usuário autenticado
        return {
          id: usuario.id,
          email: usuario.email,
          name: usuario.nome,
          role: usuario.papel,
          tenantId: usuario.tenantId,
          tenantName: usuario.tenant.nome,
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.tenantId = user.tenantId
        token.tenantName = user.tenantName
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.tenantId = token.tenantId as string
        session.user.tenantName = token.tenantName as string
      }
      return session
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
    updateAge: 24 * 60 * 60, // 24 horas
  },

  secret: process.env.NEXTAUTH_SECRET,

  events: {
    async signIn({ user }) {
      console.log(`✅ Usuário logado: ${user.email}`)
    },
    async signOut() {
      console.log('🔌 Usuário deslogado')
    },
  },

  debug: process.env.NODE_ENV === 'development',
})
