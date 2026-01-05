'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Loader2, LogOut } from 'lucide-react'

export function LogoutButton() {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="outline"
      className="w-full md:w-auto"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saindo...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Fazer Logout
        </>
      )}
    </Button>
  )
}
