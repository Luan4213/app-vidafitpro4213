'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface UserDetails {
  age: number
  weight_kg: number
  height_cm: number
  gender: string
  goal: string
  is_subscribed: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login')
      return
    }
    setUser(user)

    // Buscar detalhes do usuário
    const { data: details } = await supabase
      .from('user_details')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setUserDetails(details)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">VidaFitPro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Olá, {user?.email}</span>
              <Button onClick={handleLogout} variant="outline">
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Perfil */}
            <Card>
              <CardHeader>
                <CardTitle>Meu Perfil</CardTitle>
                <CardDescription>
                  {userDetails ? 'Seus dados pessoais' : 'Complete seu perfil'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userDetails ? (
                  <div className="space-y-2">
                    <p><strong>Idade:</strong> {userDetails.age} anos</p>
                    <p><strong>Peso:</strong> {userDetails.weight_kg} kg</p>
                    <p><strong>Altura:</strong> {userDetails.height_cm} cm</p>
                    <p><strong>Objetivo:</strong> {userDetails.goal}</p>
                    <p><strong>Status:</strong> {userDetails.is_subscribed ? 'Premium' : 'Gratuito'}</p>
                  </div>
                ) : (
                  <p className="text-gray-600">Dados não cadastrados</p>
                )}
                <Button asChild className="mt-4">
                  <Link href="/profile">Editar Perfil</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Dietas */}
            <Card>
              <CardHeader>
                <CardTitle>Minhas Dietas</CardTitle>
                <CardDescription>
                  {userDetails?.is_subscribed ? 'Dietas personalizadas' : 'Preview disponível'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {userDetails?.is_subscribed 
                    ? 'Acesse suas dietas 100% personalizadas' 
                    : 'Assine para dietas personalizadas'}
                </p>
                <Button asChild>
                  <Link href="/diets">Ver Dietas</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Treinos */}
            <Card>
              <CardHeader>
                <CardTitle>Meus Treinos</CardTitle>
                <CardDescription>Treinos personalizados</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Em breve: treinos personalizados</p>
                <Button disabled>Em Desenvolvimento</Button>
              </CardContent>
            </Card>

            {/* Assinatura */}
            {!userDetails?.is_subscribed && (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Assine o VidaFitPro Premium</CardTitle>
                  <CardDescription>
                    Tenha acesso a dietas e treinos 100% personalizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h3 className="font-semibold">Dieta Personalizada</h3>
                      <p className="text-sm text-gray-600">Calculada com base nos seus dados</p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">Treinos Personalizados</h3>
                      <p className="text-sm text-gray-600">Adaptados ao seu nível e objetivo</p>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">Acompanhamento</h3>
                      <p className="text-sm text-gray-600">Relatórios e ajustes contínuos</p>
                    </div>
                  </div>
                  <Button className="mt-4 w-full" size="lg">
                    Assinar Agora - R$ 29,90/mês
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}