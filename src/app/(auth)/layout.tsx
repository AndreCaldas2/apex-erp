export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-red-50 via-slate-50 to-red-100 overflow-hidden">
      {/* Blob decorativo 1 */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none" />
      
      {/* Blob decorativo 2 */}
      <div className="absolute top-0 -right-4 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none" />
      
      {/* Blob decorativo 3 */}
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none" />

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {children}
      </div>
    </div>
  )
}
