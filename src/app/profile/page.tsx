'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { supabase } from '@/lib/supabase'
import { profileSchema, type ProfileFormData } from '@/lib/validations'

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

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

    // Carregar dados existentes
    const { data: details } = await supabase
      .from('user_details')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (details) {
      setValue('age', details.age)
      setValue('weight', details.weight_kg)
      setValue('height', details.height_cm)
      setValue('gender', details.gender)
      setValue('wakeUpTime', details.wake_up_time?.slice(0, 5) || '')
      setValue('sleepTime', details.sleep_time?.slice(0, 5) || '')
      setValue('routine', details.routine || '')
      setValue('foodPreferences', details.food_preferences || '')
      setValue('activityLevel', details.activity_level || '')
      setValue('trainingLocation', details.training_location || '')
      setValue('goal', details.goal || '')
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const profileData = {
        user_id: user.id,
        age: data.age,
        weight_kg: data.weight,
        height_cm: data.height,
        gender: data.gender,
        wake_up_time: data.wakeUpTime,
        sleep_time: data.sleepTime,
        routine: data.routine,
        food_preferences: data.foodPreferences,
        activity_level: data.activityLevel,
        training_location: data.trainingLocation,
        goal: data.goal,
      }

      const { error } = await supabase
        .from('user_details')
        .upsert(profileData, { onConflict: 'user_id' })

      if (error) throw error

      setSuccess('Perfil atualizado com sucesso!')
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Meu Perfil</CardTitle>
            <CardDescription className="text-center">
              Complete seus dados para dietas e treinos personalizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    {...register('age', { valueAsNumber: true })}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-600">{errors.age.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="70.5"
                    {...register('weight', { valueAsNumber: true })}
                  />
                  {errors.weight && (
                    <p className="text-sm text-red-600">{errors.weight.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    {...register('height', { valueAsNumber: true })}
                  />
                  {errors.height && (
                    <p className="text-sm text-red-600">{errors.height.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select onValueChange={(value) => setValue('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-600">{errors.gender.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wakeUpTime">Horário de acordar</Label>
                  <Input
                    id="wakeUpTime"
                    type="time"
                    {...register('wakeUpTime')}
                  />
                  {errors.wakeUpTime && (
                    <p className="text-sm text-red-600">{errors.wakeUpTime.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleepTime">Horário de dormir</Label>
                  <Input
                    id="sleepTime"
                    type="time"
                    {...register('sleepTime')}
                  />
                  {errors.sleepTime && (
                    <p className="text-sm text-red-600">{errors.sleepTime.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="routine">Rotina diária</Label>
                <Select onValueChange={(value) => setValue('routine', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua rotina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office_worker">Trabalho de escritório</SelectItem>
                    <SelectItem value="student">Estudante</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                    <SelectItem value="shift_worker">Trabalhador em turnos</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.routine && (
                  <p className="text-sm text-red-600">{errors.routine.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="foodPreferences">Preferências alimentares</Label>
                <Input
                  id="foodPreferences"
                  placeholder="Ex: vegetariano, sem glúten, etc."
                  {...register('foodPreferences')}
                />
                {errors.foodPreferences && (
                  <p className="text-sm text-red-600">{errors.foodPreferences.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityLevel">Nível de atividade física</Label>
                <Select onValueChange={(value) => setValue('activityLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentário</SelectItem>
                    <SelectItem value="lightly_active">Levemente ativo</SelectItem>
                    <SelectItem value="moderately_active">Moderadamente ativo</SelectItem>
                    <SelectItem value="very_active">Muito ativo</SelectItem>
                    <SelectItem value="extremely_active">Extremamente ativo</SelectItem>
                  </SelectContent>
                </Select>
                {errors.activityLevel && (
                  <p className="text-sm text-red-600">{errors.activityLevel.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingLocation">Local de treino</Label>
                <Select onValueChange={(value) => setValue('trainingLocation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Casa</SelectItem>
                    <SelectItem value="gym">Academia</SelectItem>
                  </SelectContent>
                </Select>
                {errors.trainingLocation && (
                  <p className="text-sm text-red-600">{errors.trainingLocation.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Objetivo principal</Label>
                <Select onValueChange={(value) => setValue('goal', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Perda de gordura</SelectItem>
                    <SelectItem value="muscle_gain">Ganho de massa muscular</SelectItem>
                    <SelectItem value="maintenance">Manutenção de peso</SelectItem>
                    <SelectItem value="health">Saúde geral</SelectItem>
                    <SelectItem value="specific">Objetivo específico</SelectItem>
                  </SelectContent>
                </Select>
                {errors.goal && (
                  <p className="text-sm text-red-600">{errors.goal.message}</p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar Perfil'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}